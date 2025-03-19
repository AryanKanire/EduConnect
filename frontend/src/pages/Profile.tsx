
import { MainLayout } from "@/components/layout/MainLayout";
import { RoleSwitcher } from "@/components/profile/RoleSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserRole } from "@/hooks/use-user-role";
import { 
  Shield, 
  Award, 
  GraduationCap, 
  UserCircle, 
  Bell, 
  Lock, 
  LogOut 
} from "lucide-react";

const Profile = () => {
  const { role } = useUserRole();

  // Get user details based on role
  const getUserInfo = () => {
    switch (role) {
      case "admin":
        return {
          name: "Admin User",
          email: "admin@educonnect.edu",
          fallback: "AD",
          fullName: "Admin Dashboard",
          department: "System Administration",
          avatarColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
          icon: <Shield className="h-5 w-5" />
        };
      case "teacher":
        return {
          name: "Professor Davis",
          email: "davis@educonnect.edu",
          fallback: "TC",
          fullName: "Professor Davis",
          department: "Computer Science",
          avatarColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
          icon: <Award className="h-5 w-5" />
        };
      default:
        return {
          name: "Alex Johnson",
          email: "alex@educonnect.edu",
          fallback: "ST",
          fullName: "Alex Johnson",
          department: "Computer Science",
          avatarColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
          icon: <GraduationCap className="h-5 w-5" />
        };
    }
  };

  const userInfo = getUserInfo();

  return (
    <MainLayout>
      <div className="container max-w-4xl py-6 space-y-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <Avatar className="h-20 w-20 border-4 border-background shadow-md">
            <AvatarImage src="/avatar-placeholder.jpg" alt="Profile" />
            <AvatarFallback className={userInfo.avatarColor}>{userInfo.fallback}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{userInfo.name}</h1>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                role === "admin" ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400" :
                role === "teacher" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
              }`}>
                {userInfo.icon}
                <span className="capitalize">{role}</span>
              </span>
            </div>
            <p className="text-muted-foreground">{userInfo.email}</p>
            <p className="text-muted-foreground">{userInfo.department}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6 md:col-span-2">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Profile Settings</h2>
              <Separator />
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" className="justify-start">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Lock className="mr-2 h-4 w-4" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="justify-start text-destructive hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <RoleSwitcher />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
