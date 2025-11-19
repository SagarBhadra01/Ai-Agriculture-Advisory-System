export interface FarmerProfile {
  name: string;
  location: string;
  farmArea: number;
  irrigationType: 'Borewell' | 'Canal' | 'Rainfed' | 'Drip';
}

export interface Crop {
  id: string;
  name: string;
  suitabilityScore: number;
  reason: string;
  imageUrl: string;
}

export interface ToDoItem {
  id: string;
  category: 'Sowing' | 'Preparation' | 'Irrigation' | 'Fertilizer' | 'Pest' | 'Harvest';
  task: string;
  dueDate: string;
  completed: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  eligibility: string;
  deadline: string;
  description: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  market: string;
  price: number;
  trend: 'up' | 'down' | 'stable';
}

export interface DiseaseResult {
  id: string;
  diseaseName: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  remedy: string[];
}
