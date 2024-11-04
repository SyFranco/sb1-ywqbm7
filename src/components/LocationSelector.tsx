import React from 'react';
import { Location } from '../types';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  locations: Location[];
  selectedLocationId: string | null;
  onLocationSelect: (locationId: string | null) => void;
  pavilion: 'A' | 'B' | 'C' | 'D';
  selectedFloor: number | null;
  onFloorSelect: (floor: number | null) => void;
}

export function LocationSelector({
  locations,
  selectedLocationId,
  onLocationSelect,
  pavilion,
  selectedFloor,
  onFloorSelect,
}: LocationSelectorProps) {
  const floors = Array.from(new Set(locations.map(loc => loc.floor))).sort();
  const filteredLocations = locations.filter(
    loc => (!selectedFloor || loc.floor === selectedFloor)
  );

  const locationTypes = {
    classroom: 'Aula',
    common: 'Área Común',
    facility: 'Instalación'
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Piso</label>
          <select
            value={selectedFloor || ''}
            onChange={(e) => onFloorSelect(e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todos los Pisos</option>
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                Piso {floor}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/3">
          <label className="block text-sm font-medium text-gray-700">Ubicación</label>
          <select
            value={selectedLocationId || ''}
            onChange={(e) => onLocationSelect(e.target.value || null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todas las Ubicaciones</option>
            {filteredLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} - {locationTypes[location.type]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location) => (
          <button
            key={location.id}
            onClick={() => onLocationSelect(location.id === selectedLocationId ? null : location.id)}
            className={`p-4 rounded-lg border ${
              location.id === selectedLocationId
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              <div className="text-left">
                <div className="font-medium">{location.name}</div>
                <div className="text-sm text-gray-500">
                  Piso {location.floor} - {locationTypes[location.type]}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}