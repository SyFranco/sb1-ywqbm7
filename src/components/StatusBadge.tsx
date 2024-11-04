import React from 'react';
import { InfrastructureStatus } from '../types';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';

const statusConfig = {
  good: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'Buen Estado'
  },
  bad: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'Mal Estado'
  },
  na: {
    icon: MinusCircle,
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'No Aplica'
  }
};

interface StatusBadgeProps {
  status: InfrastructureStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${config.bg} ${config.border} ${className}`}>
      <Icon className={`w-4 h-4 mr-1.5 ${config.color}`} />
      <span className={config.color}>{config.text}</span>
    </span>
  );
}