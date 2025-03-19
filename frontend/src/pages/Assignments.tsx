
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  ClipboardList, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Calendar,
  FileText,
  Users,
  MoreVertical,
  ExternalLink,
  Pencil,
  Trash,
  User
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserRole } from "@/hooks/use-user-role";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

// Sample assignments data
const assignmentsData = [
  {
    id: 1,
    title: "Database Design Project",
    subject: "Database Systems",
    description: "Design a normalized database schema for a college management system",
    assignedBy: "Dr. Sarah Johnson",
    dueDate: "2023-06-10",
    status: "pending",
    submissionStatus: null,
    fileType: "PDF",
    totalMarks: 50,
    submittedCount: 18,
    totalStudents: 30
  },
  {
    id: 2,
    title: "Network Protocols Implementation",
    subject: "Computer Networks",
    description: "Implement basic network protocols using socket programming",
    assignedBy: "Prof. Michael Chen",
    dueDate: "2023-06-15",
    status: "pending",
    submissionStatus: "draft",
    fileType: "ZIP",
    totalMarks: 40,
    submittedCount: 12,
    totalStudents: 30
  },
  {
    id: 3,
    title: "Cloud Deployment Exercise",
    subject: "Cloud Computing",
    description: "Deploy a web application on AWS or Azure cloud platforms",
    assignedBy: "Dr. Emily Wong",
    dueDate: "2023-06-20",
    status: "pending",
    submissionStatus: null,
    fileType: "PDF",
    totalMarks: 30,
    submittedCount: 8,
    totalStudents: 30
  },
  {
    id: 4,
    title: "Operating System Scheduler",
    subject: "Operating Systems",
    description: "Implement a CPU scheduling algorithm and analyze its performance",
    assignedBy: "Prof. David Miller",
    dueDate: "2023-05-30",
    status: "overdue",
    submissionStatus: null,
    fileType: "PDF",
    totalMarks: 35,
    submittedCount: 26,
    totalStudents: 30
  },
  {
    id: 5,
    title: "JavaScript Framework Comparison",
    subject: "Web Development",
    description: "Compare and analyze different JavaScript frameworks",
    assignedBy: "Prof. Jessica Brown",
    dueDate: "2023-05-25",
    status: "submitted",
    submissionStatus: "submitted",
    submissionDate: "2023-05-24",
    fileType: "PDF",
    marks: 42,
    totalMarks: 45,
    submittedCount: 30,
    totalStudents: 30
  },
  {
    id: 6,
    title: "Neural Network Implementation",
    subject: "Artificial Intelligence",
    description: "Implement a basic neural network for classification",
    assignedBy: "Dr. Robert Kim",
    dueDate: "2023-05-20",
    status: "graded",
    submissionStatus: "graded",
    submissionDate: "2023-05-19",
    fileType: "ZIP",
    marks: 38,
    totalMarks: 40,
    submittedCount: 29,
    totalStudents: 30
  }
];

// Filter options
const statusOptions = ["All Status", "Pending", "Submitted", "Graded", "Overdue"];
const subjectOptions = [
  "All Subjects",
  "Database Systems",
  "Computer Networks",
  "Cloud Computing",
  "Operating Systems",
  "Web Development",
  "Artificial Intelligence"
];

const Assignments = () => {
  const { role } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");

  // Filter assignments based on role, search term, status, and subject
  const filteredAssignments = assignmentsData
    .filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All Status" || 
                          assignment.status.toLowerCase() === statusFilter.toLowerCase();
      
      const matchesSubject = subjectFilter === "All Subjects" || 
                            assignment.subject === subjectFilter;
      
      return matchesSearch && matchesStatus && matchesSubject;
    });

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if an assignment is due soon (within 3 days)
  const isDueSoon = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
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
            <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground mt-1">
              {role === "student" 
                ? "View and manage your assignments" 
                : "Create and manage assignments for your students"}
            </p>
          </motion.div>
        </header>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Status: {statusFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statusOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option}
                    onClick={() => setStatusFilter(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Subject: {subjectFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {subjectOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option}
                    onClick={() => setSubjectFilter(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {role === "teacher" && (
          <Button className="self-start flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Assignment
          </Button>
        )}

        {/* Assignments List */}
        {filteredAssignments.length > 0 ? (
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${
                        assignment.status === "pending" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                        assignment.status === "submitted" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                        assignment.status === "graded" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                        "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                      }`}>
                        <ClipboardList className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{assignment.title}</h3>
                          <Badge className={`text-xs ${
                            assignment.status === "pending" ? "bg-blue-500" :
                            assignment.status === "submitted" ? "bg-amber-500" :
                            assignment.status === "graded" ? "bg-emerald-500" :
                            "bg-rose-500"
                          }`}>
                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          </Badge>
                          {isDueSoon(assignment.dueDate) && assignment.status === "pending" && (
                            <Badge variant="outline" className="text-xs border-amber-500 text-amber-500">
                              Due Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{assignment.subject}</p>
                        <p className="text-sm mt-2">{assignment.description}</p>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Due: {formatDate(assignment.dueDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" />
                            <span>Type: {assignment.fileType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>By: {assignment.assignedBy}</span>
                          </div>
                          
                          {assignment.status === "graded" && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Marks: {assignment.marks}/{assignment.totalMarks}</span>
                            </div>
                          )}
                          
                          {role === "teacher" && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              <span>Submissions: {assignment.submittedCount}/{assignment.totalStudents}</span>
                            </div>
                          )}
                        </div>
                        
                        {role === "teacher" && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Submission Progress</span>
                              <span>{assignment.submittedCount}/{assignment.totalStudents}</span>
                            </div>
                            <Progress 
                              value={(assignment.submittedCount / assignment.totalStudents) * 100} 
                              className="h-2" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col gap-2 mt-3 md:mt-0">
                    {role === "student" ? (
                      <>
                        {assignment.status === "pending" ? (
                          <Button className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            {assignment.submissionStatus === "draft" ? "Update Draft" : "Submit"}
                          </Button>
                        ) : (
                          <Button variant="outline" className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            View Submission
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <Button className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          View Submissions
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" /> Edit Assignment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="h-4 w-4 mr-2" /> Share Link
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 flex flex-col items-center justify-center">
            <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No assignments found</h3>
            <p className="text-center text-muted-foreground mt-1">
              {searchTerm || statusFilter !== "All Status" || subjectFilter !== "All Subjects"
                ? "Try adjusting your search or filter criteria"
                : role === "student"
                ? "You don't have any assignments at the moment"
                : "You haven't created any assignments yet"}
            </p>
            {role !== "student" && (
              <Button className="mt-4 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Assignment
              </Button>
            )}
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Assignments;
