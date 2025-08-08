import { Loader2 } from 'lucide-react';
import { cn } from '@linkhive/ui';

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

export function LoadingSpinner({ className, size = 24 }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2
        className={cn('animate-spin text-primary', className)}
        size={size}
      />
    </div>
  );
}
