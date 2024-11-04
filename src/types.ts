export type InfrastructureStatus = 'good' | 'bad' | 'na';

export interface Location {
  id: string;
  name: string;
  pavilion: 'A' | 'B' | 'C' | 'D';
  floor: number;
  type: 'classroom' | 'common' | 'facility';
}

export interface InfrastructureItem {
  id: string;
  name: string;
  category: string;
  status: InfrastructureStatus;
  notes?: string;
  images: string[];
  lastUpdated: Date;
  locationId: string;
}

export interface Pavilion {
  id: 'A' | 'B' | 'C' | 'D';
  items: InfrastructureItem[];
  locations: Location[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}