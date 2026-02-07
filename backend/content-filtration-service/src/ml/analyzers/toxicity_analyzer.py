import logging
from typing import Dict
from models.schemas import ToxicityScore, ToxicityCategory
from config.settings import settings

logger = logging.getLogger(__name__)

class ToxicityAnalyzer:
    """Analyze content for toxic behavior"""
    
    def __init__(self, model):
        self.model = model
        self.threshold = settings.TOXICITY_THRESHOLD
    
    async def analyze(self, text: str) -> ToxicityScore:
        """Analyze text for toxicity"""
        try:
            # Use Detoxify model
            results = self.model.predict(text)
            
            # Extract scores
            categories = {
                "toxicity": float(results['toxicity']),
                "severe_toxicity": float(results['severe_toxicity']),
                "obscene": float(results['obscene']),
                "threat": float(results['threat']),
                "insult": float(results['insult']),
                "identity_attack": float(results['identity_attack'])
            }
            
            # Calculate overall score (weighted average)
            overall_score = (
                categories['toxicity'] * 0.3 +
                categories['severe_toxicity'] * 0.25 +
                categories['obscene'] * 0.15 +
                categories['threat'] * 0.15 +
                categories['insult'] * 0.1 +
                categories['identity_attack'] * 0.05
            )
            
            is_toxic = overall_score > self.threshold
            
            # Determine severity
            if overall_score < 0.3:
                severity = "low"
            elif overall_score < 0.6:
                severity = "medium"
            else:
                severity = "high"
            
            return ToxicityScore(
                overall_score=overall_score,
                categories=categories,
                is_toxic=is_toxic,
                severity=severity
            )
            
        except Exception as e:
            logger.error(f"Toxicity analysis failed: {e}")
            # Return safe default
            return ToxicityScore(
                overall_score=0.0,
                categories={},
                is_toxic=False,
                severity="low"
            )
