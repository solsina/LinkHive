import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { QREditor } from '@/components/qr-codes/qr-editor';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function NewQRCodePage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <QREditor />
      </Suspense>
    </DashboardLayout>
  );
}
