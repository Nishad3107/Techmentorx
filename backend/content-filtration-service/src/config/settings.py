from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Service
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"
    
    # Database
    MONGODB_URI: str
    MONGODB_DB: str = "content_filtration"
    
    # Redis
    REDIS_URL: str
    REDIS_TTL: int = 3600
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8080"]
    
    # ML Models
    MODEL_PATH: str = "./models"
    TOXICITY_MODEL: str = "unitary/toxic-bert"
    SENTIMENT_MODEL: str = "cardiffnlp/twitter-roberta-base-sentiment"
    MISINFORMATION_MODEL: str = "roberta-base"
    
    # Thresholds
    TOXICITY_THRESHOLD: float = 0.7
    MISINFORMATION_THRESHOLD: float = 0.6
    NSFW_THRESHOLD: float = 0.5
    
    # Privacy
    ANONYMIZATION_ENABLED: bool = True
    DATA_RETENTION_DAYS: int = 90
    
    # External APIs
    PERSPECTIVE_API_KEY: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
