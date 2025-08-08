'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@linkhive/ui';
import { 
  Eye, 
  MousePointer, 
  FileText, 
  QrCode, 
  Link, 
  ExternalLink,
  Clock
} from 'lucide-react';

export interface Activity {
  id: string;
  type: 'page_view' | 'link_click' | 'page_created' | 'qr_created' | 'shortlink_created';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'page_view',
    title: 'Page viewed',
    description: 'Your "Portfolio" page was viewed by a visitor',
    timestamp: '2 minutes ago',
    icon: Eye,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: '2',
    type: 'link_click',
    title: 'Link clicked',
    description: 'Someone clicked on your "GitHub" link',
    timestamp: '5 minutes ago',
    icon: MousePointer,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: '3',
    type: 'page_created',
    title: 'Page created',
    description: 'You created a new page called "Business Card"',
    timestamp: '1 hour ago',
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: '4',
    type: 'qr_created',
    title: 'QR Code created',
    description: 'You generated a QR code for your website',
    timestamp: '2 hours ago',
    icon: QrCode,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: '5',
    type: 'shortlink_created',
    title: 'Short link created',
    description: 'You created a short link for your blog post',
    timestamp: '3 hours ago',
    icon: Link,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

interface RecentActivityProps {
  activities: Activity[];
  maxItems?: number;
}

export function RecentActivity({ activities, maxItems = 5 }: RecentActivityProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {activities.length > maxItems && (
          <div className="mt-4 pt-4 border-t">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View all activity
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
