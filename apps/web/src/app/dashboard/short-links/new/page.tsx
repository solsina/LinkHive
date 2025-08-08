import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ShortLinkEditor } from '@/components/short-links/short-link-editor';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function NewShortLinkPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <ShortLinkEditor />
      </Suspense>
    </DashboardLayout>
  );
}
