from fastapi import APIRouter, HTTPException, Depends
import logging

from models.schemas import (
    RecommendationRequest,
    RecommendationResponse,
    ExplainabilityResponse
)
from services.recommendation_engine import RecommendationEngine
from services.privacy_service import PrivacyService

router = APIRouter()
logger = logging.getLogger(__name__)

async def get_recommendation_engine():
    """Dependency to get recommendation engine"""
    return RecommendationEngine()

async def get_privacy_service():
    """Dependency to get privacy service"""
    return PrivacyService()

@router.post("/feed", response_model=RecommendationResponse)
async def get_personalized_feed(
    request: RecommendationRequest,
    engine: RecommendationEngine = Depends(get_recommendation_engine),
    privacy: PrivacyService = Depends(get_privacy_service)
):
    """
    Get personalized and filtered content feed
    """
    try:
        # Anonymize user data for privacy
        anonymized_profile = await privacy.anonymize_user_profile(request.user_id)
        
        # Generate recommendations
        recommendations = await engine.generate_recommendations(
            anonymized_profile,
            request.content_pool,
            request.limit
        )
        
        # Apply fairness checks
        fair_recommendations = await engine.apply_fairness_constraints(recommendations)
        
        return fair_recommendations
    except Exception as e:
        logger.error(f"Feed generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/filter")
async def filter_content(
    request: RecommendationRequest,
    engine: RecommendationEngine = Depends(get_recommendation_engine)
):
    """
    Filter content based on user safety settings
    """
    try:
        filtered = await engine.filter_unsafe_content(
            request.user_id,
            request.content_pool
        )
        return filtered
    except Exception as e:
        logger.error(f"Content filtering failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/explain/{content_id}", response_model=ExplainabilityResponse)
async def explain_recommendation(
    content_id: str,
    user_id: str,
    engine: RecommendationEngine = Depends(get_recommendation_engine)
):
    """
    Explain why content was recommended or filtered
    """
    try:
        explanation = await engine.explain_decision(user_id, content_id)
        return explanation
    except Exception as e:
        logger.error(f"Explanation generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
