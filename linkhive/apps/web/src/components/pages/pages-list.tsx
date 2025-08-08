"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@linkhive/ui"
import { Button } from "@linkhive/ui"
import { Badge } from "@linkhive/ui"
import { 
  Plus, 
  ExternalLink, 
  Edit, 
  Trash2, 
  Eye,
  Copy,
  MoreHorizontal,
  Calendar,
  MousePointer
} from "lucide-react"
import Link from "next/link"

export function PagesList() {
  // Mock data - in real app, this would come from API
  const pages = [
    {
      id: 1,
      title: "Mon Instagram",
      slug: "mon-instagram",
      description: "Page principale pour mes réseaux sociaux",
      status: "active",
      views: 1234,
      clicks: 567,
      links: 8,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      theme: "modern",
    },
    {
      id: 2,
      title: "Mon Business",
      slug: "mon-business",
      description: "Page professionnelle pour mes services",
      status: "active",
      views: 890,
      clicks: 234,
      links: 5,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      theme: "professional",
    },
    {
      id: 3,
      title: "Mon Portfolio",
      slug: "mon-portfolio",
      description: "Présentation de mes travaux",
      status: "draft",
      views: 0,
      clicks: 0,
      links: 3,
      createdAt: "2024-01-25",
      updatedAt: "2024-01-25",
      theme: "creative",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "draft":
        return "secondary"
      case "archived":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "draft":
        return "Brouillon"
      case "archived":
        return "Archivé"
      default:
        return status
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    // In real app, show toast notification
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes Pages</h1>
          <p className="text-muted-foreground">
            Gérez vos pages Link-in-Bio
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/pages/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle page
          </Link>
        </Button>
      </div>

      {/* Pages Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Card key={page.id} className="group relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {page.description}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getStatusColor(page.status) as any}>
                  {getStatusText(page.status)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {page.links} liens
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{page.views}</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center">
                    <Eye className="mr-1 h-3 w-3" />
                    Vues
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{page.clicks}</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center">
                    <MousePointer className="mr-1 h-3 w-3" />
                    Clics
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={`/dashboard/pages/${page.id}/edit`}>
                      <Edit className="mr-1 h-3 w-3" />
                      Modifier
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={`/${page.slug}`} target="_blank">
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Voir
                    </Link>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`${window.location.origin}/${page.slug}`)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    Modifié le {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                  </div>
                  <span className="capitalize">{page.theme}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {pages.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucune page créée</h3>
              <p className="text-muted-foreground mb-4">
                Créez votre première page Link-in-Bio pour commencer
              </p>
              <Button asChild>
                <Link href="/dashboard/pages/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Créer ma première page
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
