const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'api-gateway',
    timestamp: new Date().toISOString() 
  });
});

// Proxy configurations
const ngoServiceProxy = createProxyMiddleware({
  target: process.env.NGO_SERVICE_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/ngo': '/api'
  },
  onError: (err, req, res) => {
    console.error('NGO Service Proxy Error:', err);
    res.status(500).json({ error: 'NGO service unavailable' });
  }
});

const contentServiceProxy = createProxyMiddleware({
  target: process.env.CONTENT_FILTRATION_SERVICE_URL || 'http://localhost:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/content': '/api'
  },
  onError: (err, req, res) => {
    console.error('Content Service Proxy Error:', err);
    res.status(500).json({ error: 'Content filtration service unavailable' });
  }
});

// Route to services
app.use('/api/ngo', ngoServiceProxy);
app.use('/api/content', contentServiceProxy);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

module.exports = app;
