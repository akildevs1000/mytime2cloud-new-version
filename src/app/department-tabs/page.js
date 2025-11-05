"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import Designation from "@/components/Designation/Page";
import SubDepartment from "@/components/SubDepartment/Page";
import Department from "@/components/Department/Page";


const DepartmentTabs = () => {
  return (
    <Tabs defaultValue="department" className="w-full">
      {/* --- Tabs Header aligned Right --- */}
      <div className="flex justify-end mb-4">
        <TabsList className="flex bg-white shadow-sm border rounded-lg p-1">
          <TabsTrigger
            value="designation"
            className="px-4 py-2 text-sm font-medium rounded-md 
              data-[state=active]:bg-primary/10 
              data-[state=active]:text-primary 
              data-[state=active]:shadow-sm 
              transition-all duration-200"
          >
            Designation
          </TabsTrigger>

          <TabsTrigger
            value="subdepartment"
            className="px-4 py-2 text-sm font-medium rounded-md 
              data-[state=active]:bg-primary/10 
              data-[state=active]:text-primary 
              data-[state=active]:shadow-sm 
              transition-all duration-200"
          >
            SubDepartment
          </TabsTrigger>

          <TabsTrigger
            value="department"
            className="px-4 py-2 text-sm font-medium rounded-md 
              data-[state=active]:bg-primary/10 
              data-[state=active]:text-primary 
              data-[state=active]:shadow-sm 
              transition-all duration-200"
          >
            Department
          </TabsTrigger>
        </TabsList>
      </div>

      {/* --- Tabs Content --- */}
      <div className="rounded-xl bg-slate-50/80 p-6 shadow-sm">
        <TabsContent value="designation" className="space-y-2">
          <Designation />
        </TabsContent>

        <TabsContent value="subdepartment" className="space-y-2">
          <SubDepartment />
        </TabsContent>

        <TabsContent value="department" className="space-y-2">
         <Department />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DepartmentTabs;
