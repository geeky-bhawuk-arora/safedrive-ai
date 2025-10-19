import numpy as np
from scipy.spatial import distance

def calculate_ear(eye_landmarks):
    """
    Calculate Eye Aspect Ratio (EAR)
    eye_landmarks: array of 6 (x,y) coordinates for one eye
    """
    # Vertical eye landmarks
    A = distance.euclidean(eye_landmarks[1], eye_landmarks[5])
    B = distance.euclidean(eye_landmarks[2], eye_landmarks[4])
    
    # Horizontal eye landmark
    C = distance.euclidean(eye_landmarks[0], eye_landmarks[3])
    
    # EAR calculation
    ear = (A + B) / (2.0 * C)
    return ear

def calculate_mar(mouth_landmarks):
    """
    Calculate Mouth Aspect Ratio (MAR)
    mouth_landmarks: array of 6 (x,y) coordinates
    """
    # Vertical distances
    A = distance.euclidean(mouth_landmarks[2], mouth_landmarks[10])
    B = distance.euclidean(mouth_landmarks[4], mouth_landmarks[8])
    
    # Horizontal distance
    C = distance.euclidean(mouth_landmarks[0], mouth_landmarks[6])
    
    # MAR calculation
    mar = (A + B) / (2.0 * C)
    return mar

def calculate_perclos(closed_frames, total_frames):
    """
    Calculate PERCLOS (Percentage of Eye Closure)
    """
    if total_frames == 0:
        return 0.0
    return (closed_frames / total_frames) * 100

class PERCLOSTracker:
    def __init__(self, window_size=30):
        self.window_size = window_size
        self.closed_frames = 0
        self.total_frames = 0
        
    def update(self, eye_closed):
        if eye_closed:
            self.closed_frames += 1
        self.total_frames += 1
        
        # Keep only last window_size frames
        if self.total_frames > self.window_size:
            if self.closed_frames > 0:
                self.closed_frames -= 1
            self.total_frames = self.window_size
    
    def get_perclos(self):
        return calculate_perclos(self.closed_frames, self.total_frames)
    
    def reset(self):
        self.closed_frames = 0
        self.total_frames = 0