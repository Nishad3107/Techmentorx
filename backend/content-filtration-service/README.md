# Content Filtration Service

AI-powered content filtration and recommendation system with privacy-first approach.

## Features

### Content Classification
- **Toxicity Detection**: Identifies hate speech, harassment, profanity
- **Age Appropriateness**: Classifies content for different age groups
- **Sensitivity Analysis**: Detects sensitive topics (violence, adult content, etc.)
- **Misinformation Risk**: Assesses credibility and fact-checking

### Personalization
- User-level KPIs (age group, gender-safe handling, engagement behavior)
- Privacy-preserving recommendations
- Federated learning support
- On-device processing capabilities

### Safety & Compliance
- GDPR compliance
- Data anonymization
- Bias detection and mitigation
- Transparency and explainability
- Fairness metrics

## API Endpoints

### Content Analysis
- `POST /api/content/analyze` - Analyze single content
- `POST /api/content/batch-analyze` - Batch analysis
- `GET /api/content/:id/score` - Get content safety score

### Recommendations
- `POST /api/recommendations/feed` - Get personalized feed
- `POST /api/recommendations/filter` - Filter content for user
- `GET /api/recommendations/explain/:contentId` - Explain recommendation

### User Profile (Privacy-First)
- `POST /api/user/preferences` - Update user preferences
- `GET /api/user/safety-settings` - Get safety settings
- `PUT /api/user/safety-settings` - Update safety settings

### Admin & Monitoring
- `GET /api/metrics/bias` - Bias metrics
- `GET /api/metrics/fairness` - Fairness analysis
- `POST /api/models/retrain` - Trigger model retraining

## Setup

```bash
cd backend/content-filtration-service
pip install -r requirements.txt
python src/main.py
```

## Environment Variables

See `.env.example` in the root directory.
