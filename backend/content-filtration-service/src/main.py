import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging

from config.settings import settings
from database.mongodb import connect_to_mongo, close_mongo_connection
from api.routes import content, recommendations, user, metrics
from utils.logger import setup_logging

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    logger.info("Starting Content Filtration Service...")
    await connect_to_mongo()
    logger.info("Connected to MongoDB")
    
    # Load ML models
    from ml.models.model_loader import ModelLoader
    app.state.model_loader = ModelLoader()
    await app.state.model_loader.load_models()
    logger.info("ML models loaded successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Content Filtration Service...")
    await close_mongo_connection()

app = FastAPI(
    title="SafeFeed Content Filtration Service",
    description="Privacy-first content filtration and recommendation system",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "content-filtration-service",
        "version": "1.0.0"
    }

# Include routers
app.include_router(content.router, prefix="/api/content", tags=["Content Analysis"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(user.router, prefix="/api/user", tags=["User Settings"])
app.include_router(metrics.router, prefix="/api/metrics", tags=["Metrics"])

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc) if settings.DEBUG else None}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )
