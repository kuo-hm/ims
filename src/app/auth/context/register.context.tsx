import {
  RegisterAddress,
  RegisterPersonalInformation,
  RegisterSecurity,
  SignUpInput,
} from '@/schema/auth/register';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useRegisterApi } from '../../../api/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface RegisterContextProps {
  personalInformation: RegisterPersonalInformation | undefined;
  securityInformation: RegisterSecurity | undefined;
  addressInformation?: RegisterAddress | undefined;
  setPersonalInformation: (data: RegisterPersonalInformation) => void;
  setSecurityInformation: (data: RegisterSecurity) => void;
  setAddressInformation: (data: RegisterAddress) => void;
  handleSubmit: () => void;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  steps: string[];
  isLoading: boolean;
}
const STEPS = ['Personal Information', 'Security', 'Address (Optional)'];
export const RegisterContext = createContext<RegisterContextProps | null>(null);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [personalInformation, setPersonalInformation] = useState<
    RegisterPersonalInformation | undefined
  >(undefined);
  const [securityInformation, setSecurityInformation] = useState<RegisterSecurity | undefined>(
    undefined,
  );
  const [addressInformation, setAddressInformation] = useState<RegisterAddress | undefined>(
    undefined,
  );
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutateAsync } = useRegisterApi();

  const nextStep = useCallback(() => {
    setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const previousStep = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const isLastStep = activeStep === STEPS.length - 1;
  const isFirstStep = activeStep === 0;

  const handleSubmit = useCallback(() => {
    console.log('Submitting form:');
    if (!personalInformation || !securityInformation) {
      toast.error('Please fill in all required fields before submitting.');
      return;
    }
    setIsLoading(true);
    mutateAsync({
      email: personalInformation.email,
      password: securityInformation.password,
      firstName: personalInformation.firstName,
      lastName: personalInformation.lastName,
      username: personalInformation.username,
    })
      .then(() => {
        toast.success('Registration successful! You can now log in with your new account.', {
          description: 'Welcome aboard!',
          duration: 5000,
        });
        setActiveStep(0);
        setPersonalInformation(undefined);
        setSecurityInformation(undefined);
        setAddressInformation(undefined);
        route.push('/');
      })
      .catch((error) => {
        console.error('Registration error:', error);
        toast.error('Registration failed. Please try again later.', {
          description: 'An unexpected error occurred.',
          duration: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const contextValue = useMemo(
    () => ({
      personalInformation,
      securityInformation,
      addressInformation,
      setPersonalInformation,
      setSecurityInformation,
      setAddressInformation,
      handleSubmit,
      currentStep: activeStep,
      nextStep,
      previousStep,
      isLastStep,
      isFirstStep,
      steps: STEPS,
      isLoading,
    }),
    [
      activeStep,
      setPersonalInformation,
      setSecurityInformation,
      setAddressInformation,
      handleSubmit,
      isLastStep,
      isFirstStep,
      nextStep,
      previousStep,
      isLoading,
    ],
  );

  return <RegisterContext.Provider value={contextValue}>{children}</RegisterContext.Provider>;
}
export function useRegisterContext() {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegisterContext must be used within a RegisterProvider');
  }
  return context;
}
