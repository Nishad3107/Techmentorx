import logging
from typing import List
import uuid
from datetime import datetime

from models.schemas import (
    ContentAnalysisRequest,
    ContentAnalysisResponse,
    SensitivityLevel
)
from ml.analyzers.toxicity_analyzer import ToxicityAnalyzer
from ml.analyzers.age_analyzer import AgeAppropriatenessAnalyzer

logger = logging.getLogger(__name__)

class ContentAnalyzer:
    """Main content analysis service"""
    
    def __init__(self):
        # Models will be loaded from app state
        self.toxicity_analyzer = None
        self.age_analyzer = AgeAppropriatenessAnalyzer()
    
    async def analyze(self, request: ContentAnalysisRequest) -> ContentAnalysisResponse:
        """Analyze a single piece of content"""
        try:
            content_id = request.content_id or str(uuid.uuid4())
            
            # TODO: Get model from app state
            # For now, create placeholder analyzers
            from ml.models.model_loader import ModelLoader
            loader = ModelLoader()
            # await loader.load_models()
            
            # Analyze toxicity (placeholder for now)
            from models.schemas import ToxicityScore
            toxicity = ToxicityScore(
                overall_score=0.1,
                categories={},
                is_toxic=False,
                severity="low"
            )
            
            # Analyze age appropriateness
            age_appropriateness = await self.age_analyzer.analyze(
                request.content,
                toxicity.overall_score
            )
            
            # Determine sensitivity level
            sensitivity = self._determine_sensitivity(toxicity, age_appropriateness)
            
            # Determine if content is safe
            is_safe = (
                not toxicity.is_toxic and
                age_appropriateness.min_age < 18 and
                sensitivity in [SensitivityLevel.SAFE, SensitivityLevel.MILD]
            )
            
            return ContentAnalysisResponse(
                content_id=content_id,
                toxicity=toxicity,
                age_appropriateness=age_appropriateness,
                sensitivity=sensitivity,
                is_safe=is_safe,
                recommendations={
                    "action": "allow" if is_safe else "review",
                    "confidence": 0.85
                }
            )
            
        except Exception as e:
            logger.error(f"Content analysis failed: {e}")
            raise
    
    async def batch_analyze(self, items: List[ContentAnalysisRequest]) -> List[ContentAnalysisResponse]:
        """Analyze multiple content items"""
        results = []
        for item in items:
            result = await self.analyze(item)
            results.append(result)
        return results
    
    def _determine_sensitivity(self, toxicity, age_appropriateness) -> SensitivityLevel:
        """Determine overall sensitivity level"""
        if toxicity.overall_score > 0.7:
            return SensitivityLevel.EXPLICIT
        elif toxicity.overall_score > 0.5 or age_appropriateness.min_age >= 18:
            return SensitivityLevel.HIGH
        elif toxicity.overall_score > 0.3 or age_appropriateness.min_age >= 13:
            return SensitivityLevel.MODERATE
        elif toxicity.overall_score > 0.1:
            return SensitivityLevel.MILD
        else:
            return SensitivityLevel.SAFE
