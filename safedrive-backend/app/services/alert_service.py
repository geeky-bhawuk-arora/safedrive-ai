from datetime import datetime, timedelta
from typing import Optional
from app.models.driver_state import DriverState
from app.config import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class AlertService:
    def __init__(self):
        self.last_alert_time: Optional[datetime] = None
        self.consecutive_drowsy_frames = 0
        self.consecutive_danger_frames = 0
        
    def evaluate_state(self, perclos: float, ear: float) -> DriverState:
        """Evaluate driver state based on metrics"""
        
        if perclos > 40 or ear < 0.2:
            self.consecutive_danger_frames += 1
            self.consecutive_drowsy_frames = 0
            
            if self.consecutive_danger_frames >= settings.FATIGUE_CONSECUTIVE_FRAMES:
                return DriverState.DANGER
                
        elif perclos > 20 or ear < 0.25:
            self.consecutive_drowsy_frames += 1
            self.consecutive_danger_frames = 0
            
            if self.consecutive_drowsy_frames >= settings.FATIGUE_CONSECUTIVE_FRAMES:
                return DriverState.DROWSY
        else:
            self.consecutive_drowsy_frames = 0
            self.consecutive_danger_frames = 0
            return DriverState.ALERT
        
        return DriverState.ALERT
    
    def should_alert(self, state: DriverState) -> bool:
        """Check if alert should be triggered based on cooldown"""
        if state == DriverState.ALERT:
            return False
        
        now = datetime.now()
        
        if self.last_alert_time is None:
            self.last_alert_time = now
            return True
        
        time_since_last = (now - self.last_alert_time).total_seconds()
        
        if time_since_last >= settings.ALERT_COOLDOWN:
            self.last_alert_time = now
            return True
        
        return False
    
    def get_alert_message(self, state: DriverState) -> str:
        """Get alert message for current state"""
        messages = {
            DriverState.ALERT: "Driver is alert",
            DriverState.DROWSY: "Drowsiness detected! Please stay alert.",
            DriverState.DANGER: "CRITICAL: Severe fatigue! Pull over safely."
        }
        return messages.get(state, "Unknown state")
    
    def reset(self):
        """Reset alert counters"""
        self.consecutive_drowsy_frames = 0
        self.consecutive_danger_frames = 0
        self.last_alert_time = None
        logger.info("Alert service reset")