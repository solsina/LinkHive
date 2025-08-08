import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { ShortLinkFormData } from '@/lib/validations';

export function useShortLinks() {
  return useQuery({
    queryKey: ['short-links'],
    queryFn: async () => {
      const response = await api.getShortLinks();
      return response.data;
    },
  });
}

export function useShortLink(id: string) {
  return useQuery({
    queryKey: ['short-links', id],
    queryFn: async () => {
      const response = await api.getShortLink(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateShortLink() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ShortLinkFormData) => {
      const response = await api.createShortLink(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['short-links'] });
      toast({
        title: 'Success',
        description: 'Short link created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create short link',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateShortLink() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ShortLinkFormData> }) => {
      const response = await api.updateShortLink(id, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['short-links'] });
      queryClient.invalidateQueries({ queryKey: ['short-links', data.id] });
      toast({
        title: 'Success',
        description: 'Short link updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update short link',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteShortLink() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.deleteShortLink(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['short-links'] });
      toast({
        title: 'Success',
        description: 'Short link deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete short link',
        variant: 'destructive',
      });
    },
  });
}
