"use client";

import React from 'react';
import { 
  CheckCircle, Calendar, TrendingUp, 
  Zap, Award, Users, Clock, Star, BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserStats } from '../../types/mission';

interface MissionStatsProps {
  stats: UserStats;
  className?: string;
}

// Component to display user statistics and mission progress
export default function MissionStats({ stats, className = '' }: MissionStatsProps) {
  // Calculate completion percentage
  const completionPercentage = stats.totalMissions > 0 
    ? Math.round((stats.completedMissions / stats.totalMissions) * 100) 
    : 0;
  
  // Format XP with commas for thousands
  const formattedXP = stats.xp.toLocaleString();
  
  // Calculate next level XP requirement (simple formula: current level * 1000)
  const nextLevelXP = stats.level * 1000;
  
  // Calculate XP progress percentage
  const xpProgressPercentage = Math.min(Math.round((stats.xpProgress / nextLevelXP) * 100), 100);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-indigo-500" />
        Mission Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Award className="w-5 h-5 text-amber-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Level</p>
            <p className="font-semibold">{stats.level}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <TrendingUp className="w-5 h-5 text-emerald-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Total XP</p>
            <p className="font-semibold">{formattedXP}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="font-semibold">{stats.completedMissions} / {stats.totalMissions}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-purple-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Streak</p>
            <p className="font-semibold">{stats.streak} days</p>
          </div>
        </div>
      </div>
      
      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-gray-500">XP Progress</p>
          <p className="text-xs font-medium">{stats.xpProgress} / {nextLevelXP}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${xpProgressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Mission Completion Progress */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-gray-500">Mission Completion</p>
          <p className="text-xs font-medium">{completionPercentage}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Next Mission Due */}
      {stats.nextMissionDue && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-rose-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Next Mission Due</p>
              <p className="font-medium">{new Date(stats.nextMissionDue).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}