
import { Shield, GraduationCap, Award } from "lucide-react";
import { UserRole, useUserRole } from "@/hooks/use-user-role";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface RoleSwitcherProps {
  className?: string;
}

export function RoleSwitcher({ className }: RoleSwitcherProps) {
  const { role, changeRole } = useUserRole();
  const navigate = useNavigate();

  const handleRoleChange = (value: string) => {
    const newRole = value as UserRole;
    changeRole(newRole);
    
    // Navigate to the appropriate dashboard
    switch (newRole) {
      case 'admin':
        navigate('/admin');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'student':
        navigate('/student');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium">Switch Profile</h3>
      <p className="text-sm text-muted-foreground">
        Switch between different user profiles to see how the interface changes.
      </p>
      
      <RadioGroup 
        value={role} 
        onValueChange={handleRoleChange}
        className="grid grid-cols-1 gap-4 mt-4"
      >
        <div className={cn(
          "flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-colors",
          role === "student" 
            ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800"
            : "hover:bg-muted"
        )}>
          <RadioGroupItem value="student" id="student" className="sr-only" />
          <Label htmlFor="student" className="flex flex-1 items-center gap-3 cursor-pointer">
            <div className="bg-emerald-100 text-emerald-800 p-2 rounded-md dark:bg-emerald-900/30 dark:text-emerald-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Student</p>
              <p className="text-sm text-muted-foreground">Access to courses, assignments, and placement info</p>
            </div>
          </Label>
        </div>

        <div className={cn(
          "flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-colors",
          role === "teacher" 
            ? "bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800"
            : "hover:bg-muted"
        )}>
          <RadioGroupItem value="teacher" id="teacher" className="sr-only" />
          <Label htmlFor="teacher" className="flex flex-1 items-center gap-3 cursor-pointer">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-md dark:bg-blue-900/30 dark:text-blue-400">
              <Award className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Teacher</p>
              <p className="text-sm text-muted-foreground">Grade assignments, create content, manage students</p>
            </div>
          </Label>
        </div>

        <div className={cn(
          "flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-colors",
          role === "admin" 
            ? "bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-800"
            : "hover:bg-muted"
        )}>
          <RadioGroupItem value="admin" id="admin" className="sr-only" />
          <Label htmlFor="admin" className="flex flex-1 items-center gap-3 cursor-pointer">
            <div className="bg-rose-100 text-rose-800 p-2 rounded-md dark:bg-rose-900/30 dark:text-rose-400">
              <Shield className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Admin</p>
              <p className="text-sm text-muted-foreground">Full access to all features and user management</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
