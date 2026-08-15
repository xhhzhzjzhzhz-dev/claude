import { Router } from 'express';
import db from '../db/index.js';

const router = Router();

// Get simulated telemetry (generates realistic values)
router.get('/', (req, res) => {
  const now = new Date().toISOString();
  
  // Generate realistic simulated telemetry
  const telemetry = {
    rpm: Math.floor(3000 + Math.random() * 5000),
    boost: +(0.5 + Math.random() * 1.8).toFixed(2),
    temperature: +(75 + Math.random() * 35).toFixed(1),
    gForce: +(0.2 + Math.random() * 2.5).toFixed(2),
    throttle: +(20 + Math.random() * 80).toFixed(1),
    lapDelta: (+(-0.5 + Math.random() * 1.5).toFixed(3)),
    recordedAt: now,
  };

  res.json({ telemetry });
});

// Get telemetry history (for charts)
router.get('/history', (req, res) => {
  const history = [];
  const now = Date.now();
  
  for (let i = 10; i >= 0; i--) {
    history.push({
      rpm: Math.floor(3000 + Math.random() * 5000),
      boost: +(0.5 + Math.random() * 1.8).toFixed(2),
      temperature: +(75 + Math.random() * 35).toFixed(1),
      gForce: +(0.2 + Math.random() * 2.5).toFixed(2),
      throttle: +(20 + Math.random() * 80).toFixed(1),
      timestamp: new Date(now - i * 100).toISOString(),
    });
  }
  
  res.json({ history });
});

export default router;
