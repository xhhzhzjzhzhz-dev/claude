import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/index.js';
import { authenticate } from '../middleware/auth.js';
import type { AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get vehicle
router.get('/', (req, res) => {
  const vehicles = db.prepare('SELECT * FROM vehicles').all().map((v: any) => ({
    ...v,
    specs: JSON.parse(v.specs || '{}'),
  }));
  res.json({ vehicles });
});

// Get single vehicle
router.get('/:id', (req, res) => {
  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id) as any;
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  vehicle.specs = JSON.parse(vehicle.specs || '{}');
  res.json({ vehicle });
});

// Create configuration
router.post('/configurations', authenticate, (req: AuthRequest, res) => {
  try {
    const { vehicleId, color = '#000000', wheels = 'standard', interior = 'standard', trim = 'standard', aeroPackage = 'standard', name } = req.body;
    
    const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(vehicleId) as any;
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Calculate price based on options
    const basePrice = vehicle.base_price;
    const optionPrices: Record<string, number> = {
      standard: 0,
      sport: 5000,
      carbon: 15000,
      forged: 8000,
      premium: 12000,
      track: 10000,
    };

    const totalPrice = basePrice + 
      (optionPrices[wheels] || 0) +
      (optionPrices[interior] || 0) +
      (optionPrices[trim] || 0) +
      (optionPrices[aeroPackage] || 0);

    const configId = uuidv4();
    db.prepare(`
      INSERT INTO configurations (id, user_id, vehicle_id, name, color, wheels, interior, trim, aero_package, total_price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(configId, req.user!.id, vehicleId, name || 'Custom Build', color, wheels, interior, trim, aeroPackage, totalPrice);

    res.status(201).json({
      configuration: {
        id: configId,
        vehicleId,
        color,
        wheels,
        interior,
        trim,
        aeroPackage,
        name: name || 'Custom Build',
        totalPrice,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create configuration' });
  }
});

// Save configuration
router.post('/configurations/:id/save', authenticate, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const config = db.prepare('SELECT * FROM configurations WHERE id = ? AND user_id = ?').get(id, req.user!.id);
    if (!config) {
      return res.status(404).json({ error: 'Configuration not found' });
    }

    const savedId = uuidv4();
    db.prepare(`
      INSERT INTO saved_configurations (id, user_id, configuration_id, name)
      VALUES (?, ?, ?, ?)
    `).run(savedId, req.user!.id, id, name || 'Saved Build');

    res.status(201).json({ savedConfiguration: { id: savedId, name: name || 'Saved Build' } });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to save configuration' });
  }
});

// Get saved configurations
router.get('/configurations/saved', authenticate, (req: AuthRequest, res) => {
  const saved = db.prepare(`
    SELECT sc.*, c.color, c.wheels, c.interior, c.trim, c.aero_package, c.total_price, v.name as vehicle_name
    FROM saved_configurations sc
    JOIN configurations c ON sc.configuration_id = c.id
    JOIN vehicles v ON c.vehicle_id = v.id
    WHERE sc.user_id = ?
  `).all(req.user!.id);
  res.json({ savedConfigurations: saved });
});

// Delete saved configuration
router.delete('/configurations/saved/:id', authenticate, (req: AuthRequest, res) => {
  const result = db.prepare('DELETE FROM saved_configurations WHERE id = ? AND user_id = ?').run(req.params.id, req.user!.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Saved configuration not found' });
  }
  res.json({ success: true });
});

export default router;
