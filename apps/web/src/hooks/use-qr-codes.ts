import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { QRCodeFormData } from '@/lib/validations';

export function useQRCodes() {
  return useQuery({
    queryKey: ['qr-codes'],
    queryFn: async () => {
      const response = await api.getQRCodes();
      return response.data;
    },
  });
}

export function useQRCode(id: string) {
  return useQuery({
    queryKey: ['qr-codes', id],
    queryFn: async () => {
      const response = await api.getQRCode(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateQRCode() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: QRCodeFormData) => {
      const response = await api.createQRCode(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qr-codes'] });
      toast({
        title: 'Success',
        description: 'QR Code created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create QR Code',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateQRCode() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<QRCodeFormData> }) => {
      const response = await api.updateQRCode(id, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qr-codes'] });
      queryClient.invalidateQueries({ queryKey: ['qr-codes', data.id] });
      toast({
        title: 'Success',
        description: 'QR Code updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update QR Code',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteQRCode() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.deleteQRCode(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qr-codes'] });
      toast({
        title: 'Success',
        description: 'QR Code deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete QR Code',
        variant: 'destructive',
      });
    },
  });
}
