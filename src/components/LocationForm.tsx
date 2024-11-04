import React, { useState } from 'react';
import { Location } from '../types';
import { MapPin } from 'lucide-react';

interface LocationFormProps {
  pavilion: 'A' | 'B' | 'C' | 'D';
  onAddLocation: (location: Omit<Location, 'id'>) => void;
  onClose: () => void;
}

export function LocationForm({ pavilion, onAddLocation, onClose }: LocationFormProps) {
  const [name, setName] = useState('');
  const [floor, setFloor] = useState(1);
  const [type, setType] = useState<Location['type']>('classroom');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLocation({
      name,
      pavilion,
      floor,
      type
    });
    onClose();
  };

  const locationTypes = {
    classroom: 'Aula',
    common: 'Área Común',
    facility: 'Instalación'
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium">Agregar Nueva Ubicación</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ej., A101, Biblioteca"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Piso</label>
            <input
              type="number"
              required
              min={1}
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Location['type'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {(Object.entries(locationTypes) as [Location['type'], string][]).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Agregar Ubicación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}