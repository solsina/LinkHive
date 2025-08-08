'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  QrCode, 
  BarChart3, 
  Settings, 
  Link as LinkIcon,
  Plus,
  ChevronDown
} from 'lucide-react';
import { Button } from '@linkhive/ui';
import { Badge } from '@linkhive/ui';
import { navigationConfig } from '@linkhive/config';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-background border-r border-border/40
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border/40">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">LinkHive</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationConfig.dashboard.map((item) => {
              const isExpanded = expandedItems.includes(item.title);
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.title}>
                  {hasSubItems ? (
                    <div>
                      <Button
                        variant="ghost"
                        className={`w-full justify-between ${
                          isActive(item.href) ? 'bg-primary/10 text-primary' : ''
                        }`}
                        onClick={() => toggleExpanded(item.title)}
                      >
                        <div className="flex items-center space-x-2">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`} 
                        />
                      </Button>
                      
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-6 mt-2 space-y-1"
                        >
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`
                                flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors
                                ${isActive(subItem.href) 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }
                              `}
                            >
                              {subItem.icon && <subItem.icon className="w-4 h-4" />}
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <Badge variant="secondary" className="ml-auto">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          isActive(item.href) ? 'bg-primary/10 text-primary' : ''
                        }`}
                      >
                        {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border/40">
            <div className="space-y-2">
              <Link href="/dashboard/pages/new">
                <Button className="w-full" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Page
                </Button>
              </Link>
              <Link href="/dashboard/qr-codes/new">
                <Button variant="outline" className="w-full" size="sm">
                  <QrCode className="w-4 h-4 mr-2" />
                  New QR Code
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
