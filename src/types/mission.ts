// Mission types
export type MissionType = 'follow_up' | 'check_in' | 'meeting' | 'email' | 'opportunity' | 'call' | 'task';

// Mission priority levels
export type MissionPriority = 'high' | 'medium' | 'low';

// Client tier types
export type ClientTier = 'bronze' | 'silver' | 'gold' | 'platinum';

// Client mission interface
export interface ClientMission {
  id: string;
  clientId: string;
  clientName: string;
  clientTier: ClientTier;
  type: MissionType;
  priority: MissionPriority;
  description: string;
  dueDate: Date;
  xpReward: number;
  relationshipPoints: number;
  createdAt: Date;
}

// Mission completion result interface
export interface MissionCompletionResult {
  xpEarned: number;
  relationshipPointsEarned: number;
  levelUp: boolean;
  newLevel?: number;
}

// User stats interface
export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  xpProgress: number;
  completedMissions: number;
  totalMissions: number;
  streak: number;
  relationshipPoints: number;
  nextMissionDue?: Date;
}

// Client tier configuration
export interface ClientTierConfig {
  name: ClientTier;
  label: string;
  color: string;
  minRelationshipPoints: number;
  xpMultiplier: number;
}

// Client tier configurations
export const CLIENT_TIERS: Record<ClientTier, ClientTierConfig> = {
  bronze: {
    name: 'bronze',
    label: 'Bronze',
    color: 'bg-amber-600',
    minRelationshipPoints: 0,
    xpMultiplier: 1.0
  },
  silver: {
    name: 'silver',
    label: 'Silver',
    color: 'bg-gray-400',
    minRelationshipPoints: 100,
    xpMultiplier: 1.2
  },
  gold: {
    name: 'gold',
    label: 'Gold',
    color: 'bg-amber-400',
    minRelationshipPoints: 500,
    xpMultiplier: 1.5
  },
  platinum: {
    name: 'platinum',
    label: 'Platinum',
    color: 'bg-blue-500',
    minRelationshipPoints: 1000,
    xpMultiplier: 2.0
  }
};