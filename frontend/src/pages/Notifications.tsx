
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Bell, Pin, Clock, User, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/use-user-role";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Sample notifications data
const notificationsData = [
  {
    id: 1,
    title: "End Semester Examination Schedule",
    description: "The end semester examinations will begin from June 20, 2023. Please check the detailed schedule.",
    date: "2 days ago",
    sender: "Examination Department",
    priority: "high",
    category: "academic"
  },
  {
    id: 2,
    title: "Campus Placement Drive by Google",
    description: "Google will be conducting a campus recruitment drive on June 15, 2023. Eligible students can register through the placements portal.",
    date: "3 days ago",
    sender: "Placement Office",
    priority: "high",
    category: "placement"
  },
  {
    id: 3,
    title: "Holiday Notice: College Foundation Day",
    description: "The college will remain closed on June 12, 2023 on account of College Foundation Day celebrations.",
    date: "5 days ago",
    sender: "Administrative Office",
    priority: "medium",
    category: "general"
  },
  {
    id: 4,
    title: "Workshop on Artificial Intelligence",
    description: "A one-day workshop on AI and Machine Learning will be conducted on June 18, 2023. All interested students can register.",
    date: "1 week ago",
    sender: "Computer Science Department",
    priority: "medium",
    category: "event"
  },
  {
    id: 5,
    title: "Library Book Return Notice",
    description: "All borrowed books must be returned by June 25, 2023. Late returns will incur penalties as per library rules.",
    date: "1 week ago",
    sender: "Library",
    priority: "low",
    category: "general"
  },
  {
    id: 6,
    title: "Fee Payment Reminder",
    description: "The last date for payment of tuition fees for the next semester is July 10, 2023. Please ensure timely payment to avoid late fees.",
    date: "2 weeks ago",
    sender: "Finance Department",
    priority: "high",
    category: "academic"
  }
];

const Notifications = () => {
  const { role } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter notifications based on search term and category filter
  const filteredNotifications = notificationsData.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      notification.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || notification.category === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <header>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with important announcements and information
            </p>
          </motion.div>
        </header>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <Input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "academic" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("academic")}
            >
              Academic
            </Button>
            <Button 
              variant={filter === "placement" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("placement")}
            >
              Placement
            </Button>
            <Button 
              variant={filter === "event" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("event")}
            >
              Events
            </Button>
            <Button 
              variant={filter === "general" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("general")}
            >
              General
            </Button>
          </div>
        </div>

        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className="p-4 hover:bg-accent/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    notification.priority === "high" 
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" 
                      : notification.priority === "medium"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  }`}>
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="font-medium">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.date}
                        </Badge>
                        <Badge className={`text-xs capitalize ${
                          notification.category === "academic" ? "bg-blue-500" :
                          notification.category === "placement" ? "bg-emerald-500" :
                          notification.category === "event" ? "bg-purple-500" :
                          "bg-slate-500"
                        }`}>
                          {notification.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {notification.sender}
                      </span>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          Mark as read
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 flex flex-col items-center justify-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No notifications found</h3>
            <p className="text-center text-muted-foreground mt-1">
              {searchTerm 
                ? "Try adjusting your search or filter criteria"
                : "You're all caught up! Check back later for updates"}
            </p>
          </Card>
        )}

        {role === "admin" && (
          <Card className="p-6 mt-4">
            <h2 className="text-xl font-semibold mb-4">Send New Notification</h2>
            <p className="text-muted-foreground">
              As an administrator, you can create and send new notifications to students and faculty members.
            </p>
            <Button className="mt-4">Create Notification</Button>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Notifications;
