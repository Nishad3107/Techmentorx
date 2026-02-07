# MongoDB Collections for Content Filtration

## Collections

### 1. content_analysis
Stores content analysis results and scores.

```javascript
{
  _id: ObjectId,
  content_id: String,
  content_hash: String,
  analysis: {
    toxicity: {
      overall_score: Number,
      categories: Object,
      is_toxic: Boolean,
      severity: String
    },
    sentiment: Object,
    age_appropriateness: Object,
    sensitivity: String
  },
  created_at: Date,
  expires_at: Date  // TTL index for auto-deletion
}
```

### 2. user_preferences
Stores user content preferences (anonymized).

```javascript
{
  _id: ObjectId,
  user_hash: String,  // Anonymized user ID
  age_group: String,
  sensitivity_level: String,
  filters: {
    block_toxicity: Boolean,
    block_misinformation: Boolean,
    block_nsfw: Boolean
  },
  interests: Array,
  updated_at: Date
}
```

### 3. fairness_metrics
Stores fairness evaluation metrics over time.

```javascript
{
  _id: ObjectId,
  metric_type: String,
  demographic_group: String,
  value: Number,
  timestamp: Date,
  model_version: String
}
```

### 4. audit_logs
Stores content filtration decisions for transparency.

```javascript
{
  _id: ObjectId,
  content_id: String,
  user_hash: String,
  decision: String,
  confidence: Number,
  factors: Array,
  timestamp: Date
}
```
