import React from 'react';
import MissionControl from '@/components/mission-control/MissionControl';

export default function MissionControlPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mission Control</h1>
        <p className="text-gray-500">Manage and track your client missions</p>
      </div>
      
      <MissionControl />
    </div>
  );
}
