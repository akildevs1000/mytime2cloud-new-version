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
import { Phone, MapPin, Mail, Globe, Home, Map, LocationEdit } from "lucide-react";

const EmergencyContact = ({ payload }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const form = useForm({
    defaultValues: {
      address: payload?.address || "",
      tel: payload?.tel || "",
      mobile: payload?.mobile || "",
      fax: payload?.fax || "",
      city: payload?.city || "",
      state: payload?.state || "",
      nationality: payload?.nationality || "",
      personal_email: payload?.personal_email || "",
    },
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const handleCancel = () => router.push(`/employees`);

  const onSubmit = async (data) => {
    setGlobalError(null);
    try {
      // 👉 Replace this with your API endpoint when ready
      console.log("Emergency Contact Submitted:", data);

      // simulate async API save
      await new Promise((r) => setTimeout(r, 1000));
      setOpen(true);

      await new Promise((r) => setTimeout(r, 2000));
      setOpen(false);
      router.push(`/employees`);
    } catch (error) {
      console.error("Error saving emergency contact:", error);
      setGlobalError("Failed to save emergency contact. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 py-8">
      <div className="">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <LocationEdit className="mr-3 h-6 w-6 text-primary" />
              Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tel */}
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tel</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter telephone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile */}
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fax */}
              <FormField
                control={form.control}
                name="fax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fax</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter fax number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nationality */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter nationality" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Personal Email */}
              <FormField
                control={form.control}
                name="personal_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter personal email"
                        {...field}
                      />
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
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-indigo-700"
                disabled={isSubmitting}
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
          description="Your emergency contact details have been saved successfully."
        />
      </div>
    </div>
  );
};

export default EmergencyContact;
