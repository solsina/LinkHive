import { Suspense } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SettingsDashboard } from "@/components/settings/settings-dashboard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <SettingsDashboard />
      </Suspense>
    </DashboardLayout>
  )
}
