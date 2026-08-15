export const hotspots = [
  {
    id: 'engine',
    label: 'ENGINE',
    title: 'Twin-Turbo V8',
    description: '4.0L displacement producing 800+ HP and 700 NM of torque. Dry sump lubrication system ensures optimal performance under extreme G-forces.',
    stats: { power: '800+ HP', torque: '700 NM', displacement: '4.0L' },
    x: 35,
    y: 55,
  },
  {
    id: 'aerodynamics',
    label: 'AERODYNAMICS',
    title: 'Active Aero System',
    description: 'Computational fluid dynamics optimized bodywork with active rear wing and front splitter. Generates 800kg downforce at top speed.',
    stats: { downforce: '800 kg', dragCoeff: '0.28 Cd', adjustment: '100x/sec' },
    x: 50,
    y: 45,
  },
  {
    id: 'cabin',
    label: 'CABIN',
    title: 'Driver-Focused Cockpit',
    description: 'Carbon fiber monocoque cabin with ergonomic positioning. Every control within natural reach, designed around the human form.',
    stats: { weight: '68 kg', material: 'Carbon Fiber', seats: 'Racing Bucket' },
    x: 45,
    y: 50,
  },
  {
    id: 'lighting',
    label: 'LIGHTING',
    title: 'Adaptive LED Matrix',
    description: 'Intelligent lighting system that adapts to driving conditions. Automatic high beam, corner illumination, and dynamic turn signals.',
    stats: { range: '600m', LEDs: '84 per headlight', modes: '6' },
    x: 25,
    y: 52,
  },
  {
    id: 'materials',
    label: 'MATERIALS',
    title: 'Advanced Composites',
    description: 'Aerospace-grade carbon fiber, forged titanium, and ceramic components. Weight reduction without compromising structural integrity.',
    stats: { carbonFiber: '65%', titanium: '12%', aluminum: '23%' },
    x: 60,
    y: 60,
  },
  {
    id: 'chassis',
    label: 'CHASSIS',
    title: 'Carbon Monocoque',
    description: 'Single-piece carbon fiber tub providing exceptional rigidity and safety. Weighs just 68kg while exceeding all safety standards.',
    stats: { weight: '68 kg', rigidity: '28000 Nm/deg', safety: 'FIA Approved' },
    x: 40,
    y: 65,
  },
];

export const colors = [
  { name: 'Obsidian Black', value: '#0a0a0a', price: 0 },
  { name: 'Graphite Grey', value: '#2d2d2d', price: 0 },
  { name: 'Crimson Red', value: '#8b0000', price: 3500 },
  { name: 'Orange Accent', value: '#ff4500', price: 3500 },
  { name: 'Metallic Silver', value: '#c0c0c0', price: 5000 },
  { name: 'Deep Blue', value: '#1a237e', price: 3500 },
];

export const wheels = [
  { name: 'Standard', value: 'standard', price: 0, description: 'Forged aluminum 19"/20"' },
  { name: 'Sport', value: 'sport', price: 5000, description: 'Lightweight forged 19"/20"' },
  { name: 'Carbon', value: 'carbon', price: 15000, description: 'Full carbon fiber 19"/20"' },
];

export const interiors = [
  { name: 'Standard', value: 'standard', price: 0, description: 'Premium leather and Alcantara' },
  { name: 'Premium', value: 'premium', price: 12000, description: 'Full leather with contrast stitching' },
  { name: 'Track', value: 'track', price: 10000, description: 'Carbon racing seats with harness' },
];

export const trims = [
  { name: 'Standard', value: 'standard', price: 0, description: 'Brushed aluminum accents' },
  { name: 'Carbon', value: 'carbon', price: 15000, description: 'Exposed carbon fiber throughout' },
];

export const aeroPackages = [
  { name: 'Standard', value: 'standard', price: 0, description: 'Fixed rear wing' },
  { name: 'Active', value: 'sport', price: 10000, description: 'Active aerodynamic system' },
];

export const navItems = [
  { label: 'MACHINE', href: '/machine' },
  { label: 'PERFORMANCE', href: '/performance' },
  { label: 'TECHNOLOGY', href: '/technology' },
  { label: 'EXPERIENCE', href: '/#experience' },
  { label: 'STORIES', href: '/stories' },
  { label: 'CONFIGURE', href: '/configure' },
];
