
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type UserRole = "student" | "teacher" | "admin";

export function useUserRole() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize role from localStorage
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem("educonnect-user-role");
    if (savedRole === "student" || savedRole === "teacher" || savedRole === "admin") {
      return savedRole;
    }
    return "student"; // Default role
  });

  // Handle URL-based role detection
  useEffect(() => {
    let detectedRole: UserRole | null = null;
    
    if (location.pathname.startsWith("/admin")) {
      detectedRole = "admin";
    } else if (location.pathname.startsWith("/teacher")) {
      detectedRole = "teacher";
    } else if (location.pathname.startsWith("/student")) {
      detectedRole = "student";
    }
    
    // Only update if a role was detected from URL
    if (detectedRole && detectedRole !== role) {
      setRole(detectedRole);
      localStorage.setItem("educonnect-user-role", detectedRole);
    }
  }, [location.pathname, role]);

  // Change role and navigate to appropriate route
  const changeRole = (newRole: UserRole) => {
    if (newRole === role) return; // No change needed
    
    setRole(newRole);
    localStorage.setItem("educonnect-user-role", newRole);
    
    // Redirect to appropriate route
    const currentPath = location.pathname;
    let newPath = "/";
    
    if (newRole === "admin") {
      newPath = "/admin";
    } else if (newRole === "teacher") {
      newPath = "/teacher";
    } else if (newRole === "student") {
      newPath = "/student";
    }
    
    // Only navigate if we're not already on that path
    if (!currentPath.startsWith(newPath)) {
      navigate(newPath);
    }
    
    toast.success(`Switched to ${newRole} profile`, {
      description: `You are now viewing the application as a ${newRole}.`
    });
  };

  return { role, setRole, changeRole };
}
