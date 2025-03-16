"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, ArrowUpDown, 
  Plus, Phone, Mail, ArrowRight, Calendar, 
  UserPlus, MoreHorizontal, User, ShieldCheck,
  Star
} from 'lucide-react';
import { ClientTier } from '@/types/mission';

// Function to get client tier badge with styling
function getClientTierBadge(tier: ClientTier) {
  const tiers: Record<ClientTier, { color: string, borderColor: string, textColor: string, label: string }> = {
    bronze: {
      color: 'bg-amber-100',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800',
      label: 'Bronze'
    },
    silver: {
      color: 'bg-gray-100',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800',
      label: 'Silver'
    },
    gold: {
      color: 'bg-amber-100',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-800',
      label: 'Gold'
    },
    platinum: {
      color: 'bg-blue-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      label: 'Platinum'
    }
  };
  
  const tierStyle = tiers[tier];
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tierStyle.color} ${tierStyle.textColor} border ${tierStyle.borderColor}`}>
      {tierStyle.label}
    </span>
  );
}

// Client interface
interface Client {
  id: string;
  name: string;
  tier: ClientTier;
  relationshipPoints: number;
  lastContact: Date;
  email: string;
  phone: string;
  industry: string;
  nextMeeting?: Date;
  avatar?: string;
}

// Sample client data
const sampleClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    tier: 'gold',
    relationshipPoints: 720,
    lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    email: 'contact@acme.com',
    phone: '(555) 123-4567',
    industry: 'Technology',
    nextMeeting: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
  },
  {
    id: '2',
    name: 'Globex Industries',
    tier: 'silver',
    relationshipPoints: 340,
    lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    email: 'info@globex.com',
    phone: '(555) 987-6543',
    industry: 'Manufacturing'
  },
  {
    id: '3',
    name: 'Cyberdyne Systems',
    tier: 'platinum',
    relationshipPoints: 1250,
    lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    email: 'contact@cyberdyne.com',
    phone: '(555) 321-7890',
    industry: 'Defense',
    nextMeeting: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
  },
  {
    id: '4',
    name: 'Stark Industries',
    tier: 'bronze',
    relationshipPoints: 80,
    lastContact: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    email: 'info@stark.com',
    phone: '(555) 456-7890',
    industry: 'Energy'
  },
];

interface ClientPortfolioProps {
  clients?: Client[];
}

export default function ClientPortfolio({ clients = sampleClients }: ClientPortfolioProps) {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Function to filter and sort clients
  const getFilteredClients = () => {
    return clients
      .filter(client => {
        // Search query filter
        const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               client.industry.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Tier filter
        const matchesTier = tierFilter === 'all' || client.tier === tierFilter;
        
        return matchesSearch && matchesTier;
      })
      .sort((a, b) => {
        // Sort by the selected field
        if (sortBy === 'name') {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === 'tier') {
          const tierOrder = { platinum: 4, gold: 3, silver: 2, bronze: 1 };
          return sortOrder === 'asc'
            ? tierOrder[a.tier] - tierOrder[b.tier]
            : tierOrder[b.tier] - tierOrder[a.tier];
        } else if (sortBy === 'lastContact') {
          return sortOrder === 'asc'
            ? new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime()
            : new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime();
        } else if (sortBy === 'nextMeeting') {
          // Handle undefined nextMeeting dates
          if (!a.nextMeeting && !b.nextMeeting) return 0;
          if (!a.nextMeeting) return sortOrder === 'asc' ? 1 : -1;
          if (!b.nextMeeting) return sortOrder === 'asc' ? -1 : 1;
          
          return sortOrder === 'asc'
            ? new Date(a.nextMeeting).getTime() - new Date(b.nextMeeting).getTime()
            : new Date(b.nextMeeting).getTime() - new Date(a.nextMeeting).getTime();
        } else {
          // Default to relationship points
          return sortOrder === 'asc' 
            ? a.relationshipPoints - b.relationshipPoints 
            : b.relationshipPoints - a.relationshipPoints;
        }
      });
  };
  
  // Toggle sort order when clicking on the same sort field
  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header with search and filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors duration-200"
          >
            <Filter size={18} className="mr-2" />
            Filters
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
          </button>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors duration-200">
            <UserPlus size={18} className="mr-2" />
            Add Client
          </button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-3 bg-gray-50 rounded-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Tier</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={tierFilter}
                onChange={e => setTierFilter(e.target.value)}
              >
                <option value="all">All Tiers</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <div className="flex items-center gap-2">
                <select
                  className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortBy}
                  onChange={e => handleSortChange(e.target.value)}
                >
                  <option value="name">Client Name</option>
                  <option value="tier">Tier</option>
                  <option value="relationshipPoints">Relationship Points</option>
                  <option value="lastContact">Last Contact</option>
                  <option value="nextMeeting">Next Meeting</option>
                </select>
                <button 
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <ArrowUpDown size={18} className={sortOrder === 'desc' ? 'transform rotate-180' : ''} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Client table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('name')}
              >
                <div className="flex items-center">
                  Client
                  {sortBy === 'name' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('tier')}
              >
                <div className="flex items-center">
                  Tier
                  {sortBy === 'tier' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('lastContact')}
              >
                <div className="flex items-center">
                  Last Contact
                  {sortBy === 'lastContact' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('nextMeeting')}
              >
                <div className="flex items-center">
                  Next Meeting
                  {sortBy === 'nextMeeting' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getFilteredClients().map(client => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {client.avatar ? (
                        <img src={client.avatar} alt={client.name} className="h-10 w-10 rounded-full" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.industry}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getClientTierBadge(client.tier)}
                    <div className="ml-2 text-sm text-gray-500">
                      {client.relationshipPoints} points
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(client.lastContact)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.nextMeeting ? formatDate(client.nextMeeting) : 'Not scheduled'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                      <Phone size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                      <Mail size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                      <Calendar size={16} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Empty state */}
        {getFilteredClients().length === 0 && (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No clients found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || tierFilter !== 'all' 
                ? 'Try adjusting your filters or search query'
                : 'You have no clients in your portfolio yet'}
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium">
              <UserPlus size={18} className="mr-2" />
              Add New Client
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
