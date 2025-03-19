
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Briefcase, 
  Search, 
  Calendar, 
  Building, 
  Users, 
  ExternalLink, 
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Upload,
  Plus,
  BarChart4,
  Pencil,
  Trash
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

// Sample placement data
const placementsData = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    package: "30 LPA",
    location: "Bangalore",
    driveDate: "2023-06-20",
    eligibility: {
      cgpa: 8.5,
      backlogs: "None",
      branches: ["CSE", "IT", "ECE"]
    },
    status: "upcoming",
    description: "Looking for talented software engineers to join our team. Strong problem-solving skills and knowledge of data structures & algorithms required.",
    positions: 10,
    registeredStudents: 45,
    applicationDeadline: "2023-06-15",
    placedStudents: 0
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Product Manager",
    package: "28 LPA",
    location: "Hyderabad",
    driveDate: "2023-06-25",
    eligibility: {
      cgpa: 8.0,
      backlogs: "None",
      branches: ["CSE", "IT", "ECE", "Mechanical"]
    },
    status: "upcoming",
    description: "Seeking product managers with strong technical background and excellent communication skills.",
    positions: 5,
    registeredStudents: 30,
    applicationDeadline: "2023-06-20",
    placedStudents: 0
  },
  {
    id: 3,
    company: "Amazon",
    role: "Data Analyst",
    package: "25 LPA",
    location: "Pune",
    driveDate: "2023-07-05",
    eligibility: {
      cgpa: 7.5,
      backlogs: "None",
      branches: ["CSE", "IT", "ECE", "Mathematics"]
    },
    status: "upcoming",
    description: "Looking for data analysts with strong analytical skills and experience in SQL, Python, and data visualization tools.",
    positions: 8,
    registeredStudents: 40,
    applicationDeadline: "2023-06-30",
    placedStudents: 0
  },
  {
    id: 4,
    company: "Infosys",
    role: "Systems Engineer",
    package: "12 LPA",
    location: "Bangalore",
    driveDate: "2023-05-15",
    eligibility: {
      cgpa: 7.0,
      backlogs: "Maximum 1",
      branches: ["All Engineering Branches"]
    },
    status: "completed",
    description: "Hiring fresh graduates as Systems Engineers to work on various technologies including Java, .NET, Python, and more.",
    positions: 50,
    registeredStudents: 120,
    applicationDeadline: "2023-05-10",
    placedStudents: 42
  },
  {
    id: 5,
    company: "TCS",
    role: "Software Developer",
    package: "10 LPA",
    location: "Multiple",
    driveDate: "2023-05-20",
    eligibility: {
      cgpa: 6.5,
      backlogs: "Maximum 2",
      branches: ["All Engineering Branches"]
    },
    status: "completed",
    description: "Mass recruitment for software developers across various technologies and domains.",
    positions: 100,
    registeredStudents: 180,
    applicationDeadline: "2023-05-15",
    placedStudents: 85
  },
  {
    id: 6,
    company: "Accenture",
    role: "Associate Software Engineer",
    package: "8 LPA",
    location: "Pune",
    driveDate: "2023-05-25",
    eligibility: {
      cgpa: 6.0,
      backlogs: "Maximum 2",
      branches: ["All Engineering Branches"]
    },
    status: "completed",
    description: "Hiring associate software engineers for various technology domains.",
    positions: 75,
    registeredStudents: 150,
    applicationDeadline: "2023-05-20",
    placedStudents: 65
  }
];

// Status options for filtering
const statusOptions = ["All", "Upcoming", "Completed"];

