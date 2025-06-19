import {
  RegisterAddress,
  RegisterPersonalInformation,
  RegisterSecurity,
  SignUpInput,
} from '@/schema/auth/register';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

interface RegisterContextProps {
  personalInformation: RegisterPersonalInformation | undefined;
  securityInformation: RegisterSecurity | undefined;
  addressInformation?: RegisterAddress | undefined;
  setPersonalInformation: (data: RegisterPersonalInformation) => void;
  setSecurityInformation: (data: RegisterSecurity) => void;
  setAddressInformation: (data: RegisterAddress) => void;
  handleSubmit: (data: SignUpInput) => void;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  steps: string[];
}
const STEPS = ['Personal Information', 'Security', 'Address (Optional)'];
export const RegisterContext = createContext<RegisterContextProps | null>(null);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [personalInformation, setPersonalInformation] = useState<RegisterPersonalInformation | undefined>(undefined);
  const [securityInformation, setSecurityInformation] = useState<RegisterSecurity | undefined>(undefined);
  const [addressInformation, setAddressInformation] = useState<RegisterAddress | undefined>(undefined);

  const nextStep = useCallback(() => {
    setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const previousStep = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const isLastStep = activeStep === STEPS.length - 1;
  const isFirstStep = activeStep === 0;

 

  const handleSubmit = useCallback(
    (data: SignUpInput) => {
      // Logic to handle form submission
      console.log('Submitting form:', data);
    },
    []
  );
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
    }),
    [activeStep, setPersonalInformation, setSecurityInformation, setAddressInformation, handleSubmit, isLastStep, isFirstStep, nextStep, previousStep]
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
