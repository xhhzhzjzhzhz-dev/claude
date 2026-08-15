import { Router } from 'express';
import db from '../db/index.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import type { AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get dashboard stats
router.get('/stats', authenticate, requireAdmin, (req: AuthRequest, res) => {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as any;
  const configCount = db.prepare('SELECT COUNT(*) as count FROM configurations').get() as any;
  const storyCount = db.prepare('SELECT COUNT(*) as count FROM stories').get() as any;
  
  res.json({
    stats: {
      users: userCount.count,
      configurations: configCount.count,
      stories: storyCount.count,
    },
  });
});

// Get all users
router.get('/users', authenticate, requireAdmin, (req: AuthRequest, res) => {
  const users = db.prepare('SELECT id, email, name, role, created_at FROM users').all();
  res.json({ users });
});

// Get all configurations
router.get('/configurations', authenticate, requireAdmin, (req: AuthRequest, res) => {
  const configs = db.prepare(`
    SELECT c.*, u.email as user_email, v.name as vehicle_name
    FROM configurations c
    JOIN users u ON c.user_id = u.id
    JOIN vehicles v ON c.vehicle_id = v.id
    ORDER BY c.created_at DESC
  `).all();
  res.json({ configurations: configs });
});

// Delete configuration
router.delete('/configurations/:id', authenticate, requireAdmin, (req: AuthRequest, res) => {
  const result = db.prepare('DELETE FROM configurations WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Configuration not found' });
  }
  res.json({ success: true });
});

export default router;
