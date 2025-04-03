
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if mobile and close sidebar accordingly
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close sidebar on navigation in mobile view
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="relative flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "absolute inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          !sidebarOpen && "-translate-x-full"
        )}
      >
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </aside>

      {/* Main content */}
      <main 
        className={cn(
          "flex-1 w-full transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:pl-0" : "lg:pl-0"
        )}
      >
        <div className="flex h-full flex-col">
          <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <motion.div 
            className="flex-1 overflow-auto p-4 md:p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto w-full max-w-7xl min-h-[calc(100vh-8rem)]">
              {children}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Overlay for mobile view */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
