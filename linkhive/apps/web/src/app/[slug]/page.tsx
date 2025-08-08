import { Suspense } from "react"
import { PublicPage } from "@/components/public/public-page"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface PublicPageProps {
  params: {
    slug: string
  }
}

export default function PublicPageRoute({ params }: PublicPageProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PublicPage slug={params.slug} />
    </Suspense>
  )
}
