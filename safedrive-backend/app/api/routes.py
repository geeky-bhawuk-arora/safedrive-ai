from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.models.driver_state import DriverState, DriverStateResponse
from app.utils.logger import setup_logger

router = APIRouter(prefix="/api", tags=["monitoring"])
logger = setup_logger(__name__)

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@router.get("/status", response_model=DriverStateResponse)
async def get_driver_status():
    """Get current driver status (demo data)"""
    return DriverStateResponse(
        state=DriverState.ALERT,
        perclos=12.0,
        ear=0.28,
        mar=0.15,
        steering_variance=3.2,
        hrv=65.0,
        timestamp=datetime.now(),
        confidence=0.95
    )

@router.post("/reset")
async def reset_system():
    """Reset monitoring system"""
    logger.info("System reset requested")
    return {"message": "System reset successfully"}