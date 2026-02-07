from fastapi import APIRouter, HTTPException, Depends
import logging

from models.schemas import BiasMetrics
from services.fairness_service import FairnessService

router = APIRouter()
logger = logging.getLogger(__name__)

async def get_fairness_service():
    """Dependency to get fairness service"""
    return FairnessService()

@router.get("/bias", response_model=BiasMetrics)
async def get_bias_metrics(
    service: FairnessService = Depends(get_fairness_service)
):
    """
    Get current bias metrics across demographics
    """
    try:
        metrics = await service.calculate_bias_metrics()
        return metrics
    except Exception as e:
        logger.error(f"Failed to get bias metrics: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/fairness")
async def get_fairness_analysis(
    time_range: str = "24h",
    service: FairnessService = Depends(get_fairness_service)
):
    """
    Get fairness analysis over time
    """
    try:
        analysis = await service.analyze_fairness(time_range)
        return analysis
    except Exception as e:
        logger.error(f"Failed to get fairness analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/models/retrain")
async def trigger_model_retrain(
    model_name: str,
    service: FairnessService = Depends(get_fairness_service)
):
    """
    Trigger model retraining with fairness constraints
    """
    try:
        result = await service.trigger_retrain(model_name)
        return result
    except Exception as e:
        logger.error(f"Failed to trigger retrain: {e}")
        raise HTTPException(status_code=500, detail=str(e))
