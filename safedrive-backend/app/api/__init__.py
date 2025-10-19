from .routes import router as api_router
from .websocket import router as ws_router
from .auth import router as auth_router

__all__ = ['api_router', 'ws_router', 'auth_router']