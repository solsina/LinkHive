"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@linkhive/ui"
import { Button } from "@linkhive/ui"
import { Badge } from "@linkhive/ui"
import { 
  BarChart3, 
  Link, 
  QrCode, 
  TrendingUp, 
  Plus,
  ExternalLink,
  Eye,
  MousePointer
} from "lucide-react"
import Link from "next/link"

export function DashboardOverview() {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: "Pages créées",
      value: "3",
      description: "+2 ce mois",
      icon: Link,
      trend: "up",
    },
    {
      title: "Clics totaux",
      value: "1,234",
      description: "+12% ce mois",
      icon: MousePointer,
      trend: "up",
    },
    {
      title: "Vues de profil",
      value: "5,678",
      description: "+8% ce mois",
      icon: Eye,
      trend: "up",
    },
    {
      title: "QR Codes générés",
      value: "12",
      description: "+5 ce mois",
      icon: QrCode,
      trend: "up",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "page_created",
      title: "Page Instagram créée",
      description: "Nouvelle page 'Mon Instagram' créée",
      time: "Il y a 2 heures",
      status: "success",
    },
    {
      id: 2,
      type: "link_clicked",
      title: "Clic sur lien YouTube",
      description: "25 clics sur votre lien YouTube",
      time: "Il y a 4 heures",
      status: "info",
    },
    {
      id: 3,
      type: "qr_scanned",
      title: "QR Code scanné",
      description: "QR Code 'Contact' scanné 3 fois",
      time: "Il y a 1 jour",
      status: "info",
    },
  ]

  const quickActions = [
    {
      title: "Créer une page",
      description: "Nouvelle page Link-in-Bio",
      icon: Plus,
      href: "/dashboard/pages/new",
      variant: "default" as const,
    },
    {
      title: "Générer un QR Code",
      description: "Créer un QR Code personnalisé",
      icon: QrCode,
      href: "/dashboard/qr-codes/new",
      variant: "outline" as const,
    },
    {
      title: "Voir les analytics",
      description: "Analyser vos performances",
      icon: BarChart3,
      href: "/dashboard/analytics",
      variant: "outline" as const,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "success"
      case "info":
        return "info"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre dashboard LinkHive
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/pages/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle page
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => (
          <Card key={action.title} className="cursor-pointer transition-colors hover:bg-accent/50">
            <Link href={action.href}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <action.icon className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>
            Vos dernières actions et interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {activity.type === "page_created" && <Link className="h-4 w-4" />}
                    {activity.type === "link_clicked" && <MousePointer className="h-4 w-4" />}
                    {activity.type === "qr_scanned" && <QrCode className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(activity.status) as any}>
                    {activity.status === "success" ? "Succès" : "Info"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardDescription>
            Évolution de vos clics sur les 30 derniers jours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
            <div className="text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Graphique de performance à venir
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
