'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@linkhive/ui';
import { Button } from '@linkhive/ui';
import { 
  Plus, 
  FileText, 
  QrCode, 
  Link as LinkIcon, 
  ExternalLink,
  Copy,
  Download,
  Share2
} from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    title: 'Create Page',
    description: 'Build a new link-in-bio page',
    icon: FileText,
    href: '/dashboard/pages/new',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100'
  },
  {
    title: 'Generate QR Code',
    description: 'Create a custom QR code',
    icon: QrCode,
    href: '/dashboard/qr-codes/new',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    hoverColor: 'hover:bg-orange-100'
  },
  {
    title: 'Shorten Link',
    description: 'Create a short URL',
    icon: LinkIcon,
    href: '/dashboard/short-links/new',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    hoverColor: 'hover:bg-indigo-100'
  },
  {
    title: 'View Analytics',
    description: 'Check your performance',
    icon: ExternalLink,
    href: '/dashboard/analytics',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  }
];

const recentItems = [
  {
    title: 'Portfolio Page',
    type: 'page',
    url: '/john-doe',
    icon: FileText,
    color: 'text-purple-600'
  },
  {
    title: 'Website QR Code',
    type: 'qr',
    url: '/qr/website',
    icon: QrCode,
    color: 'text-orange-600'
  },
  {
    title: 'Blog Post Link',
    type: 'shortlink',
    url: '/abc123',
    icon: LinkIcon,
    color: 'text-indigo-600'
  }
];

export function QuickActions() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${text}`);
    // You could add a toast notification here
  };

  const shareItem = (url: string, title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: `${window.location.origin}${url}`
      });
    } else {
      copyToClipboard(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              
              return (
                <Link key={action.title} href={action.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${action.hoverColor} cursor-pointer`}
                  >
                    <div className={`p-2 rounded-lg ${action.bgColor}`}>
                      <Icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {action.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5" />
            <span>Recent Items</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-muted`}>
                      <Icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(item.url)}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => shareItem(item.url, item.title)}
                      className="h-8 w-8 p-0"
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                    <Link href={item.url} target="_blank">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="w-full">
                View All Items
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
