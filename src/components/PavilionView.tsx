import React from 'react';
import { Pavilion, InfrastructureItem, Category } from '../types';
import { StatusBadge } from './StatusBadge';
import * as Icons from 'lucide-react';

interface PavilionViewProps {
  pavilion: Pavilion;
  categories: Category[];
  onUpdateItem: (itemId: string, updates: Partial<InfrastructureItem>) => void;
}

export function PavilionView({ pavilion, categories, onUpdateItem }: PavilionViewProps) {
  const itemsByCategory = pavilion.items.reduce((acc, item) => {
    const category = categories.find(c => c.id === item.category);
    if (!category) return acc;
    
    if (!acc[category.id]) {
      acc[category.id] = {
        category,
        items: []
      };
    }
    acc[category.id].items.push(item);
    return acc;
  }, {} as Record<string, { category: Category; items: InfrastructureItem[] }>);

  return (
    <div className="space-y-8">
      {Object.values(itemsByCategory).map(({ category, items }) => {
        const IconComponent = Icons[category.icon as keyof typeof Icons] || Icons.Box;
        
        return (
          <div key={category.id} className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="flex items-center text-lg leading-6 font-medium text-gray-900">
                <IconComponent className="w-5 h-5 mr-2" />
                {category.name}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      {item.notes && (
                        <p className="mt-1 text-sm text-gray-600">{item.notes}</p>
                      )}
                    </div>
                    <div className="ml-4">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                  {item.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {item.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${item.name} - Image ${index + 1}`}
                          className="h-24 w-full object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}