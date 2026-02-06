"use client"

import AdminDashboard from "@/components/Dashboard/Dashboard";
import AccessDenied from "@/components/ui/AccessDenied";
import { useAuth } from "@/context/AuthContext";

const App = () => {

  const { user, loading, hasModuleAccess } = useAuth();

  if (loading) return;


  return (
    <div className="p-5">
      {!hasModuleAccess('dashboard') ? <AdminDashboard /> : <AccessDenied />}
    </div>
  );


};

export default App;

