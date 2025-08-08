'use client';

import { motion } from 'framer-motion';
import { StatsCards } from './stats-cards';
import { RecentActivity, mockActivities } from './recent-activity';
import { QuickActions } from './quick-actions';

export function DashboardOverview() {
  const stats = {
    totalViews: 12847,
    totalClicks: 3234,
    totalPages: 5,
    totalQRCodes: 12,
    totalShortLinks: 28,
  };

  const changes = {
    views: 12.5,
    clicks: 8.2,
    pages: 20,
    qrCodes: 25,
    shortLinks: 17.8,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards stats={stats} changes={changes} />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={mockActivities} maxItems={5} />
        </div>
      </div>
    </div>
  );
}
