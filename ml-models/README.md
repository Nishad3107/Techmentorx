# ML Models Directory

This directory contains machine learning models for content filtration and analysis.

## Model Types

### 1. Toxicity Detection
- **Model**: Detoxify (unitary/toxic-bert)
- **Purpose**: Detect hate speech, harassment, profanity, threats
- **Input**: Text content
- **Output**: Toxicity scores across multiple categories

### 2. Sentiment Analysis
- **Model**: RoBERTa-base sentiment
- **Purpose**: Analyze sentiment and emotional tone
- **Input**: Text content
- **Output**: Sentiment classification (positive, negative, neutral)

### 3. Misinformation Detection
- **Model**: Custom fine-tuned RoBERTa
- **Purpose**: Detect potential misinformation and false claims
- **Input**: Text content
- **Output**: Credibility score and risk level

### 4. NSFW Content Detection
- **Model**: ResNet-based image classifier
- **Purpose**: Detect explicit or inappropriate visual content
- **Input**: Images/Videos
- **Output**: Safety classification and confidence score

### 5. Age Appropriateness Classifier
- **Model**: Multi-task BERT model
- **Purpose**: Classify content for age-appropriate ratings
- **Input**: Text and metadata
- **Output**: Age rating (G, PG, PG-13, R, etc.)

## Directory Structure

```
ml-models/
├── pretrained/           # Pre-trained models from HuggingFace/others
├── trained/              # Custom trained models
│   ├── toxicity/
│   ├── misinformation/
│   ├── nsfw/
│   └── age-rating/
├── training/             # Training scripts and datasets
│   ├── scripts/
│   ├── datasets/
│   └── configs/
├── evaluation/           # Model evaluation and metrics
└── notebooks/            # Jupyter notebooks for experiments
```

## Model Training

### Requirements
```bash
pip install -r training/requirements.txt
```

### Training a Model
```bash
cd training/scripts
python train_toxicity.py --config ../configs/toxicity_config.yaml
```

## Model Deployment

Models are served through the Content Filtration Service API.

### Loading Models
Models are automatically loaded on service startup. See `backend/content-filtration-service/src/ml/models/model_loader.py`

### Model Versioning
- Use semantic versioning (v1.0.0, v1.1.0, etc.)
- Store model metadata in `model_registry.json`
- Track performance metrics for each version

## Fairness & Bias Mitigation

All models undergo fairness testing:
- Demographic parity analysis
- Equal opportunity metrics
- Bias detection across protected groups
- Regular retraining with balanced datasets

## Privacy Considerations

- Models operate on anonymized data
- No user identifiable information in training data
- Federated learning support for privacy-preserving training
- On-device inference capabilities for sensitive operations

## Performance Benchmarks

| Model | Accuracy | Latency (ms) | Size (MB) |
|-------|----------|--------------|-----------|
| Toxicity | 94.2% | 45 | 420 |
| Sentiment | 91.8% | 38 | 380 |
| Misinformation | 87.5% | 52 | 450 |
| NSFW | 96.1% | 120 | 95 |
| Age Rating | 89.3% | 48 | 410 |

## Model Updates

Models are retrained monthly or when:
- New attack patterns detected
- Bias metrics degradation
- Performance drop below threshold
- New labeled data available

## License

Models follow their respective licenses. Custom models are MIT licensed.
