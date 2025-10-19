import cv2
import numpy as np
from typing import Optional
from app.config import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class CameraService:
    def __init__(self):
        self.cap: Optional[cv2.VideoCapture] = None
        self.is_running = False
        
    def start(self):
        """Start camera capture"""
        try:
            self.cap = cv2.VideoCapture(settings.CAMERA_INDEX)
            self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, settings.CAMERA_WIDTH)
            self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, settings.CAMERA_HEIGHT)
            self.cap.set(cv2.CAP_PROP_FPS, settings.CAMERA_FPS)
            
            if not self.cap.isOpened():
                raise Exception("Could not open camera")
                
            self.is_running = True
            logger.info(f"Camera started on index {settings.CAMERA_INDEX}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to start camera: {e}")
            return False
    
    def read_frame(self):
        """Read a frame from camera"""
        if not self.is_running or self.cap is None:
            return None
            
        ret, frame = self.cap.read()
        if not ret:
            logger.warning("Failed to read frame")
            return None
            
        return frame
    
    def stop(self):
        """Stop camera capture"""
        if self.cap is not None:
            self.cap.release()
            self.is_running = False
            logger.info("Camera stopped")
    
    def get_frame_as_jpeg(self, frame):
        """Convert frame to JPEG bytes"""
        if frame is None:
            return None
            
        _, buffer = cv2.imencode('.jpg', frame)
        return buffer.tobytes()