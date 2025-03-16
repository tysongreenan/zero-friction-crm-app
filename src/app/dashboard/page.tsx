import React from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  Target
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome to your Zero-Friction CRM dashboard</p>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="default">
          <TabsList className="mb-4">
            <TabsTrigger value="default">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Default
            </TabsTrigger>
            <TabsTrigger value="streamlined">
              <Target className="h-4 w-4 mr-2" />
              Focus Mode
            </TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/mission-control" className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Mission Control</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
                <Link href="/clients" className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Client Portfolio</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
                <Link href="/calendar" className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Calendar</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </div>
            
            {/* Stats Overview Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Stats Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-700 mb-1">Active Missions</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-sm text-green-700 mb-1">Completed</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-md">
                  <p className="text-sm text-amber-700 mb-1">Current XP</p>
                  <p className="text-2xl font-bold">1,250</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-md">
                  <p className="text-sm text-purple-700 mb-1">Client Count</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </div>
            
            {/* Recent Activity Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3"></div>
                  <div>
                    <p className="font-medium">Mission Completed</p>
                    <p className="text-sm text-gray-500">Follow-up with Acme Corp</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
                  <div>
                    <p className="font-medium">Client Added</p>
                    <p className="text-sm text-gray-500">Globex Corporation</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 mr-3"></div>
                  <div>
                    <p className="font-medium">Level Up!</p>
                    <p className="text-sm text-gray-500">Reached Level 3</p>
                    <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
