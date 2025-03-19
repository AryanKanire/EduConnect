
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ClipboardList, 
  MessageSquare, 
  Calendar, 
  Bell, 
  Briefcase,
  Users,
  PenLine,
  FileText,
  CheckSquare,
  BarChart4,
  ArrowRight,
  GraduationCap  // Added this import
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/animations";
import { useUserRole } from "@/hooks/use-user-role";

const Index = () => {
  const navigate = useNavigate();
  const { role } = useUserRole();

  // Role-specific dashboard content
  const renderRoleDashboard = () => {
    switch(role) {
      case "admin":
        return <AdminDashboard />;
      case "teacher":
        return <TeacherDashboard />;
      default:
        return <StudentDashboard />;
    }
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
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's an overview of your {role} dashboard.
            </p>
          </motion.div>
        </header>

        {renderRoleDashboard()}
      </div>
    </MainLayout>
  );
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Stats overview */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="Attendance"
          value="87%"
          change={{ value: 3, isPositive: true }}
          icon={<CheckSquare className="h-5 w-5" />}
        />
        <StatsCard
          title="Assignments"
          value="5"
          change={{ value: 2, isPositive: false }}
          icon={<ClipboardList className="h-5 w-5" />}
        />
        <StatsCard
          title="Upcoming Tests"
          value="3"
          icon={<FileText className="h-5 w-5" />}
        />
        <StatsCard
          title="Unread Messages"
          value="12"
          change={{ value: 5, isPositive: true }}
          icon={<MessageSquare className="h-5 w-5" />}
        />
      </motion.div>

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          title="Recent Notes"
          icon={<BookOpen className="h-5 w-5" />}
          badge="New"
          onClick={() => navigate("/notes")}
        >
          <ul className="space-y-3">
            {["Database Management Systems", "Computer Networks", "Cloud Computing"].map(note => (
              <li key={note} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{note}</p>
                  <p className="text-xs text-muted-foreground">Updated 2 days ago</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View all notes
          </Button>
        </DashboardCard>

        <DashboardCard
          title="Assignments"
          icon={<ClipboardList className="h-5 w-5" />}
          onClick={() => navigate("/assignments")}
        >
          <ul className="space-y-3">
            {[
              { title: "Database Design", deadline: "Tomorrow, 11:59 PM", status: "Pending" },
              { title: "Network Protocols", deadline: "May 15, 11:59 PM", status: "Submitted" },
              { title: "Cloud Project", deadline: "May 20, 11:59 PM", status: "Pending" }
            ].map(assignment => (
              <li key={assignment.title} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{assignment.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {assignment.deadline}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  assignment.status === "Pending" 
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                }`}>
                  {assignment.status}
                </span>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View all assignments
          </Button>
        </DashboardCard>

        <DashboardCard
          title="Upcoming Placements"
          icon={<Briefcase className="h-5 w-5" />}
          onClick={() => navigate("/placements")}
        >
          <ul className="space-y-3">
            {[
              { company: "Google", date: "June 20, 2023", role: "Software Engineer" },
              { company: "Microsoft", date: "June 25, 2023", role: "Product Manager" },
              { company: "Amazon", date: "July 5, 2023", role: "Data Analyst" }
            ].map(placement => (
              <li key={placement.company} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{placement.company}</p>
                  <p className="text-xs text-muted-foreground">{placement.role} • {placement.date}</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  Apply
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View all placements
          </Button>
        </DashboardCard>
      </div>

      {/* Recent activity and Calendar section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          title="Recent Activity"
          icon={<Bell className="h-5 w-5" />}
          className="lg:col-span-2"
        >
          <ul className="space-y-3">
            {[
              { activity: "Assignment submission reminder", time: "2 hours ago", type: "assignment" },
              { activity: "New note uploaded for Database Management", time: "1 day ago", type: "note" },
              { activity: "Google placement drive registration open", time: "2 days ago", type: "placement" },
              { activity: "Mid-semester exam schedule announced", time: "3 days ago", type: "calendar" }
            ].map((activity, index) => (
              <li key={index} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                <div className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${
                  activity.type === "assignment" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                  activity.type === "note" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                  activity.type === "placement" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                }`}>
                  {activity.type === "assignment" ? <ClipboardList className="h-4 w-4" /> :
                   activity.type === "note" ? <BookOpen className="h-4 w-4" /> :
                   activity.type === "placement" ? <Briefcase className="h-4 w-4" /> :
                   <Calendar className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard
          title="This Week"
          icon={<Calendar className="h-5 w-5" />}
          onClick={() => navigate("/calendar")}
        >
          <ul className="space-y-3">
            {[
              { day: "Monday", events: ["Database Lab", "Project Submission"] },
              { day: "Wednesday", events: ["Cloud Computing Lecture", "Placement Seminar"] },
              { day: "Friday", events: ["Mid-term Exam", "Club Meeting"] }
            ].map(day => (
              <li key={day.day} className="border-b border-border pb-2 last:border-0 last:pb-0">
                <p className="text-sm font-medium">{day.day}</p>
                <ul className="mt-1 space-y-1">
                  {day.events.map((event, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <p className="text-xs">{event}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View calendar
          </Button>
        </DashboardCard>
      </div>
    </>
  );
};

const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Stats overview */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="Active Courses"
          value="4"
          icon={<BookOpen className="h-5 w-5" />}
        />
        <StatsCard
          title="Students"
          value="120"
          change={{ value: 15, isPositive: true }}
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Pending Assignments"
          value="23"
          change={{ value: 5, isPositive: false }}
          icon={<ClipboardList className="h-5 w-5" />}
        />
        <StatsCard
          title="Unread Messages"
          value="8"
          icon={<MessageSquare className="h-5 w-5" />}
        />
      </motion.div>

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          title="Recent Uploads"
          icon={<PenLine className="h-5 w-5" />}
          onClick={() => navigate("/notes")}
        >
          <ul className="space-y-3">
            {[
              { title: "Database Normalization", type: "Note", date: "2 days ago" },
              { title: "Network Security", type: "Assignment", date: "1 week ago" },
              { title: "Cloud Computing Models", type: "Lecture", date: "1 week ago" }
            ].map(upload => (
              <li key={upload.title} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{upload.title}</p>
                  <p className="text-xs text-muted-foreground">{upload.type} • {upload.date}</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View all uploads
          </Button>
        </DashboardCard>

        <DashboardCard
          title="Assignment Status"
          icon={<ClipboardList className="h-5 w-5" />}
          onClick={() => navigate("/assignments")}
        >
          <ul className="space-y-3">
            {[
              { title: "Database Design", submitted: 25, total: 30, deadline: "Yesterday" },
              { title: "Network Protocols", submitted: 28, total: 30, deadline: "May 15" },
              { title: "Cloud Project Proposal", submitted: 15, total: 30, deadline: "May 20" }
            ].map(assignment => (
              <li key={assignment.title} className="border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium truncate">{assignment.title}</p>
                  <span className="text-xs font-medium">
                    {assignment.submitted}/{assignment.total}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Deadline: {assignment.deadline}</p>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View all assignments
          </Button>
        </DashboardCard>

        <DashboardCard
          title="Student Messages"
          icon={<MessageSquare className="h-5 w-5" />}
          onClick={() => navigate("/messages")}
        >
          <ul className="space-y-3">
            {[
              { student: "John Doe", message: "Question about the database assignment...", time: "2 hours ago" },
              { student: "Jane Smith", message: "Requesting extension for the network project...", time: "Yesterday" },
              { student: "Mike Johnson", message: "Clarification on cloud computing models...", time: "2 days ago" }
            ].map((message, index) => (
              <li key={index} className="flex items-start gap-3 border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {message.student.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium">{message.student}</p>
                  <p className="text-xs text-muted-foreground truncate">{message.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{message.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View all messages
          </Button>
        </DashboardCard>
      </div>

      {/* Schedule and performance section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          title="Today's Schedule"
          icon={<Calendar className="h-5 w-5" />}
          className="lg:col-span-2"
        >
          <ul className="space-y-3">
            {[
              { time: "09:00 - 10:30", event: "Database Systems Lecture", location: "Room A201" },
              { time: "11:00 - 12:30", event: "Office Hours", location: "Faculty Office" },
              { time: "14:00 - 15:30", event: "Network Security Lab", location: "Lab C103" },
              { time: "16:00 - 17:00", event: "Department Meeting", location: "Conference Room" }
            ].map((event, index) => (
              <li key={index} className="flex items-center gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="w-28 flex-shrink-0">
                  <p className="text-sm font-medium">{event.time}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.event}</p>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View full schedule
          </Button>
        </DashboardCard>

        <DashboardCard
          title="Course Performance"
          icon={<BarChart4 className="h-5 w-5" />}
        >
          <ul className="space-y-3">
            {[
              { course: "Database Systems", avg: 78 },
              { course: "Computer Networks", avg: 82 },
              { course: "Cloud Computing", avg: 75 },
              { course: "Web Development", avg: 85 }
            ].map(course => (
              <li key={course.course} className="border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium truncate">{course.course}</p>
                  <span className="text-xs font-medium">{course.avg}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      course.avg >= 80 ? "bg-emerald-500" : 
                      course.avg >= 70 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${course.avg}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View detailed analytics
          </Button>
        </DashboardCard>
      </div>
    </>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Stats overview */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="Total Students"
          value="2,450"
          change={{ value: 12, isPositive: true }}
          icon={<GraduationCap className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Faculty"
          value="120"
          change={{ value: 5, isPositive: true }}
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Placement Rate"
          value="92%"
          change={{ value: 3, isPositive: true }}
          icon={<Briefcase className="h-5 w-5" />}
        />
        <StatsCard
          title="Active Courses"
          value="85"
          icon={<BookOpen className="h-5 w-5" />}
        />
      </motion.div>

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          title="Recent Admissions"
          icon={<Users className="h-5 w-5" />}
          onClick={() => navigate("/users")}
        >
          <ul className="space-y-3">
            {[
              { name: "Emma Thompson", department: "Computer Science", date: "2 days ago" },
              { name: "Michael Rodriguez", department: "Electrical Engineering", date: "3 days ago" },
              { name: "Sophia Chen", department: "Information Technology", date: "5 days ago" }
            ].map(student => (
              <li key={student.name} className="flex items-start gap-3 border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {student.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.department} • {student.date}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View all students
          </Button>
        </DashboardCard>

        <DashboardCard
          title="Upcoming Placements"
          icon={<Briefcase className="h-5 w-5" />}
          onClick={() => navigate("/placements")}
        >
          <ul className="space-y-3">
            {[
              { company: "Google", date: "June 20, 2023", positions: 12 },
              { company: "Microsoft", date: "June 25, 2023", positions: 8 },
              { company: "Amazon", date: "July 5, 2023", positions: 15 }
            ].map(placement => (
              <li key={placement.company} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{placement.company}</p>
                  <p className="text-xs text-muted-foreground">
                    {placement.date} • {placement.positions} positions
                  </p>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  Manage
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View all placements
          </Button>
        </DashboardCard>

        <DashboardCard
          title="Recent Notices"
          icon={<Bell className="h-5 w-5" />}
          onClick={() => navigate("/notifications")}
        >
          <ul className="space-y-3">
            {[
              { title: "End Semester Examination Schedule", date: "Posted 2 days ago", priority: "High" },
              { title: "Faculty Development Program", date: "Posted 3 days ago", priority: "Medium" },
              { title: "Campus Recruitment Drive", date: "Posted 5 days ago", priority: "High" }
            ].map(notice => (
              <li key={notice.title} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{notice.title}</p>
                  <p className="text-xs text-muted-foreground">{notice.date}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  notice.priority === "High" 
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" 
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}>
                  {notice.priority}
                </span>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            Post new notice
          </Button>
        </DashboardCard>
      </div>

      {/* Department and Performance section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          title="Department Overview"
          icon={<Users className="h-5 w-5" />}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { dept: "Computer Science", students: 620, faculty: 35 },
              { dept: "Electrical Engineering", students: 540, faculty: 30 },
              { dept: "Mechanical Engineering", students: 480, faculty: 25 },
              { dept: "Civil Engineering", students: 420, faculty: 22 },
              { dept: "Information Technology", students: 390, faculty: 20 },
              { dept: "Electronics & Comm.", students: 350, faculty: 18 }
            ].map(dept => (
              <div key={dept.dept} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{dept.dept}</p>
                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Students</p>
                    <p className="text-sm font-medium">{dept.students}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Faculty</p>
                    <p className="text-sm font-medium">{dept.faculty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Placement Statistics"
          icon={<BarChart4 className="h-5 w-5" />}
        >
          <ul className="space-y-3">
            {[
              { dept: "Computer Science", rate: 95 },
              { dept: "Information Technology", rate: 92 },
              { dept: "Electronics", rate: 88 },
              { dept: "Electrical", rate: 85 },
              { dept: "Mechanical", rate: 80 },
              { dept: "Civil", rate: 75 }
            ].map(dept => (
              <li key={dept.dept} className="border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium truncate">{dept.dept}</p>
                  <span className="text-xs font-medium">{dept.rate}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      dept.rate >= 90 ? "bg-emerald-500" : 
                      dept.rate >= 80 ? "bg-blue-500" : 
                      dept.rate >= 70 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${dept.rate}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 p-0 h-auto">
            View detailed report
          </Button>
        </DashboardCard>
      </div>
    </>
  );
};

export default Index;
