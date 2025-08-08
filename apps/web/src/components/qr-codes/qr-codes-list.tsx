'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@linkhive/ui';
import { Button } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { 
  Plus, 
  QrCode, 
  Download, 
  Copy, 
  Edit, 
  Eye,
  MoreHorizontal,
  Trash2,
  Scan
} from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@linkhive/ui';

interface QRCode {
  id: string;
  name: string;
  content: string;
  type: 'url' | 'text' | 'email' | 'phone' | 'wifi';
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  includeLogo: boolean;
  scanCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockQRCodes: QRCode[] = [
  {
    id: '1',
    name: 'Website QR',
    content: 'https://example.com',
    type: 'url',
    size: 256,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    includeLogo: false,
    scanCount: 45,
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    name: 'Contact Info',
    content: 'mailto:john@example.com',
    type: 'email',
    size: 256,
    foregroundColor: '#1E40AF',
    backgroundColor: '#FFFFFF',
    includeLogo: true,
    scanCount: 23,
    isActive: true,
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
  },
  {
    id: '3',
    name: 'WiFi Network',
    content: 'WIFI:S:MyNetwork;T:WPA;P:mypassword123;;',
    type: 'wifi',
    size: 512,
    foregroundColor: '#059669',
    backgroundColor: '#FFFFFF',
    includeLogo: false,
    scanCount: 12,
    isActive: false,
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-12T13:30:00Z',
  },
];

export function QRCodesList() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getTypeColor = (type: string) => {
    const colors = {
      url: 'bg-blue-100 text-blue-800',
      text: 'bg-gray-100 text-gray-800',
      email: 'bg-green-100 text-green-800',
      phone: 'bg-purple-100 text-purple-800',
      wifi: 'bg-orange-100 text-orange-800',
    };
    return colors[type as keyof typeof colors] || colors.text;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      url: '🌐',
      text: '📝',
      email: '📧',
      phone: '📞',
      wifi: '📶',
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">QR Codes</h1>
          <p className="text-muted-foreground">
            Create and manage custom QR codes for various purposes
          </p>
        </div>
        <Link href="/dashboard/qr-codes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create QR Code
          </Button>
        </Link>
      </div>

      {/* QR Codes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockQRCodes.map((qrCode, index) => (
          <motion.div
            key={qrCode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{qrCode.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {qrCode.content}
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
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Content
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
                {/* QR Code Preview */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>

                {/* Stats */}
                <div className="text-center">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <Scan className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{qrCode.scanCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Scans</p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2">
                  <Badge variant={qrCode.isActive ? 'default' : 'secondary'}>
                    {qrCode.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant="outline" className={getTypeColor(qrCode.type)}>
                    <span className="mr-1">{getTypeIcon(qrCode.type)}</span>
                    {qrCode.type}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm font-mono truncate flex-1">
                    {qrCode.content}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(qrCode.content)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {mockQRCodes.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No QR codes yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first QR code to get started
            </p>
            <Link href="/dashboard/qr-codes/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First QR Code
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
