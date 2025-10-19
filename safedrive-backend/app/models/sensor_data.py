from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class EyeData(BaseModel):
    ear: float  # Eye Aspect Ratio
    perclos: float
    blink_count: int
    closed_frames: int
    
class SteeringData(BaseModel):
    angle: float
    variance: float
    timestamp: datetime

class SensorData(BaseModel):
    eye_data: EyeData
    steering_data: SteeringData
    hrv: Optional[float] = None
    timestamp: datetime