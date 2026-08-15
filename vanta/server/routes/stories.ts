import { Router } from 'express';
import db from '../db/index.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get all stories
router.get('/', (req, res) => {
  const stories = db.prepare('SELECT * FROM stories ORDER BY published_at DESC').all();
  res.json({ stories });
});

// Get single story by slug
router.get('/:slug', (req, res) => {
  const story = db.prepare('SELECT * FROM stories WHERE slug = ?').get(req.params.slug);
  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }
  res.json({ story });
});

// Create story (admin only)
router.post('/', authenticate, requireAdmin, (req: AuthRequest, res) => {
  try {
    const { title, slug, category, excerpt, content, imageUrl, author, readingTime } = req.body;
    const id = require('crypto').randomUUID();
    
    db.prepare(`
      INSERT INTO stories (id, title, slug, category, excerpt, content, image_url, author, reading_time, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(id, title, slug, category, excerpt || null, content, imageUrl || null, author || null, readingTime || null);

    res.status(201).json({ success: true, id });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create story' });
  }
});

// Update story (admin only)
router.put('/:id', authenticate, requireAdmin, (req: AuthRequest, res) => {
  try {
    const { title, slug, category, excerpt, content, imageUrl, author, readingTime } = req.body;
    
    db.prepare(`
      UPDATE stories 
      SET title = ?, slug = ?, category = ?, excerpt = ?, content = ?, image_url = ?, author = ?, reading_time = ?
      WHERE id = ?
    `).run(title, slug, category, excerpt, content, imageUrl, author, readingTime, req.params.id);

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update story' });
  }
});

// Delete story (admin only)
router.delete('/:id', authenticate, requireAdmin, (req: AuthRequest, res) => {
  const result = db.prepare('DELETE FROM stories WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Story not found' });
  }
  res.json({ success: true });
});

export default router;
