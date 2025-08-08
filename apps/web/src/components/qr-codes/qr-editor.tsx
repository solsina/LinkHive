'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@linkhive/ui';
import { Button } from '@linkhive/ui';
import { Input } from '@linkhive/ui';
import { Label } from '@linkhive/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@linkhive/ui';
import { Switch } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { Download, Copy, Eye, Settings, Palette, QrCode } from 'lucide-react';

interface QRCodeData {
  name: string;
  url: string;
  type: 'url' | 'text' | 'email' | 'phone' | 'wifi';
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  includeLogo: boolean;
  logoUrl?: string;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  margin: number;
}

export function QREditor() {
  const [qrData, setQrData] = useState<QRCodeData>({
    name: '',
    url: '',
    type: 'url',
    size: 256,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    includeLogo: false,
    errorCorrection: 'M',
    margin: 4,
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const handleInputChange = (field: keyof QRCodeData, value: any) => {
    setQrData(prev => ({ ...prev, [field]: value }));
  };

  const generatePreview = () => {
    // In a real implementation, this would generate the actual QR code
    const params = new URLSearchParams({
      data: qrData.url,
      size: qrData.size.toString(),
      color: qrData.foregroundColor.replace('#', ''),
      bgcolor: qrData.backgroundColor.replace('#', ''),
      qzone: qrData.margin.toString(),
      format: 'png',
    });
    setPreviewUrl(`https://api.qrserver.com/v1/create-qr-code/?${params}`);
  };

  const downloadQR = () => {
    if (previewUrl) {
      const link = document.createElement('a');
      link.href = previewUrl;
      link.download = `${qrData.name || 'qr-code'}.png`;
      link.click();
    }
  };

  const copyQRUrl = () => {
    if (previewUrl) {
      navigator.clipboard.writeText(previewUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create QR Code</h1>
          <p className="text-muted-foreground">
            Generate customizable QR codes for your links, text, or contact information.
          </p>
        </div>
        <Button onClick={generatePreview} className="flex items-center gap-2">
          <QrCode className="h-4 w-4" />
          Generate Preview
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
                Configure the basic properties of your QR code.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">QR Code Name</Label>
                <Input
                  id="name"
                  placeholder="My Website QR Code"
                  value={qrData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">QR Code Type</Label>
                <Select value={qrData.type} onValueChange={(value: any) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                    <SelectItem value="wifi">WiFi Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Content</Label>
                <Input
                  id="url"
                  placeholder={qrData.type === 'url' ? 'https://example.com' : 'Enter content...'}
                  value={qrData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size (pixels)</Label>
                <Select value={qrData.size.toString()} onValueChange={(value) => handleInputChange('size', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">128x128</SelectItem>
                    <SelectItem value="256">256x256</SelectItem>
                    <SelectItem value="512">512x512</SelectItem>
                    <SelectItem value="1024">1024x1024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Customization
              </CardTitle>
              <CardDescription>
                Customize the appearance of your QR code.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foreground">Foreground Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="foreground"
                      type="color"
                      value={qrData.foregroundColor}
                      onChange={(e) => handleInputChange('foregroundColor', e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={qrData.foregroundColor}
                      onChange={(e) => handleInputChange('foregroundColor', e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Background Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="background"
                      type="color"
                      value={qrData.backgroundColor}
                      onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={qrData.backgroundColor}
                      onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="errorCorrection">Error Correction Level</Label>
                <Select value={qrData.errorCorrection} onValueChange={(value: any) => handleInputChange('errorCorrection', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="margin">Margin</Label>
                <Select value={qrData.margin.toString()} onValueChange={(value) => handleInputChange('margin', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="1">Small</SelectItem>
                    <SelectItem value="4">Medium</SelectItem>
                    <SelectItem value="8">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="includeLogo"
                  checked={qrData.includeLogo}
                  onCheckedChange={(checked) => handleInputChange('includeLogo', checked)}
                />
                <Label htmlFor="includeLogo">Include Logo</Label>
              </div>

              {qrData.includeLogo && (
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://example.com/logo.png"
                    value={qrData.logoUrl || ''}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Preview
              </CardTitle>
              <CardDescription>
                Preview your QR code before downloading.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {previewUrl ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={previewUrl}
                      alt="QR Code Preview"
                      className="border rounded-lg shadow-sm"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={downloadQR} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={copyQRUrl} className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      Copy URL
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>QR Code Details</Label>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Type:</span>
                        <Badge variant="secondary" className="ml-2">
                          {qrData.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Size:</span>
                        <span className="ml-2">{qrData.size}x{qrData.size}px</span>
                      </div>
                      <div>
                        <span className="font-medium">Error Correction:</span>
                        <span className="ml-2">{qrData.errorCorrection}</span>
                      </div>
                      <div>
                        <span className="font-medium">Margin:</span>
                        <span className="ml-2">{qrData.margin}px</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <QrCode className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Fill in the settings and click "Generate Preview" to see your QR code.
                  </p>
                  <Button onClick={generatePreview} disabled={!qrData.url}>
                    Generate Preview
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Higher error correction levels allow for more damage while maintaining readability</p>
              <p>• Larger sizes are better for printing and high-resolution displays</p>
              <p>• Test your QR code with multiple devices before sharing</p>
              <p>• Consider your target audience when choosing colors and size</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
