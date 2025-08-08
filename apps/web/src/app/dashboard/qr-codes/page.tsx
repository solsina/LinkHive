import { Suspense } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { QRCodesList } from "@/components/qr-codes/qr-codes-list"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function QRCodesPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <QRCodesList />
      </Suspense>
    </DashboardLayout>
  )
}
