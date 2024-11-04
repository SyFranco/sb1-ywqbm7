import React, { useState } from 'react';
import { InfrastructureItem, InfrastructureStatus, Category } from '../types';
import { StatusBadge } from './StatusBadge';
import { ImageUpload } from './ImageUpload';
import { Plus } from 'lucide-react';

interface InfrastructureFormProps {
  categories: Category[];
  onAddItem: (item: Omit<InfrastructureItem, 'id' | 'lastUpdated'>) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

export function InfrastructureForm({ categories, onAddItem, onAddCategory }: InfrastructureFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');
  const [status, setStatus] = useState<InfrastructureStatus>('good');
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem({
      name,
      category,
      status,
      notes,
      images,
      locationId: ''
    });
    resetForm();
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName) {
      onAddCategory({
        name: newCategoryName,
        icon: 'box'
      });
      setShowNewCategory(false);
      setNewCategoryName('');
    }
  };

  const resetForm = () => {
    setName('');
    setCategory(categories[0]?.id || '');
    setStatus('good');
    setNotes('');
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Elemento</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <div className="mt-1 flex">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewCategory(true)}
              className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showNewCategory && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Agregar Nueva Categoría</h3>
            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nombre de la Categoría"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewCategory(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Agregar Categoría
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <div className="mt-2 flex space-x-4">
          {(['good', 'bad', 'na'] as InfrastructureStatus[]).map((s) => (
            <label key={s} className="inline-flex items-center">
              <input
                type="radio"
                value={s}
                checked={status === s}
                onChange={(e) => setStatus(e.target.value as InfrastructureStatus)}
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <StatusBadge status={s} className="ml-2" />
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notas</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Imágenes</label>
        <ImageUpload images={images} onImagesChange={setImages} />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Agregar Elemento
        </button>
      </div>
    </form>
  );
}