import db from './index.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const adminId = uuidv4();
const hashedPassword = bcrypt.hashSync('admin123', 10);

// Insert admin user
try {
  db.prepare(`
    INSERT OR IGNORE INTO users (id, email, password_hash, name, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(adminId, 'admin@vanta.com', hashedPassword, 'VANTA Admin', 'admin');
  console.log('Admin user created: admin@vanta.com / admin123');
} catch (e) {
  console.error('Error creating admin:', e);
}

// Insert base vehicle
const vehicleId = uuidv4();
try {
  db.prepare(`
    INSERT OR IGNORE INTO vehicles (id, name, base_price, image_url, specs)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    vehicleId,
    'VANTA ONE',
    285000,
    '/images/vehicle.png',
    JSON.stringify({
      power: 800,
      torque: 700,
      zeroToHundred: 2.8,
      topSpeed: 350,
      weight: 1450,
    })
  );
  console.log('Base vehicle created: VANTA ONE');
} catch (e) {
  console.error('Error creating vehicle:', e);
}

// Insert stories
const stories = [
  {
    id: uuidv4(),
    title: 'The Architecture of Speed',
    slug: 'architecture-of-speed',
    category: 'Engineering',
    excerpt: 'How computational design creates forms that cut through air like a blade.',
    content: 'Every curve, every edge, every surface of the VANTA ONE serves a purpose. We used computational fluid dynamics to simulate over 10,000 hours of virtual wind tunnel testing. The result is a form that doesnt just look fast—it is fast. The architecture emerges from pure function, refined through thousands of iterations until nothing remains but necessity.',
    image_url: '/images/story1.jpg',
    author: 'Dr. Elena Vasquez',
    reading_time: 8,
    published_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Materials Without Limits',
    slug: 'materials-without-limits',
    category: 'Materials',
    excerpt: 'Carbon fiber, titanium, and ceramics—pushing beyond conventional boundaries.',
    content: 'We source materials from aerospace suppliers and Formula 1 teams. Our carbon monocoque is cured at temperatures exceeding 600°C, creating bonds stronger than steel at half the weight. Titanium exhaust components are 3D printed layer by layer, allowing geometries impossible with traditional manufacturing.',
    image_url: '/images/story2.jpg',
    author: 'Marcus Chen',
    reading_time: 6,
    published_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Why Aerodynamics Matter',
    slug: 'why-aerodynamics-matter',
    category: 'Performance',
    excerpt: 'At 350 km/h, air becomes your greatest enemy—and your most powerful ally.',
    content: 'Aerodynamic drag increases with the square of velocity. At our top speed, the VANTA ONE generates over 800kg of downforce while maintaining a drag coefficient of just 0.28. Active aerodynamic surfaces adjust 100 times per second, optimizing balance between efficiency and grip in real-time.',
    image_url: '/images/story3.jpg',
    author: 'James Morrison',
    reading_time: 7,
    published_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'The Psychology of Performance',
    slug: 'psychology-of-performance',
    category: 'Design',
    excerpt: 'What does it feel like to command 800 horsepower? We studied the human element.',
    content: 'Performance isnt just about numbers. Its about the connection between driver and machine. We spent months studying how elite drivers interact with their vehicles—their eye movements, their hand positions, their breathing patterns. Every control placement, every feedback mechanism, every interface element was designed to extend the drivers senses.',
    image_url: '/images/story4.jpg',
    author: 'Dr. Sarah Williams',
    reading_time: 9,
    published_at: new Date().toISOString(),
  },
];

for (const story of stories) {
  try {
    db.prepare(`
      INSERT OR IGNORE INTO stories (id, title, slug, category, excerpt, content, image_url, author, reading_time, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(story.id, story.title, story.slug, story.category, story.excerpt, story.content, story.image_url, story.author, story.reading_time, story.published_at);
  } catch (e) {
    console.error('Error creating story:', story.title, e);
  }
}

// Insert testimonials
const testimonials = [
  {
    id: uuidv4(),
    quote: 'The VANTA ONE represents a fundamental shift in what a performance vehicle can be. It doesnt just compete—it redefines.',
    name: 'Alexandre Dupont',
    role: 'Editor-in-Chief',
    publication: 'Automotive Excellence',
    order_index: 0,
  },
  {
    id: uuidv4(),
    quote: 'Ive driven every hypercar on the market. Nothing prepares you for the visceral intensity of the VANTA experience.',
    name: 'Michael Torres',
    role: 'Senior Road Test Editor',
    publication: 'Velocity Magazine',
    order_index: 1,
  },
  {
    id: uuidv4(),
    quote: 'From a purely engineering standpoint, the VANTA ONE achieves what many said was impossible. A true masterpiece.',
    name: 'Dr. Heinrich Braun',
    role: 'Technical Director',
    publication: 'Engineering Today',
    order_index: 2,
  },
  {
    id: uuidv4(),
    quote: 'The attention to detail is extraordinary. Every surface, every material, every interaction feels considered and intentional.',
    name: 'Isabella Romano',
    role: 'Design Critic',
    publication: 'Form & Function',
    order_index: 3,
  },
];

for (const testimonial of testimonials) {
  try {
    db.prepare(`
      INSERT OR IGNORE INTO testimonials (id, quote, name, role, publication, order_index)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(testimonial.id, testimonial.quote, testimonial.name, testimonial.role, testimonial.publication, testimonial.order_index);
  } catch (e) {
    console.error('Error creating testimonial:', e);
  }
}

console.log('Database seeded successfully.');
