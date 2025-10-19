from enum import Enum
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DriverState(str, Enum):
    ALERT = "alert"
    DROWSY = "drowsy"
    DANGER = "danger"

class DriverStateResponse(BaseModel):
    state: DriverState
    perclos: float
    ear: float  # Eye Aspect Ratio
    mar: float  # Mouth Aspect Ratio
    steering_variance: float
    hrv: Optional[float] = None
    timestamp: datetime
    confidence: float
    
    class Config:
        json_schema_extra = {
            "example": {
                "state": "alert",
                "perclos": 0.12,
                "ear": 0.28,
                "mar": 0.15,
                "steering_variance": 3.2,
                "hrv": 65.0,
                "timestamp": "2025-10-19T10:30:00",
                "confidence": 0.95
            }
        }