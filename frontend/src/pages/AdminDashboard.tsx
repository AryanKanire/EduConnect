
import { UserManagement } from "@/components/admin/UserManagement";
import { MainLayout } from "@/components/layout/MainLayout";
import { useUserRole } from "@/hooks/use-user-role";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { role } = useUserRole();
  const navigate = useNavigate();
  
  // Protect this route for admin only
  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <UserManagement />
      </div>
    </MainLayout>
  );
}
