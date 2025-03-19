
import { useState } from "react";
import { Menu, Bell, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function TopBar({ sidebarOpen, setSidebarOpen }: TopBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Menu toggle & Search */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <AnimatePresence initial={false}>
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center"
              >
                <Input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  className="w-full md:w-64 pl-9 rounded-full bg-muted/50 border-muted focus-within:border-primary"
                />
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 h-7 w-7"
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="rounded-full"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Notifications, Theme, Profile */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-5 w-5" />
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
                  variant="destructive"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start p-4 cursor-pointer">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">
                      {i === 1 ? "New assignment" : i === 2 ? "Exam schedule" : "Placement update"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {i === 1 ? "2h ago" : i === 2 ? "1d ago" : "3d ago"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {i === 1
                      ? "New assignment has been posted for Database Management Systems."
                      : i === 2
                      ? "End semester exams scheduled from 15th June. Check details."
                      : "Google will be visiting campus on 20th June for placements."}
                  </p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full justify-center font-medium text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          <span className="mx-2 hidden md:block h-6 w-px bg-border" />

          <div className="hidden md:flex items-center gap-3 text-sm">
            <Avatar className="h-8 w-8 border-2 border-primary/10 transition-transform hover:scale-105">
              <AvatarImage src="/avatar-placeholder.jpg" alt="Profile" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="font-medium">Student Name</p>
              <p className="text-xs text-muted-foreground">Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
