
import { UserManagement } from "@/components/admin/UserManagement";
import { MainLayout } from "@/components/layout/MainLayout";
import { useUserRole } from "@/hooks/use-user-role";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageTeachers() {
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
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Manage Teachers</h2>
          <p className="text-muted-foreground">
            Add, update, and manage teacher information
          </p>
        </div>
        <UserManagement initialTab="teachers" />
      </div>
    </MainLayout>
  );
}
