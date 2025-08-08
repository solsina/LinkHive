'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@linkhive/ui';
import { Button } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@linkhive/ui';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Users, 
  Globe,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  uniqueVisitors: number;
  clickThroughRate: number;
  topPages: Array<{
    name: string;
    views: number;
    clicks: number;
  }>;
  topLinks: Array<{
    name: string;
    clicks: number;
    url: string;
  }>;
  geographicData: Array<{
    country: string;
    views: number;
    percentage: number;
  }>;
  deviceData: Array<{
    device: string;
    views: number;
    percentage: number;
  }>;
}

const mockAnalyticsData: AnalyticsData = {
  totalViews: 12470,
  totalClicks: 3245,
  uniqueVisitors: 8923,
  clickThroughRate: 26.0,
  topPages: [
    { name: 'My Portfolio', views: 3456, clicks: 234 },
    { name: 'Business Card', views: 2890, clicks: 567 },
    { name: 'Social Links', views: 1234, clicks: 89 },
  ],
  topLinks: [
    { name: 'GitHub', clicks: 456, url: 'https://github.com' },
    { name: 'LinkedIn', clicks: 234, url: 'https://linkedin.com' },
    { name: 'Portfolio', clicks: 123, url: 'https://portfolio.com' },
  ],
  geographicData: [
    { country: 'United States', views: 4567, percentage: 36.6 },
    { country: 'United Kingdom', views: 2345, percentage: 18.8 },
    { country: 'Canada', views: 1234, percentage: 9.9 },
    { country: 'Germany', views: 890, percentage: 7.1 },
    { country: 'France', views: 678, percentage: 5.4 },
  ],
  deviceData: [
    { device: 'Mobile', views: 6789, percentage: 54.4 },
    { device: 'Desktop', views: 4567, percentage: 36.6 },
    { device: 'Tablet', views: 1114, percentage: 8.9 },
  ],
};

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = React.useState('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your performance and understand your audience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalyticsData.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last period
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalyticsData.totalClicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last period
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalyticsData.uniqueVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +15.3% from last period
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalyticsData.clickThroughRate}%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last period
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts and Data */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Top Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyticsData.topPages.map((page, index) => (
                  <div key={page.name} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{page.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {page.views.toLocaleString()} views
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{page.clicks.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">clicks</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                Top Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyticsData.topLinks.map((link, index) => (
                  <div key={link.name} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{link.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {link.url}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{link.clicks.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">clicks</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Geographic Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyticsData.geographicData.map((geo, index) => (
                  <div key={geo.country} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{geo.country}</p>
                      <p className="text-sm text-muted-foreground">
                        {geo.views.toLocaleString()} views
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{geo.percentage}%</p>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${geo.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Device Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyticsData.deviceData.map((device, index) => (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{device.device}</p>
                      <p className="text-sm text-muted-foreground">
                        {device.views.toLocaleString()} views
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{device.percentage}%</p>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Performance chart will be displayed here</p>
                <p className="text-sm text-muted-foreground">
                  Shows views, clicks, and engagement over time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
