"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import GroupLogin from "@/components/GroupLogin/Page";
import Admin from "@/components/Company/Admin/Page";

const LoginTabs = () => {
  return (
    <Tabs defaultValue="group" className="w-full">
      {/* --- Tabs Header aligned Right --- */}
      <div className="flex justify-end mb-4">
        <TabsList className="flex bg-white shadow-sm border rounded-lg p-1">
          <TabsTrigger
            value="group"
            className="px-4 py-2 text-sm font-medium rounded-md 
              data-[state=active]:bg-primary/10 
              data-[state=active]:text-primary 
              data-[state=active]:shadow-sm 
              transition-all duration-200"
          >
            Group (Dept)
          </TabsTrigger>

          <TabsTrigger
            value="subdepartment"
            className="px-4 py-2 text-sm font-medium rounded-md 
              data-[state=active]:bg-primary/10 
              data-[state=active]:text-primary 
              data-[state=active]:shadow-sm 
              transition-all duration-200"
          >
            Branch
          </TabsTrigger>
        </TabsList>
      </div>

      {/* --- Tabs Content --- */}
      <div className="rounded-xl bg-slate-50/80 p-6 shadow-sm">
        <TabsContent value="group" className="space-y-2">
          <GroupLogin />
        </TabsContent>

        <TabsContent value="subdepartment" className="space-y-2">
          <Admin />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default LoginTabs;
