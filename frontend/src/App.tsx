import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Notes from "./pages/Notes";
import Assignments from "./pages/Assignments";
import Placements from "./pages/Placements";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/ManageStudents";
import ManageTeachers from "./pages/ManageTeachers";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/placements" element={<Placements />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/manage-students" element={<ManageStudents />} />
                <Route path="/manage-teachers" element={<ManageTeachers />} />

                {/* Role-specific routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/teacher" element={<Index />} />
                <Route path="/teacher/*" element={<Index />} />
                <Route path="/student" element={<Index />} />
                <Route path="/student/*" element={<Index />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