const Placements = () => {
  const { role } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [appliedFilter, setAppliedFilter] = useState(false);

  // Filter placements
  const filteredPlacements = placementsData
    .filter(placement => {
      const matchesSearch = 
        placement.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || 
                          placement.status.toLowerCase() === statusFilter.toLowerCase();
      
      // In a real app, we would check if the current user has applied
      // Here we just use a dummy approach for demonstration
      const matchesApplied = !appliedFilter || (placement.id % 2 === 0);
      
      return matchesSearch && matchesStatus && matchesApplied;
    });

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if user is eligible
  // In a real app, this would check against the user's actual CGPA and other criteria
  const isEligible = (placement: typeof placementsData[0]) => {
    // Dummy implementation
    return role === "student" && placement.status === "upcoming";
  };

  // Check if already applied
  // In a real app, this would check against the user's applications
  const hasApplied = (placementId: number) => {
    // Dummy implementation - just for demonstration
    return role === "student" && placementId % 2 === 0;
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
            <h1 className="text-3xl font-bold tracking-tight">Placements</h1>
            <p className="text-muted-foreground mt-1">
              {role === "student" 
                ? "Explore and apply for upcoming placement drives" 
                : "Manage placement drives and track statistics"}
            </p>
          </motion.div>
        </header>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Input
              type="text"
              placeholder="Search by company, role, or location..."
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

            {role === "student" && (
              <Button 
                variant={appliedFilter ? "default" : "outline"}
                onClick={() => setAppliedFilter(!appliedFilter)}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Applied Only</span>
              </Button>
            )}
          </div>
        </div>

        {role === "admin" && (
          <Button className="self-start flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Placement Drive
          </Button>
        )}

        {/* Placement Statistics (for Admin only) */}
        {role === "admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Companies", value: "25", icon: Building, color: "blue" },
              { title: "Total Positions", value: "348", icon: Briefcase, color: "amber" },
              { title: "Students Placed", value: "192", icon: CheckCircle, color: "emerald" },
              { title: "Placement Rate", value: "78%", icon: BarChart4, color: "purple" }
            ].map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-md ${
                    stat.color === "blue" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                    stat.color === "amber" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                    stat.color === "emerald" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  }`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Placements List */}
        {filteredPlacements.length > 0 ? (
          <div className="space-y-6">
            {filteredPlacements.map((placement) => (
              <Card key={placement.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Company Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-accent flex items-center justify-center">
                        <Building className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-semibold">{placement.company}</h3>
                          <Badge className={`${
                            placement.status === "upcoming" 
                              ? "bg-blue-500" 
                              : "bg-emerald-500"
                          }`}>
                            {placement.status.charAt(0).toUpperCase() + placement.status.slice(1)}
                          </Badge>
                          {hasApplied(placement.id) && (
                            <Badge variant="outline" className="border-blue-500 text-blue-500">
                              Applied
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg font-medium text-primary mt-1">{placement.role}</p>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{placement.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Drive: {formatDate(placement.driveDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>Package: {placement.package}</span>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-sm text-muted-foreground">
                          {placement.description}
                        </p>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Eligibility Criteria</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                            <div className="bg-accent rounded-md p-2">
                              <p className="font-medium">CGPA</p>
                              <p>{placement.eligibility.cgpa}+</p>
                            </div>
                            <div className="bg-accent rounded-md p-2">
                              <p className="font-medium">Backlogs</p>
                              <p>{placement.eligibility.backlogs}</p>
                            </div>
                            <div className="bg-accent rounded-md p-2">
                              <p className="font-medium">Branches</p>
                              <p className="truncate">{placement.eligibility.branches.join(", ")}</p>
                            </div>
                          </div>
                        </div>
                        
                        {placement.status === "upcoming" && (
                          <div className="mt-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Application Deadline: {formatDate(placement.applicationDeadline)}</span>
                            </div>
                          </div>
                        )}
                        
                        {role !== "student" && placement.status === "upcoming" && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Registrations: {placement.registeredStudents} students</span>
                            </div>
                          </div>
                        )}
                        
                        {role !== "student" && placement.status === "completed" && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Placement Stats: {placement.placedStudents} / {placement.positions} positions filled</span>
                              <span>{Math.round((placement.placedStudents / placement.positions) * 100)}%</span>
                            </div>
                            <Progress 
                              value={(placement.placedStudents / placement.positions) * 100} 
                              className="h-2" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 items-start">
                    {role === "student" && placement.status === "upcoming" ? (
                      isEligible(placement) ? (
                        hasApplied(placement.id) ? (
                          <Button variant="outline" className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Applied
                          </Button>
                        ) : (
                          <Button className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            Apply Now
                          </Button>
                        )
                      ) : (
                        <Button variant="outline" disabled className="flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Not Eligible
                        </Button>
                      )
                    ) : role !== "student" && placement.status === "upcoming" ? (
                      <>
                        <Button className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          View Applicants
                        </Button>
                        {role === "admin" && (
                          <Button variant="outline" className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            Edit Drive
                          </Button>
                        )}
                      </>
                    ) : role !== "student" && placement.status === "completed" ? (
                      <>
                        <Button className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          View Results
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <BarChart4 className="h-4 w-4" />
                          Statistics
                        </Button>
                      </>
                    ) : role === "student" && placement.status === "completed" ? (
                      <Button variant="outline" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View Results
                      </Button>
                    ) : null}
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Company Website
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 flex flex-col items-center justify-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No placement drives found</h3>
            <p className="text-center text-muted-foreground mt-1">
              {searchTerm || statusFilter !== "All" || appliedFilter
                ? "Try adjusting your search or filter criteria"
                : "No placement drives are currently scheduled"}
            </p>
            {role === "admin" && (
              <Button className="mt-4 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Placement Drive
              </Button>
            )}
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Placements;
