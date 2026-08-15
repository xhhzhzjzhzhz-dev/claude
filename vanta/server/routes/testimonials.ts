import { Router } from 'express';
import db from '../db/index.js';

const router = Router();

// Get all testimonials
router.get('/', (req, res) => {
  const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY order_index ASC').all();
  res.json({ testimonials });
});

export default router;
