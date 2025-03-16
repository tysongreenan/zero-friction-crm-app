import React from 'react';
import ClientPortfolio from '@/components/clients/ClientPortfolio';

export default function ClientsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Client Portfolio</h1>
        <p className="text-gray-500">Manage your client relationships</p>
      </div>
      
      <ClientPortfolio />
    </div>
  );
}
