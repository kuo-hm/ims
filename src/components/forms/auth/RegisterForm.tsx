'use client';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { PersonalInformationStep, AddressStep, SecurityStep } from '@/components/steps/auth';
import { useRegisterContext } from '@/app/auth/context/register.context';

export const RegisterForm = () => {
  const { steps, currentStep } = useRegisterContext();

  return (
    <div className="relative z-10 w-full max-w-3xl py-16">
      <div className="relative">
        <Card className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden p-0">
          <div className="relative p-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <FaUser className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="text-white/70">Join us today and get started</p>
            </div>
            <div className="flex justify-center gap-4 pt-8 pb-4">
              {steps.map((label, idx) => (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                      currentStep === idx
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-white/30 bg-white/10 text-white/60'
                    } font-bold`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs ${
                      currentStep === idx ? 'text-blue-400 font-semibold' : 'text-white/50'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {currentStep === 0 && <PersonalInformationStep />}
              {currentStep === 1 && <SecurityStep />}
              {currentStep === 2 && <AddressStep />}
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/5 text-white/60 rounded-full">or</span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-white/70">
                <span>Already have an account?</span>
                <Link
                  className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors duration-200"
                  href="/auth/login"
                >
                  Sign in
                </Link>
              </div>
              <p className="text-white/50 text-xs max-w-md mx-auto">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
