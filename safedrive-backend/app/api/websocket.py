from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
from datetime import datetime
import random
from app.utils.logger import setup_logger

router = APIRouter()
logger = setup_logger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"Client connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"Client disconnected. Total connections: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                logger.error(f"Error broadcasting to client: {e}")

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time monitoring data"""
    await manager.connect(websocket)
    
    try:
        while True:
            # Simulate real-time data (replace with actual sensor readings)
            data = {
                "timestamp": datetime.now().isoformat(),
                "perclos": round(random.uniform(10, 15), 2),
                "ear": round(random.uniform(0.25, 0.30), 2),
                "mar": round(random.uniform(0.10, 0.20), 2),
                "steering_variance": round(random.uniform(2, 5), 2),
                "hrv": round(random.uniform(60, 70), 1),
                "state": "alert"
            }
            
            await manager.broadcast(data)
            await asyncio.sleep(1)  # Send updates every second
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket)