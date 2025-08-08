'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@linkhive/ui';
import { Button } from '@linkhive/ui';
import { Input } from '@linkhive/ui';
import { Label } from '@linkhive/ui';
import { Textarea } from '@linkhive/ui';
import { Switch } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { Calendar } from '@linkhive/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@linkhive/ui';
import { Copy, ExternalLink, Settings, Calendar as CalendarIcon, Tag, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';

interface ShortLinkData {
  originalUrl: string;
  customSlug: string;
  title: string;
  description: string;
  tags: string[];
  expiresAt?: Date;
  password?: string;
  isPasswordProtected: boolean;
  trackAnalytics: boolean;
  isActive: boolean;
}

export function ShortLinkEditor() {
  const [shortLinkData, setShortLinkData] = useState<ShortLinkData>({
    originalUrl: '',
    customSlug: '',
    title: '',
    description: '',
    tags: [],
    isPasswordProtected: false,
    password: '',
    trackAnalytics: true,
    isActive: true,
  });

  const [generatedSlug, setGeneratedSlug] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: keyof ShortLinkData, value: any) => {
    setShortLinkData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = () => {
    const slug = Math.random().toString(36).substring(2, 8);
    setGeneratedSlug(slug);
    if (!shortLinkData.customSlug) {
      handleInputChange('customSlug', slug);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !shortLinkData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...shortLinkData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', shortLinkData.tags.filter(tag => tag !== tagToRemove));
  };

  const copyShortLink = () => {
    const shortLink = `${window.location.origin}/${shortLinkData.customSlug || generatedSlug}`;
    navigator.clipboard.writeText(shortLink);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid = () => {
    return (
      shortLinkData.originalUrl &&
      validateUrl(shortLinkData.originalUrl) &&
      (shortLinkData.customSlug || generatedSlug)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Short Link</h1>
          <p className="text-muted-foreground">
            Create shortened URLs for easier sharing and tracking.
          </p>
        </div>
        <Button disabled={!isFormValid()} className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Create Short Link
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Basic Settings
              </CardTitle>
              <CardDescription>
                Configure the basic properties of your short link.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="originalUrl">Original URL *</Label>
                <Input
                  id="originalUrl"
                  type="url"
                  placeholder="https://example.com/very-long-url"
                  value={shortLinkData.originalUrl}
                  onChange={(e) => handleInputChange('originalUrl', e.target.value)}
                  className={!validateUrl(shortLinkData.originalUrl) && shortLinkData.originalUrl ? 'border-red-500' : ''}
                />
                {!validateUrl(shortLinkData.originalUrl) && shortLinkData.originalUrl && (
                  <p className="text-sm text-red-500">Please enter a valid URL</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customSlug">Custom Slug</Label>
                <div className="flex gap-2">
                  <Input
                    id="customSlug"
                    placeholder="my-custom-link"
                    value={shortLinkData.customSlug}
                    onChange={(e) => handleInputChange('customSlug', e.target.value)}
                  />
                  <Button variant="outline" onClick={generateSlug}>
                    Generate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Leave empty to auto-generate, or create a custom slug
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="My Short Link"
                  value={shortLinkData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Optional description for this link"
                  value={shortLinkData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button variant="outline" onClick={addTag} disabled={!newTag.trim()}>
                    Add
                  </Button>
                </div>
                {shortLinkData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {shortLinkData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced options for your short link.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {shortLinkData.expiresAt ? format(shortLinkData.expiresAt, 'PPP') : 'No expiration'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={shortLinkData.expiresAt}
                      onSelect={(date) => handleInputChange('expiresAt', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="passwordProtected"
                  checked={shortLinkData.isPasswordProtected}
                  onCheckedChange={(checked) => handleInputChange('isPasswordProtected', checked)}
                />
                <Label htmlFor="passwordProtected">Password Protected</Label>
              </div>

              {shortLinkData.isPasswordProtected && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={shortLinkData.password || ''}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="trackAnalytics"
                  checked={shortLinkData.trackAnalytics}
                  onCheckedChange={(checked) => handleInputChange('trackAnalytics', checked)}
                />
                <Label htmlFor="trackAnalytics">Track Analytics</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={shortLinkData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Preview your short link before creating it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isFormValid() ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Short Link</Label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <span className="font-mono text-sm">
                        {window.location.origin}/{shortLinkData.customSlug || generatedSlug}
                      </span>
                      <Button variant="ghost" size="sm" onClick={copyShortLink}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Original URL</Label>
                    <div className="p-3 bg-muted rounded-lg">
                      <span className="text-sm break-all">{shortLinkData.originalUrl}</span>
                    </div>
                  </div>

                  {shortLinkData.title && (
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <div className="p-3 bg-muted rounded-lg">
                        <span className="text-sm">{shortLinkData.title}</span>
                      </div>
                    </div>
                  )}

                  {shortLinkData.description && (
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <div className="p-3 bg-muted rounded-lg">
                        <span className="text-sm">{shortLinkData.description}</span>
                      </div>
                    </div>
                  )}

                  {shortLinkData.tags.length > 0 && (
                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {shortLinkData.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Settings</Label>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        {shortLinkData.isPasswordProtected ? (
                          <EyeOff className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-green-500" />
                        )}
                        <span>
                          {shortLinkData.isPasswordProtected ? 'Password Protected' : 'Public'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {shortLinkData.trackAnalytics ? (
                          <span className="text-green-500">●</span>
                        ) : (
                          <span className="text-gray-400">●</span>
                        )}
                        <span>
                          Analytics: {shortLinkData.trackAnalytics ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {shortLinkData.isActive ? (
                          <span className="text-green-500">●</span>
                        ) : (
                          <span className="text-red-500">●</span>
                        )}
                        <span>
                          Status: {shortLinkData.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {shortLinkData.expiresAt && (
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>Expires: {format(shortLinkData.expiresAt, 'PPP')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ExternalLink className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Fill in the required fields to see a preview of your short link.
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Enter a valid URL</p>
                    <p>• Add a custom slug or generate one</p>
                    <p>• Configure additional settings as needed</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Custom slugs should be unique and URL-friendly</p>
              <p>• Password protection adds an extra layer of security</p>
              <p>• Analytics help you track link performance</p>
              <p>• Set expiration dates for temporary links</p>
              <p>• Use tags to organize your links</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
