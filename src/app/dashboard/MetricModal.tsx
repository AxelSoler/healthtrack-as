'use client';

import { useState } from 'react';
import { MetricForm } from './MetricForm';
import { Modal } from '@/components/modal/Modal';

export function MetricModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl flex justify-end">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
      >
        Add Metric
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MetricForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}
