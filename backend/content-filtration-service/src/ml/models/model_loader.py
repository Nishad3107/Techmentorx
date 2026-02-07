import logging
from typing import Dict, Any
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from detoxify import Detoxify

from config.settings import settings

logger = logging.getLogger(__name__)

class ModelLoader:
    """Load and manage ML models"""
    
    def __init__(self):
        self.models: Dict[str, Any] = {}
        self.tokenizers: Dict[str, Any] = {}
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"Using device: {self.device}")
    
    async def load_models(self):
        """Load all required models"""
        try:
            # Load toxicity detection model
            logger.info("Loading toxicity detection model...")
            self.models['toxicity'] = Detoxify('original', device=self.device)
            
            # Load sentiment analysis model
            logger.info("Loading sentiment analysis model...")
            self.tokenizers['sentiment'] = AutoTokenizer.from_pretrained(
                settings.SENTIMENT_MODEL
            )
            self.models['sentiment'] = AutoModelForSequenceClassification.from_pretrained(
                settings.SENTIMENT_MODEL
            ).to(self.device)
            
            # Load misinformation detection model (placeholder)
            logger.info("Loading misinformation detection model...")
            # In production, load a custom-trained model
            self.models['misinformation'] = None  # Placeholder
            
            logger.info("All models loaded successfully")
            
        except Exception as e:
            logger.error(f"Failed to load models: {e}")
            raise
    
    def get_model(self, model_name: str):
        """Get a specific model"""
        return self.models.get(model_name)
    
    def get_tokenizer(self, model_name: str):
        """Get a specific tokenizer"""
        return self.tokenizers.get(model_name)
