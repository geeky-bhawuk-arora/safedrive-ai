import cv2
import mediapipe as mp
import numpy as np
from typing import Dict, Tuple, Optional
from app.utils.perclos_calculator import calculate_ear, calculate_mar, PERCLOSTracker
from app.config import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class FaceDetectionService:
    def __init__(self):
        # Initialize MediaPipe Face Mesh
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        
        # Eye landmark indices for EAR calculation
        self.LEFT_EYE = [362, 385, 387, 263, 373, 380]
        self.RIGHT_EYE = [33, 160, 158, 133, 153, 144]
        
        # Mouth landmark indices for MAR calculation
        self.MOUTH = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308]
        
        # PERCLOS tracker
        self.perclos_tracker = PERCLOSTracker(window_size=30)
        
    def detect_face(self, frame) -> Optional[Dict]:
        """
        Detect face and calculate drowsiness metrics
        Returns: dict with EAR, MAR, PERCLOS, and visual indicators
        """
        if frame is None:
            return None
            
        # Convert to RGB for MediaPipe
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_frame)
        
        if not results.multi_face_landmarks:
            return None
        
        face_landmarks = results.multi_face_landmarks[0]
        h, w = frame.shape[:2]
        
        # Extract landmarks
        landmarks = []
        for landmark in face_landmarks.landmark:
            x = int(landmark.x * w)
            y = int(landmark.y * h)
            landmarks.append((x, y))
        
        # Calculate EAR for both eyes
        left_ear = calculate_ear([landmarks[i] for i in self.LEFT_EYE])
        right_ear = calculate_ear([landmarks[i] for i in self.RIGHT_EYE])
        avg_ear = (left_ear + right_ear) / 2.0
        
        # Calculate MAR
        mouth_points = [landmarks[i] for i in self.MOUTH]
        avg_mar = calculate_mar(mouth_points)
        
        # Determine if eyes are closed
        eye_closed = avg_ear < settings.EAR_THRESHOLD
        self.perclos_tracker.update(eye_closed)
        perclos = self.perclos_tracker.get_perclos()
        
        # Determine if yawning
        is_yawning = avg_mar > settings.MAR_THRESHOLD
        
        return {
            'ear': avg_ear,
            'mar': avg_mar,
            'perclos': perclos,
            'eye_closed': eye_closed,
            'is_yawning': is_yawning,
            'landmarks': landmarks,
            'left_eye_landmarks': [landmarks[i] for i in self.LEFT_EYE],
            'right_eye_landmarks': [landmarks[i] for i in self.RIGHT_EYE]
        }
    
    def draw_face_annotations(self, frame, detection_data: Dict):
        """Draw face detection overlays on frame"""
        if detection_data is None:
            return frame
        
        # Draw eye contours
        for eye_landmarks in [detection_data['left_eye_landmarks'], 
                              detection_data['right_eye_landmarks']]:
            points = np.array(eye_landmarks, dtype=np.int32)
            cv2.polylines(frame, [points], True, (0, 255, 0), 1)
        
        # Status text
        ear = detection_data['ear']
        perclos = detection_data['perclos']
        
        status = "ALERT"
        color = (0, 255, 0)  # Green
        
        if perclos > 40:
            status = "DANGER"
            color = (0, 0, 255)  # Red
        elif perclos > 20:
            status = "DROWSY"
            color = (0, 255, 255)  # Yellow
        
        # Draw status
        cv2.putText(frame, f"Status: {status}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
        cv2.putText(frame, f"EAR: {ear:.2f}", (10, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        cv2.putText(frame, f"PERCLOS: {perclos:.1f}%", (10, 90),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        
        if detection_data['is_yawning']:
            cv2.putText(frame, "YAWNING!", (10, 120),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        
        return frame