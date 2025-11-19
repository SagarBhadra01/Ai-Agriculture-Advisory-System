import type { Crop, DiseaseResult, MarketPrice, Scheme, ToDoItem } from '../types';

export const MOCK_CROPS: Crop[] = [
  {
    id: '1',
    name: 'Rice (Paddy)',
    suitabilityScore: 92,
    reason: 'High rainfall and clay soil match perfectly.',
    imageUrl: 'https://images.unsplash.com/photo-1536617621572-1d5f1e6269a0?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    name: 'Wheat',
    suitabilityScore: 85,
    reason: 'Temperature range is optimal for winter season.',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3',
    name: 'Sugarcane',
    suitabilityScore: 78,
    reason: 'Good water availability but soil pH is slightly high.',
    imageUrl: 'https://images.unsplash.com/photo-1601629665060-f6c9461068d4?auto=format&fit=crop&q=80&w=1000',
  },
];

export const MOCK_TODOS: ToDoItem[] = [
  {
    id: '1',
    category: 'Preparation',
    task: 'Plough the field to a depth of 20-25 cm.',
    dueDate: '2023-11-25',
    completed: false,
  },
  {
    id: '2',
    category: 'Sowing',
    task: 'Treat seeds with fungicide before sowing.',
    dueDate: '2023-11-28',
    completed: false,
  },
  {
    id: '3',
    category: 'Irrigation',
    task: 'First irrigation 21 days after sowing.',
    dueDate: '2023-12-15',
    completed: false,
  },
];

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN',
    eligibility: 'Small and marginal farmers',
    deadline: '2023-12-31',
    description: 'Income support of ₹6,000 per year in three equal installments.',
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    eligibility: 'All farmers growing notified crops',
    deadline: '2024-01-15',
    description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage.',
  },
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
  { id: '1', crop: 'Rice', market: 'Mandya APMC', price: 2200, trend: 'up' },
  { id: '2', crop: 'Wheat', market: 'Local Mandi', price: 2100, trend: 'stable' },
  { id: '3', crop: 'Tomato', market: 'City Market', price: 1500, trend: 'down' },
  { id: '4', crop: 'Cotton', market: 'Regional Hub', price: 6500, trend: 'up' },
];

export const MOCK_DISEASE_RESULT: DiseaseResult = {
  id: '1',
  diseaseName: 'Leaf Blast',
  severity: 'High',
  description: 'Fungal infection causing spindle-shaped spots on leaves.',
  remedy: [
    'Spray Tricyclazole 75 WP @ 0.6g/liter of water.',
    'Avoid excessive nitrogen fertilizer.',
    'Maintain proper water level in the field.',
  ],
};

export const MOCK_WEATHER = {
  temp: '28°C',
  humidity: '65%',
  rainfall: 'Moderate',
  forecast: 'Cloudy with chance of rain',
};
