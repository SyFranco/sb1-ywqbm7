import React, { useState } from 'react';
import { Building2, Plus, MapPin, Loader2 } from 'lucide-react';
import { InfrastructureForm } from './components/InfrastructureForm';
import { PavilionView } from './components/PavilionView';
import { LocationSelector } from './components/LocationSelector';
import { LocationForm } from './components/LocationForm';
import { Category } from './types';
import { defaultCategories } from './data';
import { useInfrastructure } from './hooks/useInfrastructure';

function App() {
  const { pavilions, loading, error, addItem, updateItem, addLocation } = useInfrastructure();
  const [selectedPavilion, setSelectedPavilion] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [categories] = useState<Category[]>(defaultCategories);
  const [showForm, setShowForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  const selectedPavilionData = pavilions.find(p => p.id === selectedPavilion)!;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Monitor de Infraestructura
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Pabellón {selectedPavilion}
              </h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
              <button
                onClick={() => setShowLocationForm(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Agregar Ubicación
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar Elemento
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div className="sm:hidden">
              <select
                value={selectedPavilion}
                onChange={(e) => setSelectedPavilion(e.target.value as 'A' | 'B' | 'C' | 'D')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {pavilions.map((pavilion) => (
                  <option key={pavilion.id} value={pavilion.id}>
                    Pabellón {pavilion.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Pabellones">
                {pavilions.map((pavilion) => (
                  <button
                    key={pavilion.id}
                    onClick={() => setSelectedPavilion(pavilion.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      selectedPavilion === pavilion.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Pabellón {pavilion.id}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <LocationSelector
            locations={selectedPavilionData.locations}
            selectedLocationId={selectedLocationId}
            onLocationSelect={setSelectedLocationId}
            pavilion={selectedPavilion}
            selectedFloor={selectedFloor}
            onFloorSelect={setSelectedFloor}
          />
        </div>

        {showForm ? (
          <div className="bg-white shadow rounded-lg p-6">
            <InfrastructureForm
              categories={categories}
              onAddItem={addItem}
              onAddCategory={() => {}}
            />
          </div>
        ) : (
          <PavilionView
            pavilion={selectedPavilionData}
            categories={categories}
            onUpdateItem={updateItem}
          />
        )}

        {showLocationForm && (
          <LocationForm
            pavilion={selectedPavilion}
            onAddLocation={addLocation}
            onClose={() => setShowLocationForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;