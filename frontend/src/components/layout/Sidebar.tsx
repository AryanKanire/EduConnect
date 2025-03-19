
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Users, 
  GraduationCap, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  ClipboardList, 
  Briefcase, 
  Bell,
  Settings,
  HomeIcon,
  MenuIcon,
  X,
  FileText,
  BarChart4,
  School,
  PenLine,
  ShieldCheck,
  Award,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserRole } from "@/hooks/use-user-role";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  const { role } = useUserRole();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const sidebarVariants = {
    open: { 
      width: isMobile ? "100%" : "280px", 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.05
      } 
    },
    closed: { 
      width: isMobile ? "0px" : "80px", 
      x: isMobile ? "-100%" : 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -10 }
  };

  const getMenuItems = () => {
    const commonItems = [
      { 
        icon: HomeIcon, 
        label: "Dashboard", 
        path: "/" 
      },
      { 
        icon: Calendar, 
        label: "Calendar", 
        path: "/calendar" 
      },
      { 
        icon: Bell, 
        label: "Notifications", 
        path: "/notifications" 
      },
      { 
        icon: MessageSquare, 
        label: "Messages", 
        path: "/messages" 
      },
    ];

    const roleSpecificItems = {
      student: [
        { icon: BookOpen, label: "Notes", path: "/notes" },
        { icon: ClipboardList, label: "Assignments", path: "/assignments" },
        { icon: Briefcase, label: "Placements", path: "/placements" },
      ],
      teacher: [
        { icon: BookOpen, label: "Notes", path: "/notes" },
        { icon: ClipboardList, label: "Assignments", path: "/assignments" },
        { icon: PenLine, label: "Grading", path: "/grading" },
        { icon: FileText, label: "Reports", path: "/reports" },
      ],
      admin: [
        { icon: GraduationCap, label: "Manage Students", path: "/manage-students" },
        { icon: UserCog, label: "Manage Teachers", path: "/manage-teachers" },
        { icon: Briefcase, label: "Placements", path: "/placements" },
        { icon: School, label: "Departments", path: "/departments" },
        { icon: ShieldCheck, label: "Permissions", path: "/permissions" },
        { icon: BarChart4, label: "Analytics", path: "/analytics" },
      ]
    };

    return [...commonItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || [])];
  };

  const menuItems = getMenuItems();

  const getUserInfo = () => {
    switch (role) {
      case "admin":
        return {
          name: "Admin User",
          fallback: "AD",
          fullName: "Admin Dashboard",
          badge: "System Admin",
          avatarColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
        };
      case "teacher":
        return {
          name: "Teacher Name",
          fallback: "TC",
          fullName: "Professor Davis",
          badge: "Senior Faculty",
          avatarColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
        };
      default:
        return {
          name: "Student Name",
          fallback: "ST",
          fullName: "Alex Johnson",
          badge: "Computer Science",
          avatarColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
        };
    }
  };

  const userInfo = getUserInfo();

  const MobileOverlay = () => {
    if (!isMobile || !isOpen) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black/50 z-30"
        onClick={() => setIsOpen(false)}
      />
    );
  };

  const MobileCloseButton = () => {
    if (!isMobile) return null;
    
    return (
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 md:hidden" 
        onClick={() => setIsOpen(false)}
      >
        <X className="h-5 w-5" />
      </Button>
    );
  };

  const RoleBadge = () => {
    if (!isOpen) return null;
    
    return (
      <span className={cn(
        "text-xs font-medium rounded-full px-2 py-0.5 uppercase tracking-wide",
        role === "admin" ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400" :
        role === "teacher" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
      )}>
        {userInfo.badge}
      </span>
    );
  };

  return (
    <>
      <MobileOverlay />
      
      <motion.div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar shadow-md",
          "border-r border-sidebar-border",
          isMobile ? "w-full md:w-auto" : "w-[280px]"
        )}
        variants={sidebarVariants}
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
      >
        <MobileCloseButton />
        
        <div className={cn(
          "flex h-16 items-center px-4 py-4",
          isOpen ? "justify-between" : "justify-center"
        )}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className={cn(
                  "rounded-md p-1",
                  role === "admin" ? "bg-rose-500" :
                  role === "teacher" ? "bg-blue-500" :
                  "bg-primary"
                )}>
                  {role === "admin" ? 
                    <ShieldCheck className="h-6 w-6 text-white" /> : 
                    role === "teacher" ? 
                    <Award className="h-6 w-6 text-white" /> :
                    <GraduationCap className="h-6 w-6 text-white" />
                  }
                </div>
                <span className="font-semibold text-lg">EduConnect</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full h-8 w-8"
            >
              <ChevronLeft className={cn(
                "h-4 w-4 transition-transform duration-200",
                !isOpen && "rotate-180"
              )} />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  location.pathname === item.path ? 
                    "bg-sidebar-accent text-sidebar-accent-foreground" : 
                    "text-sidebar-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  location.pathname === item.path ? 
                    role === "admin" ? "text-rose-500" :
                    role === "teacher" ? "text-blue-500" :
                    "text-primary" : 
                    "text-sidebar-foreground"
                )} />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className={cn(
          "border-t border-sidebar-border p-4",
          isOpen ? "flex flex-col space-y-4" : "flex flex-col items-center gap-4"
        )}>
          {isOpen && (role === "admin" || role === "teacher") && (
            <div className={cn(
              "rounded-md p-2 flex items-center gap-2 text-sm",
              role === "admin" ? "bg-rose-50 text-rose-800 dark:bg-rose-900/10 dark:text-rose-400" :
              "bg-blue-50 text-blue-800 dark:bg-blue-900/10 dark:text-blue-400"
            )}>
              {role === "admin" ? 
                <ShieldCheck className="h-4 w-4 flex-shrink-0" /> : 
                <Award className="h-4 w-4 flex-shrink-0" />
              }
              <span className="font-medium">
                {role === "admin" ? "Admin Control Panel" : "Faculty Portal"}
              </span>
            </div>
          )}
          
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
              location.pathname === "/settings" ? 
                "bg-sidebar-accent text-sidebar-accent-foreground" : 
                "text-sidebar-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-3 rounded-md text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            )}
          >
            <Avatar className={cn(
              "h-8 w-8 transition-transform hover:scale-105 border-2",
              role === "admin" ? "border-rose-200 dark:border-rose-800" :
              role === "teacher" ? "border-blue-200 dark:border-blue-800" :
              "border-emerald-200 dark:border-emerald-800"
            )}>
              <AvatarImage src="/avatar-placeholder.jpg" alt="Profile" />
              <AvatarFallback className={userInfo.avatarColor}>{userInfo.fallback}</AvatarFallback>
            </Avatar>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <p className="font-medium line-clamp-1">
                      {userInfo.fullName}
                    </p>
                    <RoleBadge />
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">{role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
