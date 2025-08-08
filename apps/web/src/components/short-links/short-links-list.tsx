'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@linkhive/ui';
import { Button } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { 
  Plus, 
  Link as LinkIcon, 
  Copy, 
  Edit, 
  ExternalLink,
  MoreHorizontal,
  Trash2,
  MousePointer,
  Calendar,
  Tag
} from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@linkhive/ui';

interface ShortLink {
  id: string;
  originalUrl: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  expiresAt?: string;
  isPasswordProtected: boolean;
  trackAnalytics: boolean;
  isActive: boolean;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

const mockShortLinks: ShortLink[] = [
  {
    id: '1',
    originalUrl: 'https://example.com/very-long-url-that-needs-to-be-shortened',
    slug: 'abc123',
    title: 'Product Launch',
    description: 'Link to our new product launch page',
    tags: ['marketing', 'product'],
    isPasswordProtected: false,
    trackAnalytics: true,
    isActive: true,
    clickCount: 156,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    originalUrl: 'https://blog.example.com/article-about-link-shortening',
    slug: 'def456',
    title: 'Blog Post',
    description: 'Shareable link for our latest blog post',
    tags: ['blog', 'content'],
    expiresAt: '2024-12-31T23:59:59Z',
    isPasswordProtected: false,
    trackAnalytics: true,
    isActive: true,
    clickCount: 89,
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
  },
  {
    id: '3',
    originalUrl: 'https://docs.example.com/api-reference',
    slug: 'ghi789',
    title: 'API Docs',
    description: 'Documentation for our API',
    tags: ['docs', 'api'],
    isPasswordProtected: true,
    trackAnalytics: false,
    isActive: false,
    clickCount: 23,
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-12T13:30:00Z',
  },
];

export function ShortLinksList() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Short Links</h1>
          <p className="text-muted-foreground">
            Create and manage short URLs for easy sharing
          </p>
        </div>
        <Link href="/dashboard/short-links/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Short Link
          </Button>
        </Link>
      </div>

      {/* Short Links Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockShortLinks.map((shortLink, index) => (
          <motion.div
            key={shortLink.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{shortLink.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {shortLink.description}
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
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit
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
                <div className="text-center">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <MousePointer className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{shortLink.clickCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Clicks</p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={shortLink.isActive ? 'default' : 'secondary'}>
                    {shortLink.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  {shortLink.isPasswordProtected && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                      🔒 Protected
                    </Badge>
                  )}
                  {shortLink.expiresAt && (
                    <Badge variant="outline" className={isExpired(shortLink.expiresAt) ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}>
                      <Calendar className="mr-1 h-3 w-3" />
                      {isExpired(shortLink.expiresAt) ? 'Expired' : 'Expires'}
                    </Badge>
                  )}
                </div>

                {/* Tags */}
                {shortLink.tags.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    {shortLink.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* URLs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <span className="text-sm font-mono truncate flex-1">
                      {`${window.location.origin}/${shortLink.slug}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(`${window.location.origin}/${shortLink.slug}`)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {shortLink.originalUrl}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>

                {/* Footer */}
                <div className="text-xs text-muted-foreground">
                  Created {formatDate(shortLink.createdAt)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {mockShortLinks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
                         <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
               <LinkIcon className="h-8 w-8 text-muted-foreground" />
             </div>
            <h3 className="text-lg font-semibold mb-2">No short links yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first short link to get started
            </p>
            <Link href="/dashboard/short-links/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Short Link
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
