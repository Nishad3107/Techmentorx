import logging
import re
from typing import List
from models.schemas import AgeAppropriatenessScore, AgeGroup

logger = logging.getLogger(__name__)

class AgeAppropriatenessAnalyzer:
    """Analyze content for age appropriateness"""
    
    def __init__(self):
        # Keywords that indicate mature content
        self.adult_keywords = [
            'violence', 'sexual', 'alcohol', 'drugs', 'gambling',
            'profanity', 'weapon', 'gore', 'explicit'
        ]
        
        # Keywords for different age ratings
        self.mature_patterns = {
            'explicit_violence': r'\b(kill|murder|blood|gore|torture)\w*\b',
            'sexual_content': r'\b(sex|sexual|nude|porn)\w*\b',
            'substance_abuse': r'\b(drug|alcohol|cocaine|marijuana)\w*\b',
            'profanity': r'\b(fuck|shit|damn|hell|bitch)\w*\b'
        }
    
    async def analyze(self, text: str, toxicity_score: float) -> AgeAppropriatenessScore:
        """Analyze content for age appropriateness"""
        try:
            text_lower = text.lower()
            reasons = []
            
            # Check for mature content patterns
            mature_flags = {}
            for category, pattern in self.mature_patterns.items():
                matches = re.findall(pattern, text_lower, re.IGNORECASE)
                if matches:
                    mature_flags[category] = len(matches)
                    reasons.append(f"Contains {category.replace('_', ' ')}")
            
            # Determine minimum age based on content
            min_age = 0
            
            if toxicity_score > 0.7 or mature_flags.get('explicit_violence', 0) > 2:
                min_age = 18
                content_rating = "R"
            elif toxicity_score > 0.5 or any(mature_flags.values()):
                min_age = 13
                content_rating = "PG-13"
            elif toxicity_score > 0.3:
                min_age = 7
                content_rating = "PG"
            else:
                min_age = 0
                content_rating = "G"
            
            # Determine recommended age groups
            recommended_age_groups = []
            if min_age <= 12:
                recommended_age_groups.extend([AgeGroup.CHILDREN, AgeGroup.TEEN, AgeGroup.YOUNG_ADULT, AgeGroup.ADULT, AgeGroup.SENIOR])
            elif min_age <= 17:
                recommended_age_groups.extend([AgeGroup.TEEN, AgeGroup.YOUNG_ADULT, AgeGroup.ADULT, AgeGroup.SENIOR])
            else:
                recommended_age_groups.extend([AgeGroup.YOUNG_ADULT, AgeGroup.ADULT, AgeGroup.SENIOR])
            
            return AgeAppropriatenessScore(
                min_age=min_age,
                recommended_age_groups=recommended_age_groups,
                content_rating=content_rating,
                reasons=reasons
            )
            
        except Exception as e:
            logger.error(f"Age appropriateness analysis failed: {e}")
            # Return safe default
            return AgeAppropriatenessScore(
                min_age=0,
                recommended_age_groups=[AgeGroup.CHILDREN, AgeGroup.TEEN, AgeGroup.YOUNG_ADULT, AgeGroup.ADULT, AgeGroup.SENIOR],
                content_rating="G",
                reasons=[]
            )
