import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Target, Users, Award, BarChart2, 
  Mail, Calendar, Settings, Bell, 
  ChevronRight, Zap, Home, Briefcase,
  MessageSquare, Search, Menu, X, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Mission Control', href: '/mission-control', icon: Target },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Achievements', href: '/achievements', icon: Award },
  ];

  // Check if the current path is the dashboard or a child of dashboard
  const isDashboardActive = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
  
  return (
    <div className={styles.layout}>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 transition duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className={styles.sidebarHeader}>
          <Target className={styles.sidebarLogo} size={32} />
          <span className={styles.sidebarTitle}>ZeroCRM</span>
          <button
            className="ml-auto rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-5 h-0 flex-1 overflow-y-auto">
          <nav className={styles.sidebarNav}>
            {navigationItems.map((item) => {
              // Special handling for dashboard to match both /dashboard and /dashboard/*
              const isActive = item.href === '/dashboard' 
                ? isDashboardActive 
                : pathname === item.href;
                
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    styles.navItem,
                    isActive && styles.navItemActive
                  )}
                >
                  <item.icon
                    className={cn(
                      styles.navIcon,
                      "h-5 w-5",
                      isActive ? "text-blue-400" : "text-gray-400"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-shrink-0 bg-gray-800 p-4">
          <div className="group block w-full flex-shrink-0">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-medium shadow-sm">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">John Doe</p>
                <div className="flex items-center">
                  <Zap className="h-3.5 w-3.5 text-amber-400 mr-1" />
                  <p className="text-xs text-gray-300">Level 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className={`${styles.sidebar} hidden lg:block`}>
        <div className={styles.sidebarHeader}>
          <Target className={styles.sidebarLogo} size={32} />
          <span className={styles.sidebarTitle}>ZeroCRM</span>
        </div>
        <nav className={styles.sidebarNav}>
          {navigationItems.map((item) => {
            // Special handling for dashboard to match both /dashboard and /dashboard/*
            const isActive = item.href === '/dashboard' 
              ? isDashboardActive 
              : pathname === item.href;
              
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  styles.navItem,
                  isActive && styles.navItemActive
                )}
              >
                <item.icon
                  className={cn(
                    styles.navIcon,
                    "h-5 w-5",
                    isActive ? "text-blue-400" : "text-gray-400"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-shrink-0 bg-gray-800 p-4 mt-auto">
          <div className="group block w-full flex-shrink-0">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-medium shadow-sm">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">John Doe</p>
                <div className="flex items-center">
                  <Zap className="h-3.5 w-3.5 text-amber-400 mr-1" />
                  <p className="text-xs text-gray-300">Level 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className={styles.content}>
        {/* Top navigation */}
        <div className={styles.header}>
          <div className="flex items-center">
            <button
              type="button"
              className="mr-4 text-gray-500 focus:outline-none lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search clients, missions..."
                className={styles.searchInput}
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 relative mr-3">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 mr-3">
              <Settings className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}