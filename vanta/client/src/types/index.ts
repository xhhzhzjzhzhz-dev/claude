export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  base_price: number;
  image_url: string;
  specs: {
    power: number;
    torque: number;
    zeroToHundred: number;
    topSpeed: number;
    weight: number;
  };
}

export interface Configuration {
  id: string;
  vehicleId: string;
  color: string;
  wheels: string;
  interior: string;
  trim: string;
  aeroPackage: string;
  name: string;
  totalPrice: number;
}

export interface SavedConfiguration {
  id: string;
  name: string;
  color: string;
  wheels: string;
  interior: string;
  trim: string;
  aero_package: string;
  total_price: number;
  vehicle_name: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  reading_time: number;
  published_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  publication: string;
  order_index: number;
}

export interface Telemetry {
  rpm: number;
  boost: number;
  temperature: number;
  gForce: number;
  throttle: number;
  lapDelta: number;
  recordedAt: string;
}

export interface Hotspot {
  id: string;
  label: string;
  title: string;
  description: string;
  stats?: Record<string, string>;
  x: number;
  y: number;
}
