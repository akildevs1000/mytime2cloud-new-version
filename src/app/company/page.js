// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Upload, Image, ArrowLeft } from "lucide-react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import useImageUpload from "@/hooks/useImageUpload";

import Profile from "@/components/Company/Profile";
import Contact from "@/components/Company/Contact";
import License from "@/components/Company/License";

import Document from "@/components/Company/Document";
import Password from "@/components/Company/Password";
import Admin from "@/components/Company/Admin/Page";
import AttendanceRating from "@/components/Company/AttendanceRating";
import DoorPin from "@/components/Company/DoorPin";
import ChangeLogo from "@/components/Company/ChangeLogo";
import { getCompanyInfo, getVisitorLink } from "@/lib/api";
import VisitorAppLink from "@/components/Company/VisitorAppLink";


const Company = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [licenseData, setLicenseData] = useState(null);
  const [pin, setPin] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data } = await getCompanyInfo();

        if (data.record) {

          let result = data.record;

          let profile = {
            company_code: result.company_code,
            name: result.name,
            email: result.user?.email,
            member_from: result.member_from,
            expiry: result.expiry,
            max_branches: result.max_branches,
            max_employee: result.max_employee,
            max_devices: result.max_devices,
          };

          setProfileData(profile);
          setContactData(result.contact);
          setLicenseData(result.trade_license);
          setPin(result.pin);
        }

      } catch (error) {
        console.error("Error fetching company info:", parseApiError(error));
      }
    };

    fetchData().finally(() => setIsLoading(false));

  }, []);


  const router = useRouter();

  const tabs = [
    {
      label: "Info",
      value: "company",
      component: <Profile profile={profileData} isLoading={isLoading} />,
    },
    {
      label: "Contact",
      value: "contact",
      component: <Contact contact={contactData} isLoading={isLoading} />,
    },
    {
      label: "License",
      value: "license",
      component: <License license={licenseData} isLoading={isLoading} />,
    },
    {
      label: "Documents",
      value: "documents",
      component: <Document />,
    },
    {
      label: "Password",
      value: "password",
      component: <Password />,
    },
    {
      label: "Admins",
      value: "admins",
      component: <Admin />,
    },
    {
      label: "Attendance Rating",
      value: "attendance",
      component: <AttendanceRating />,
    },
    {
      label: "Door Pin",
      value: "door_pin",
      component: <DoorPin pin={pin} isLoading={isLoading} />,
    },
  ];

  const handleGoBack = () => router.push(`/`);

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Company Information
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your company profile, licenses, admins and security settings.
            </p>
          </div>
          <Button
            onClick={handleGoBack}
            className="bg-primary text-white hover:bg-indigo-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Single card with left image + right tabs */}
        <div className="rounded-2xl bg-white  shadow-lg p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
          {/* Left: image / logo section */}
          <div>
            <div>
              <ChangeLogo />
            </div>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <div className="mt-5">
              <VisitorAppLink />
            </div>
          </div>


          {/* Right: tabs section inside same card */}
          <div className="flex-1">
            {/* Heading above tabs */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Company Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Switch between different sections to configure your company.
              </p>
            </div>

            <Tabs defaultValue="company" className="w-full">
              {/* Tabs header */}
              <TabsList className="flex w-full justify-start  rounded-xl p-1 mb-4 overflow-x-auto">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="
                      px-4 py-2 text-xs sm:text-sm font-medium rounded-lg
                      text-gray-600 dark:text-gray-200
                      whitespace-nowrap
                      transition-all duration-200
                      data-[state=active]:bg-white
                      data-[state=active]:text-primary
                      data-[state=active]:shadow-sm
                      hover:bg-white/70
                    "
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tabs content */}
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="
                    rounded-xl
                    bg-slate-50/80 dark:bg-slate-900/60
                    p-5
                    transition-all
                    duration-300
                    animate-in
                    fade-in-50
                    slide-in-from-top-2
                  "
                >
                  {tab.component}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
