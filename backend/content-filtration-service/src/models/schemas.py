from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class AgeGroup(str, Enum):
    CHILDREN = "children"  # 0-12
    TEEN = "teen"  # 13-17
    YOUNG_ADULT = "young_adult"  # 18-25
    ADULT = "adult"  # 26-64
    SENIOR = "senior"  # 65+

class ContentType(str, Enum):
    TEXT = "text"
    IMAGE = "image"
    VIDEO = "video"
    AUDIO = "audio"
    MIXED = "mixed"

class ToxicityCategory(str, Enum):
    HATE_SPEECH = "hate_speech"
    HARASSMENT = "harassment"
    PROFANITY = "profanity"
    THREATS = "threats"
    NONE = "none"

class SensitivityLevel(str, Enum):
    SAFE = "safe"
    MILD = "mild"
    MODERATE = "moderate"
    HIGH = "high"
    EXPLICIT = "explicit"

# Request Models
class ContentAnalysisRequest(BaseModel):
    content_id: Optional[str] = None
    content: str
    content_type: ContentType = ContentType.TEXT
    metadata: Optional[Dict[str, Any]] = None

class BatchAnalysisRequest(BaseModel):
    items: List[ContentAnalysisRequest]

class UserPreferences(BaseModel):
    user_id: str
    age_group: AgeGroup
    sensitivity_level: SensitivityLevel = SensitivityLevel.MODERATE
    block_toxicity: bool = True
    block_misinformation: bool = True
    block_nsfw: bool = True
    interests: Optional[List[str]] = []

class RecommendationRequest(BaseModel):
    user_id: str
    content_pool: List[Dict[str, Any]]
    limit: int = 20
    
# Response Models
class ToxicityScore(BaseModel):
    overall_score: float = Field(..., ge=0.0, le=1.0)
    categories: Dict[str, float]
    is_toxic: bool
    severity: str  # low, medium, high

class MisinformationScore(BaseModel):
    credibility_score: float = Field(..., ge=0.0, le=1.0)
    risk_level: str  # low, medium, high
    confidence: float
    flags: List[str] = []

class AgeAppropriatenessScore(BaseModel):
    min_age: int
    recommended_age_groups: List[AgeGroup]
    content_rating: str  # G, PG, PG-13, R, etc.
    reasons: List[str] = []

class ContentAnalysisResponse(BaseModel):
    content_id: str
    toxicity: ToxicityScore
    misinformation: Optional[MisinformationScore] = None
    age_appropriateness: AgeAppropriatenessScore
    sensitivity: SensitivityLevel
    is_safe: bool
    recommendations: Dict[str, Any]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class FilteredContent(BaseModel):
    content_id: str
    original_rank: int
    filtered_rank: Optional[int]
    is_filtered: bool
    filter_reason: Optional[str] = None
    safety_score: float

class RecommendationResponse(BaseModel):
    user_id: str
    filtered_content: List[FilteredContent]
    total_filtered: int
    personalization_score: float
    fairness_metrics: Dict[str, float]

class BiasMetrics(BaseModel):
    demographic_parity: float
    equal_opportunity: float
    treatment_equality: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ExplainabilityResponse(BaseModel):
    content_id: str
    decision: str
    confidence: float
    factors: List[Dict[str, Any]]
    model_version: str
