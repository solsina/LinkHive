'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@linkhive/ui';
import { Button } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { 
  Plus, 
  Eye, 
  MousePointer, 
  Edit, 
  Copy, 
  ExternalLink,
  MoreHorizontal,
  Trash2,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@linkhive/ui';

interface Page {
  id: string;
  title: string;
  description: string;
  slug: string;
  theme: string;
  isActive: boolean;
  viewCount: number;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

const mockPages: Page[] = [
  {
    id: '1',
    title: 'My Portfolio',
    description: 'Professional portfolio and contact information',
    slug: 'john-doe',
    theme: 'default',
    isActive: true,
    viewCount: 1247,
    clickCount: 89,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    title: 'Business Card',
    description: 'Digital business card for networking',
    slug: 'john-business',
    theme: 'professional',
    isActive: true,
    viewCount: 856,
    clickCount: 156,
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
  },
  {
    id: '3',
    title: 'Social Links',
    description: 'All my social media profiles in one place',
    slug: 'john-social',
    theme: 'colorful',
    isActive: false,
    viewCount: 432,
    clickCount: 67,
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-12T13:30:00Z',
  },
];

export function PagesList() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getThemeColor = (theme: string) => {
    const colors = {
      default: 'bg-blue-100 text-blue-800',
      minimal: 'bg-gray-100 text-gray-800',
      dark: 'bg-gray-800 text-gray-100',
      colorful: 'bg-purple-100 text-purple-800',
      professional: 'bg-green-100 text-green-800',
    };
    return colors[theme as keyof typeof colors] || colors.default;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">
            Manage your link-in-bio pages and track their performance
          </p>
        </div>
        <Link href="/dashboard/pages/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Page
          </Button>
        </Link>
      </div>

      {/* Pages Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{page.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {page.description}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-600 mb-1">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{page.viewCount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-green-600 mb-1">
                      <MousePointer className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{page.clickCount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Clicks</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2">
                  <Badge variant={page.isActive ? 'default' : 'secondary'}>
                    {page.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant="outline" className={getThemeColor(page.theme)}>
                    {page.theme}
                  </Badge>
                </div>

                {/* URL */}
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm font-mono truncate flex-1">
                    {`${window.location.origin}/${page.slug}`}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(`${window.location.origin}/${page.slug}`)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {mockPages.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No pages yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first link-in-bio page to get started
            </p>
            <Link href="/dashboard/pages/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
