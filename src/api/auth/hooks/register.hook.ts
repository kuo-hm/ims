import { useMutation, useQuery } from '@tanstack/react-query';
import { REGISTER_KEYS } from '../const';
import { addNewUser } from '../api/register.api';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useRegisterApi = () => {
  const mutation = useMutation({
    mutationKey: [REGISTER_KEYS.REGISTER],
    mutationFn: addNewUser,
    onSuccess: () => {
      toast.success('Registration successful!', {
        description: 'You can now log in with your new account.',
        duration: 5000,
      });
    },
    onError: (error: AxiosError) => {
      if (error instanceof AxiosError && error.status === 400) {
        toast.error('Registration failed: Invalid data provided.', {
          description: 'Please check your input and try again.',
          duration: 5000,
        });
        return;
      }

      toast.error('Registration failed: An unexpected error occurred.', {
        description: 'Please try again later.',
        duration: 5000,
      });
    },
  });

  return mutation;
};
