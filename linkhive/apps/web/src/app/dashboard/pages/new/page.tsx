import { Suspense } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageEditor } from "@/components/pages/page-editor"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function NewPagePage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <PageEditor />
      </Suspense>
    </DashboardLayout>
  )
}
