from fastapi import APIRouter, HTTPException, Depends
import logging

from models.schemas import UserPreferences
from services.user_service import UserService

router = APIRouter()
logger = logging.getLogger(__name__)

async def get_user_service():
    """Dependency to get user service"""
    return UserService()

@router.post("/preferences")
async def update_user_preferences(
    preferences: UserPreferences,
    service: UserService = Depends(get_user_service)
):
    """
    Update user content preferences (privacy-preserving)
    """
    try:
        await service.update_preferences(preferences)
        return {"message": "Preferences updated successfully"}
    except Exception as e:
        logger.error(f"Failed to update preferences: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/safety-settings")
async def get_safety_settings(
    user_id: str,
    service: UserService = Depends(get_user_service)
):
    """
    Get user safety settings
    """
    try:
        settings = await service.get_safety_settings(user_id)
        return settings
    except Exception as e:
        logger.error(f"Failed to get safety settings: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/safety-settings")
async def update_safety_settings(
    user_id: str,
    settings: dict,
    service: UserService = Depends(get_user_service)
):
    """
    Update user safety settings
    """
    try:
        await service.update_safety_settings(user_id, settings)
        return {"message": "Safety settings updated successfully"}
    except Exception as e:
        logger.error(f"Failed to update safety settings: {e}")
        raise HTTPException(status_code=500, detail=str(e))
