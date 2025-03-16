"use client";

import React from 'react';
import { 
  AlertTriangle, CheckCircle, Calendar, Users, 
  Mail, Phone, ExternalLink, Zap, Target, 
  ArrowUpRight, Clock, Sparkles, FileText
} from 'lucide-react';
import { formatDistanceToNow, isToday, isTomorrow, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ClientMission, ClientTier, CLIENT_TIERS } from '@/types/mission';
import { MissionPriority, MissionType } from '../../types/mission';

interface MissionCardProps {
  mission: ClientMission;
  onComplete: (missionId: string) => void;
  onViewDetails: (missionId: string) => void;
}

// Function to get color based on priority
function getPriorityColor(priority: MissionPriority) {
  switch (priority) {
    case 'high':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200'
      };
    case 'medium':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200'
      };
    case 'low':
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200'
      };
  }
}

// Function to get mission type label
function getMissionTypeLabel(type: MissionType): string {
  const labels: Record<MissionType, string> = {
    follow_up: 'Follow Up',
    check_in: 'Check In',
    meeting: 'Meeting',
    email: 'Email',
    opportunity: 'Opportunity',
    call: 'Call',
    task: 'Task'
  };
  return labels[type] || 'Task';
}

// Function to get mission type badge color
function getMissionTypeBadgeColor(type: MissionType) {
  const colors: Record<MissionType, { bg: string, text: string }> = {
    follow_up: { bg: 'bg-purple-100', text: 'text-purple-800' },
    check_in: { bg: 'bg-blue-100', text: 'text-blue-800' },
    meeting: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    email: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    opportunity: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    call: { bg: 'bg-rose-100', text: 'text-rose-800' },
    task: { bg: 'bg-gray-100', text: 'text-gray-800' }
  };
  return colors[type];
}

// Function to get icon for mission type
function getMissionTypeIcon(type: MissionType) {
  switch (type) {
    case 'call':
      return <Phone className="w-4 h-4" />;
    case 'email':
      return <Mail className="w-4 h-4" />;
    case 'meeting':
      return <Users className="w-4 h-4" />;
    case 'follow_up':
      return <Clock className="w-4 h-4" />;
    case 'check_in':
      return <CheckCircle className="w-4 h-4" />;
    case 'opportunity':
      return <FileText className="w-4 h-4" />;
    case 'task':
    default:
      return <FileText className="w-4 h-4" />;
  }
}

// Function to get client tier badge
function getClientTierBadge(tier: string) {
  const tierConfig: Record<string, { bg: string, text: string, shadow: string }> = {
    bronze: { 
      bg: 'bg-amber-600', 
      text: 'text-white',
      shadow: 'shadow-amber-200'
    },
    silver: { 
      bg: 'bg-gray-400', 
      text: 'text-white',
      shadow: 'shadow-gray-200'
    },
    gold: { 
      bg: 'bg-amber-400', 
      text: 'text-amber-900',
      shadow: 'shadow-amber-200'
    },
    platinum: { 
      bg: 'bg-blue-500', 
      text: 'text-white',
      shadow: 'shadow-blue-200'
    }
  };
  
  const config = tierConfig[tier] || tierConfig.bronze;
  
  return (
    <span className={`${config.bg} ${config.text} text-xs font-medium px-2 py-0.5 rounded shadow-sm ${config.shadow}`}>
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </span>
  );
}

export default function MissionCard({ mission, onComplete, onViewDetails }: MissionCardProps) {
  // Format due date
  const formattedDueDate = new Date(mission.dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Check if mission is urgent (due within 24 hours)
  const isUrgent = new Date(mission.dueDate).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;
  
  // Get priority colors
  const priorityColors = getPriorityColor(mission.priority);
  
  // Get mission type colors
  const typeColors = getMissionTypeBadgeColor(mission.type);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4">
        {/* Client and Mission Type */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {getClientTierBadge(mission.clientTier)}
            <h3 className="ml-2 font-medium text-gray-900">{mission.clientName}</h3>
          </div>
          <div className={`${typeColors.bg} ${typeColors.text} px-2 py-1 rounded-full text-xs font-medium flex items-center`}>
            {getMissionTypeIcon(mission.type)}
            <span className="ml-1">{getMissionTypeLabel(mission.type)}</span>
          </div>
        </div>
        
        {/* Mission Description */}
        <div className="mb-3">
          <p className="text-gray-700">{mission.description}</p>
          {isUrgent && (
            <div className="mt-2 flex items-center text-red-600 text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>Urgent</span>
            </div>
          )}
        </div>
        
        {/* Due Date and Priority */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Due: {formattedDueDate}</span>
          </div>
          <div className={`${priorityColors.bg} ${priorityColors.text} px-2 py-0.5 rounded text-xs font-medium border ${priorityColors.border}`}>
            {mission.priority.charAt(0).toUpperCase() + mission.priority.slice(1)} Priority
          </div>
        </div>
        
        {/* XP Reward and Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
            +{mission.xpReward} XP
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onComplete(mission.id)}
              className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-medium flex items-center transition-colors duration-200"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Complete
            </button>
            <button
              onClick={() => onViewDetails(mission.id)}
              className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium flex items-center transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}