"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@linkhive/ui"
import { Button } from "@linkhive/ui"
import { Input } from "@linkhive/ui"
import { Label } from "@linkhive/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@linkhive/ui"
import { 
  Save, 
  Eye, 
  ArrowLeft,
  Plus,
  GripVertical,
  Trash2,
  Link,
  Image,
  Palette,
  Settings
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface LinkItem {
  id: string
  title: string
  url: string
  icon?: string
  active: boolean
}

export function PageEditor() {
  const router = useRouter()
  const [pageData, setPageData] = React.useState({
    title: "",
    description: "",
    slug: "",
    theme: "modern",
    background: "gradient",
    customDomain: "",
  })

  const [links, setLinks] = React.useState<LinkItem[]>([
    {
      id: "1",
      title: "Instagram",
      url: "https://instagram.com/username",
      icon: "instagram",
      active: true,
    },
    {
      id: "2",
      title: "YouTube",
      url: "https://youtube.com/@username",
      icon: "youtube",
      active: true,
    },
  ])

  const [newLink, setNewLink] = React.useState({
    title: "",
    url: "",
    icon: "",
  })

  const themes = [
    { value: "modern", label: "Moderne" },
    { value: "minimal", label: "Minimal" },
    { value: "creative", label: "Créatif" },
    { value: "professional", label: "Professionnel" },
    { value: "dark", label: "Sombre" },
  ]

  const backgrounds = [
    { value: "gradient", label: "Dégradé" },
    { value: "solid", label: "Couleur unie" },
    { value: "image", label: "Image" },
    { value: "pattern", label: "Motif" },
  ]

  const handleSave = () => {
    // In real app, save to API
    console.log("Saving page:", { pageData, links })
    router.push("/dashboard/pages")
  }

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const link: LinkItem = {
        id: Date.now().toString(),
        title: newLink.title,
        url: newLink.url,
        icon: newLink.icon,
        active: true,
      }
      setLinks([...links, link])
      setNewLink({ title: "", url: "", icon: "" })
    }
  }

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id))
  }

  const toggleLink = (id: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, active: !link.active } : link
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/pages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nouvelle page</h1>
            <p className="text-muted-foreground">
              Créez votre page Link-in-Bio personnalisée
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/preview" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Aperçu
            </Link>
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Page Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres de la page
              </CardTitle>
              <CardDescription>
                Configurez les informations de base de votre page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de la page</Label>
                  <Input
                    id="title"
                    value={pageData.title}
                    onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                    placeholder="Ex: Mon Instagram"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL personnalisée</Label>
                  <Input
                    id="slug"
                    value={pageData.slug}
                    onChange={(e) => setPageData({ ...pageData, slug: e.target.value })}
                    placeholder="mon-instagram"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={pageData.description}
                  onChange={(e) => setPageData({ ...pageData, description: e.target.value })}
                  placeholder="Une brève description de votre page"
                />
              </div>
            </CardContent>
          </Card>

          {/* Links Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="mr-2 h-4 w-4" />
                Mes liens
              </CardTitle>
              <CardDescription>
                Ajoutez et organisez vos liens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add new link */}
              <div className="grid gap-4 md:grid-cols-3">
                <Input
                  placeholder="Titre du lien"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                />
                <Input
                  placeholder="URL"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />
                <Button onClick={addLink} disabled={!newLink.title || !newLink.url}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>

              {/* Links list */}
              <div className="space-y-2">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div className="flex-1">
                        <p className="font-medium">{link.title}</p>
                        <p className="text-sm text-muted-foreground">{link.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLink(link.id)}
                      >
                        {link.active ? "Actif" : "Inactif"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLink(link.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Settings */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                Apparence
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de votre page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Thème</Label>
                <Select
                  value={pageData.theme}
                  onValueChange={(value) => setPageData({ ...pageData, theme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        {theme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="background">Arrière-plan</Label>
                <Select
                  value={pageData.background}
                  onValueChange={(value) => setPageData({ ...pageData, background: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {backgrounds.map((bg) => (
                      <SelectItem key={bg.value} value={bg.value}>
                        {bg.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Aperçu</CardTitle>
              <CardDescription>
                Votre page sera accessible à cette URL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm font-medium">URL de votre page</p>
                  <p className="text-sm text-muted-foreground">
                    {pageData.slug 
                      ? `${window.location.origin}/${pageData.slug}`
                      : "Choisissez une URL personnalisée"
                    }
                  </p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/preview" target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    Voir l'aperçu
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
