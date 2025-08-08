"use client"

import React from "react"
import { Button } from "@linkhive/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@linkhive/ui"
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Globe,
  Heart,
  Share2,
  ExternalLink
} from "lucide-react"

interface PublicPageProps {
  slug: string
}

interface LinkItem {
  id: string
  title: string
  url: string
  icon?: string
  active: boolean
}

interface PageData {
  id: string
  title: string
  description: string
  slug: string
  theme: string
  background: string
  profileImage?: string
  profileName?: string
  links: LinkItem[]
}

export function PublicPage({ slug }: PublicPageProps) {
  // Mock data - in real app, this would be fetched from API
  const pageData: PageData = {
    id: "1",
    title: "Mon Instagram",
    description: "Retrouvez tous mes liens en un seul endroit",
    slug: slug,
    theme: "modern",
    background: "gradient",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    profileName: "John Doe",
    links: [
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
      {
        id: "3",
        title: "Twitter",
        url: "https://twitter.com/username",
        icon: "twitter",
        active: true,
      },
      {
        id: "4",
        title: "Mon site web",
        url: "https://example.com",
        icon: "globe",
        active: true,
      },
      {
        id: "5",
        title: "LinkedIn",
        url: "https://linkedin.com/in/username",
        icon: "linkedin",
        active: true,
      },
    ],
  }

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "globe":
        return <Globe className="h-5 w-5" />
      default:
        return <ExternalLink className="h-5 w-5" />
    }
  }

  const handleLinkClick = (link: LinkItem) => {
    // Track analytics
    console.log("Link clicked:", link.title)
    
    // Open link in new tab
    window.open(link.url, "_blank", "noopener,noreferrer")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pageData.title,
        text: pageData.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // In real app, show toast notification
    }
  }

  const getThemeClasses = () => {
    switch (pageData.theme) {
      case "modern":
        return "bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600"
      case "minimal":
        return "bg-white"
      case "creative":
        return "bg-gradient-to-br from-orange-400 via-red-500 to-purple-600"
      case "professional":
        return "bg-gradient-to-br from-gray-800 to-gray-900"
      case "dark":
        return "bg-black"
      default:
        return "bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600"
    }
  }

  const getTextColor = () => {
    switch (pageData.theme) {
      case "minimal":
        return "text-gray-900"
      case "professional":
      case "dark":
        return "text-white"
      default:
        return "text-white"
    }
  }

  return (
    <div className={`min-h-screen ${getThemeClasses()} ${getTextColor()}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24 border-4 border-white/20">
              <AvatarImage src={pageData.profileImage} alt={pageData.profileName} />
              <AvatarFallback className="text-2xl">
                {pageData.profileName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl font-bold mb-2">{pageData.profileName}</h1>
          <p className="text-lg opacity-90 mb-4">{pageData.description}</p>
          
          {/* Share button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="mb-6"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
        </div>

        {/* Links */}
        <div className="max-w-md mx-auto space-y-3">
          {pageData.links
            .filter(link => link.active)
            .map((link) => (
              <Button
                key={link.id}
                variant="outline"
                className="w-full h-14 text-left justify-start px-6 hover:scale-105 transition-transform duration-200"
                onClick={() => handleLinkClick(link)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getIcon(link.icon)}
                  </div>
                  <span className="font-medium">{link.title}</span>
                </div>
              </Button>
            ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 opacity-70">
          <p className="text-sm">
            Créé avec{" "}
            <Heart className="inline h-4 w-4 text-red-500" />
            {" "}par LinkHive
          </p>
        </div>
      </div>
    </div>
  )
}
