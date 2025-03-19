
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/use-user-role";
import { useState } from "react";

// Sample event data
const eventsByDate: Record<string, { title: string; type: "class" | "exam" | "event" | "holiday"; time?: string }[]> = {
  "2023-06-05": [
    { title: "Database Systems Lecture", type: "class", time: "09:00 - 10:30" },
    { title: "Project Meeting", type: "event", time: "14:00 - 15:30" }
  ],
  "2023-06-06": [
    { title: "Computer Networks Lab", type: "class", time: "11:00 - 13:00" }
  ],
  "2023-06-08": [
    { title: "Mid-Term Examination", type: "exam", time: "10:00 - 12:00" }
  ],
  "2023-06-12": [
    { title: "College Foundation Day", type: "holiday" }
  ],
  "2023-06-15": [
    { title: "Project Submission Deadline", type: "event" }
  ],
  "2023-06-18": [
    { title: "Workshop on AI", type: "event", time: "10:00 - 16:00" }
  ],
  "2023-06-20": [
    { title: "Final Examination", type: "exam", time: "09:00 - 12:00" }
  ]
};

const Calendar = () => {
  const { role } = useUserRole();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Get days in the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of the month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Create calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Empty cells for days before the 1st
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get events for the day
  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventsByDate[dateStr] || [];
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <header>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Academic Calendar</h1>
            <p className="text-muted-foreground mt-1">
              View upcoming classes, exams, and events
            </p>
          </motion.div>
        </header>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <span>{monthNames[month]} {year}</span>
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Day names */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium p-2">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="p-2 min-h-[100px]"></div>;
              }

              const events = getEventsForDay(day);
              const hasEvents = events.length > 0;

              return (
                <div
                  key={`day-${day}`}
                  className={`p-2 border rounded-md min-h-[100px] ${
                    hasEvents ? "border-primary/20" : "border-border"
                  }`}
                >
                  <div className="font-medium mb-1">{day}</div>
                  {events.map((event, eventIndex) => (
                    <div
                      key={`event-${day}-${eventIndex}`}
                      className={`text-xs p-1 mb-1 rounded-md ${
                        event.type === "class"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : event.type === "exam"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          : event.type === "holiday"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      }`}
                    >
                      <div className="font-medium">{event.title}</div>
                      {event.time && <div>{event.time}</div>}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Calendar legend */}
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm">Classes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm">Exams</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm">Holidays</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm">Events</span>
          </div>
        </div>

        {role === "admin" && (
          <Card className="p-6 mt-4">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <p className="text-muted-foreground">
              As an administrator, you can add new events to the calendar. This feature would include a form to select date, event type, title, and optional time.
            </p>
            <Button className="mt-4">Add Event</Button>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Calendar;
