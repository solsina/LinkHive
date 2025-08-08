import { Suspense } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ShortLinksList } from "@/components/short-links/short-links-list"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ShortLinksPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <ShortLinksList />
      </Suspense>
    </DashboardLayout>
  )
}
