"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SuccessDialog } from "@/components/SuccessDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Phone, PhoneCall, Users } from "lucide-react";
import { parseApiError, updateEmergencyContact } from "@/lib/api";

const EmergencyContact = ({ payload }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const form = useForm({
    defaultValues: {
      id: payload?.id || "",
      phone_relative_number: payload?.phone_relative_number || "",
      relation: payload?.relation || "",
      local_address: payload?.local_address || "",
      local_city: payload?.local_city || "",
      local_country: payload?.local_country || "",
    },
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const handleCancel = () => router.push(`/employees`);

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    setGlobalError(null);
    try {
      const finalPayload = {
        phone_relative_number: data.phone_relative_number,
        relation: data.relation,
        local_address: data.local_address,
        local_city: data.local_city,
        local_country: data.local_country,
      };

      await updateEmergencyContact(finalPayload, data.id);

      setOpen(true);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setOpen(false);

      router.push(`/employees`);
    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 py-8">
      <div className="">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <PhoneCall className="mr-3 h-6 w-6 text-primary" />
              Emergency Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Phone Relative Number */}
              <FormField
                control={form.control}
                name="phone_relative_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relative Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter relative contact phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Relation */}
              <FormField
                control={form.control}
                name="relation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relation</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter relation (e.g. Brother, Friend)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Local Address */}
              <FormField
                control={form.control}
                name="local_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter local address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Local City */}
              <FormField
                control={form.control}
                name="local_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter local city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Local Country */}
              <FormField
                control={form.control}
                name="local_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter local country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {globalError && (
              <div
                className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg"
                role="alert"
              >
                {globalError}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={handleCancel}>
                CANCEL
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-indigo-700"
                disabled={isSubmitting} a
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
              </Button>
            </div>
          </form>
        </Form>

        <SuccessDialog
          open={open}
          onOpenChange={setOpen}
          title="Contact Saved"
          description="Contact details have been saved successfully."
        />
      </div>
    </div>
  );
};

export default EmergencyContact;
