"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ArrowUpDown, PlusCircle } from 'lucide-react';
import MissionCard from './MissionCard';
import MissionStats from './MissionStats';
import { ClientMission, UserStats } from '@/types/mission';

// Sample mission data for demonstration
const sampleMissions: ClientMission[] = [
  {
    id: '1',
    clientId: 'client1',
    clientName: 'Acme Corporation',
    clientTier: 'gold',
    type: 'follow_up',
    priority: 'high',
    description: 'Follow up on the new project proposal',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    xpReward: 100,
    relationshipPoints: 20,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: '2',
    clientId: 'client2',
    clientName: 'Globex Industries',
    clientTier: 'silver',
    type: 'meeting',
    priority: 'medium',
    description: 'Quarterly review meeting',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    xpReward: 150,
    relationshipPoints: 30,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: '3',
    clientId: 'client3',
    clientName: 'Cyberdyne Systems',
    clientTier: 'platinum',
    type: 'call',
    priority: 'low',
    description: 'Discuss potential service upgrade options',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // A week from now
    xpReward: 75,
    relationshipPoints: 15,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // Yesterday
  }
];

// Sample user stats for demonstration
const sampleUserStats: UserStats = {
  level: 3,
  xp: 1250,
  xpToNextLevel: 500,
  xpProgress: 250,
  completedMissions: 24,
  totalMissions: 36,
  streak: 5,
  relationshipPoints: 450,
  nextMissionDue: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
};

export default function MissionControl() {
  // State for missions and user stats
  const [missions, setMissions] = useState<ClientMission[]>(sampleMissions);
  const [userStats, setUserStats] = useState<UserStats>(sampleUserStats);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);
  
  // State for sidebar visibility on mobile
  const [showStatsMobile, setShowStatsMobile] = useState(false);
  
  // Filter state
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Function to handle mission completion
  const handleCompleteMission = (missionId: string) => {
    // Find the mission to complete
    const missionToComplete = missions.find(m => m.id === missionId);
    
    if (missionToComplete) {
      // Remove the mission from the list
      setMissions(missions.filter(m => m.id !== missionId));
      
      // Update user stats
      const newStats = {
        ...userStats,
        xp: userStats.xp + missionToComplete.xpReward,
        xpProgress: userStats.xpProgress + missionToComplete.xpReward,
        completedMissions: userStats.completedMissions + 1,
        relationshipPoints: userStats.relationshipPoints + missionToComplete.relationshipPoints
      };
      
      // Check for level up
      let levelUpMessage = null;
      if (newStats.xpProgress >= userStats.xpToNextLevel) {
        newStats.level += 1;
        newStats.xpProgress = newStats.xpProgress - userStats.xpToNextLevel;
        newStats.xpToNextLevel = newStats.level * 1000; // Simple formula for next level XP
        levelUpMessage = `🎉 Level Up! You're now level ${newStats.level}!`;
      }
      
      setUserStats(newStats);
      
      // Show completion message
      setCompletionMessage(levelUpMessage || `Mission completed! +${missionToComplete.xpReward} XP`);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setCompletionMessage(null);
      }, 3000);
    }
  };
  
  // Function to view mission details
  const handleViewMissionDetails = (missionId: string) => {
    // This would typically navigate to a detailed view or open a modal
    console.log(`View details for mission ${missionId}`);
  };
  
  // Function to filter and sort missions
  const getFilteredMissions = () => {
    return missions
      .filter(mission => {
        // Search query filter
        const matchesSearch = mission.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              mission.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Priority filter
        const matchesPriority = priorityFilter === 'all' || mission.priority === priorityFilter;
        
        // Type filter
        const matchesType = typeFilter === 'all' || mission.type === typeFilter;
        
        return matchesSearch && matchesPriority && matchesType;
      })
      .sort((a, b) => {
        // Sort by the selected field
        if (sortBy === 'dueDate') {
          return sortOrder === 'asc' 
            ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        } else if (sortBy === 'priority') {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return sortOrder === 'asc'
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];
        } else if (sortBy === 'xpReward') {
          return sortOrder === 'asc' ? a.xpReward - b.xpReward : b.xpReward - a.xpReward;
        } else {
          // Default to client name
          return sortOrder === 'asc'
            ? a.clientName.localeCompare(b.clientName)
            : b.clientName.localeCompare(a.clientName);
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
  
  return (
    <div className="lg:grid lg:grid-cols-4 gap-6">
      {/* Stats panel for desktop */}
      <div className="hidden lg:block lg:col-span-1">
        <MissionStats stats={userStats} />
      </div>
      
      {/* Main mission panel */}
      <div className="lg:col-span-3">
        {/* Mobile stats toggle */}
        <div className="block lg:hidden mb-4">
          <button
            onClick={() => setShowStatsMobile(!showStatsMobile)}
            className="w-full bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
          >
            <span className="font-medium">Your Stats</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${showStatsMobile ? 'transform rotate-180' : ''}`} />
          </button>
          
          {showStatsMobile && (
            <div className="mt-2">
              <MissionStats stats={userStats} />
            </div>
          )}
        </div>
        
        {/* Search and filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search missions..."
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
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 p-3 bg-gray-50 rounded-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={priorityFilter}
                  onChange={e => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="follow_up">Follow Up</option>
                  <option value="check_in">Check In</option>
                  <option value="meeting">Meeting</option>
                  <option value="email">Email</option>
                  <option value="call">Call</option>
                  <option value="opportunity">Opportunity</option>
                  <option value="task">Task</option>
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
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="xpReward">XP Reward</option>
                    <option value="clientName">Client Name</option>
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
        
        {/* Completion message notification */}
        {completionMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md animate-fade-in">
            {completionMessage}
          </div>
        )}
        
        {/* Missions list */}
        <div className="space-y-4">
          {getFilteredMissions().length > 0 ? (
            getFilteredMissions().map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onComplete={handleCompleteMission}
                onViewDetails={handleViewMissionDetails}
              />
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No missions found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || priorityFilter !== 'all' || typeFilter !== 'all' 
                  ? 'Try adjusting your filters or search query'
                  : 'You have no active missions at the moment'}
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium">
                <PlusCircle size={18} className="mr-2" />
                Create New Mission
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
