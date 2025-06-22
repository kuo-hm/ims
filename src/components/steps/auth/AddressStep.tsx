import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterAddress, registerAddressSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaCity, FaFlag, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { useRegisterContext } from '../../../app/auth/context/register.context';

export const AddressStep = () => {
  const { setAddressInformation, previousStep, handleSubmit, isLoading } = useRegisterContext();
  const form = useForm<RegisterAddress>({
    resolver: zodResolver(registerAddressSchema),
  });

  const onSubmit = (data: RegisterAddress) => {
    setAddressInformation(data);
    handleSubmit();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaMapMarkerAlt className="w-4 h-4 text-white" />
            <h3 className="text-lg font-semibold text-white">Address (Optional)</h3>
          </div>
          <div className="relative  rounded-xl ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Street Address</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter street address"
                          className="pl-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">City</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter city"
                          className="pl-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">State/Province</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter state or province"
                          className="pl-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaFlag className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Postal Code</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter postal code"
                          className="pl-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel className="text-white/90">Country</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter country"
                          className="pl-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-4">
          <Button
            type="button"
            variant={'outline'}
            className={`bg-transparent text-white cursor-pointer ${isLoading ? 'opacity-50 ' : ''}`}
            onClick={previousStep}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="hover:bg-blue-600 bg-blue-500 text-white cursor-pointer"
            disabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
