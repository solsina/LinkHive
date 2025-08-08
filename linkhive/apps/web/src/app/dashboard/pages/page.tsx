import { Suspense } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PagesList } from "@/components/pages/pages-list"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function PagesPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <PagesList />
      </Suspense>
    </DashboardLayout>
  )
}
