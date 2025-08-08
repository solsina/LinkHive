'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { 
  Eye, 
  MousePointer, 
  FileText, 
  QrCode, 
  Link as LinkIcon,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalViews: number;
    totalClicks: number;
    totalPages: number;
    totalQRCodes: number;
    totalShortLinks: number;
  };
  changes: {
    views: number;
    clicks: number;
    pages: number;
    qrCodes: number;
    shortLinks: number;
  };
}

const statCards = [
  {
    title: 'Total Views',
    value: 'totalViews',
    icon: Eye,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Page views this month'
  },
  {
    title: 'Total Clicks',
    value: 'totalClicks',
    icon: MousePointer,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Link clicks this month'
  },
  {
    title: 'Pages',
    value: 'totalPages',
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Active pages'
  },
  {
    title: 'QR Codes',
    value: 'totalQRCodes',
    icon: QrCode,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Generated QR codes'
  },
  {
    title: 'Short Links',
    value: 'totalShortLinks',
    icon: LinkIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Active short links'
  }
];

export function StatsCards({ stats, changes }: StatsCardsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return null;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const value = stats[card.value as keyof typeof stats];
        const change = changes[card.value as keyof typeof changes];
        const ChangeIcon = getChangeIcon(change);
        
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(value)}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {ChangeIcon && (
                    <ChangeIcon className={`h-3 w-3 ${getChangeColor(change)}`} />
                  )}
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getChangeColor(change)}`}
                  >
                    {change > 0 ? '+' : ''}{change.toFixed(1)}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    vs last month
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
