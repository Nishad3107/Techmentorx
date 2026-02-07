from fastapi import APIRouter, HTTPException, Depends
from typing import List
import logging

from models.schemas import (
    ContentAnalysisRequest,
    ContentAnalysisResponse,
    BatchAnalysisRequest
)
from services.content_analyzer import ContentAnalyzer
from services.cache_service import CacheService

router = APIRouter()
logger = logging.getLogger(__name__)

async def get_analyzer():
    """Dependency to get content analyzer"""
    return ContentAnalyzer()

async def get_cache():
    """Dependency to get cache service"""
    return CacheService()

@router.post("/analyze", response_model=ContentAnalysisResponse)
async def analyze_content(
    request: ContentAnalysisRequest,
    analyzer: ContentAnalyzer = Depends(get_analyzer),
    cache: CacheService = Depends(get_cache)
):
    """
    Analyze content for toxicity, misinformation, age-appropriateness, and sensitivity
    """
    try:
        # Check cache first
        cache_key = f"content_analysis:{hash(request.content)}"
        cached_result = await cache.get(cache_key)
        
        if cached_result:
            logger.info(f"Cache hit for content analysis")
            return cached_result
        
        # Analyze content
        result = await analyzer.analyze(request)
        
        # Cache result
        await cache.set(cache_key, result.dict())
        
        return result
    except Exception as e:
        logger.error(f"Content analysis failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/batch-analyze", response_model=List[ContentAnalysisResponse])
async def batch_analyze_content(
    request: BatchAnalysisRequest,
    analyzer: ContentAnalyzer = Depends(get_analyzer)
):
    """
    Batch analyze multiple content items
    """
    try:
        results = await analyzer.batch_analyze(request.items)
        return results
    except Exception as e:
        logger.error(f"Batch analysis failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{content_id}/score")
async def get_content_score(
    content_id: str,
    cache: CacheService = Depends(get_cache)
):
    """
    Get cached content safety score
    """
    try:
        cache_key = f"content_score:{content_id}"
        result = await cache.get(cache_key)
        
        if not result:
            raise HTTPException(status_code=404, detail="Content score not found")
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get content score: {e}")
        raise HTTPException(status_code=500, detail=str(e))
