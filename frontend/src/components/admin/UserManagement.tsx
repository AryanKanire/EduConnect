
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserPlus, Upload, Download, Search, RefreshCw, Users, UserCog } from "lucide-react";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "teacher";
}

interface UserManagementProps {
  initialTab?: "students" | "teachers";
}

const mockData = {
  students: [
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", enrollmentDate: "2023-09-01" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", enrollmentDate: "2023-09-01" },
    { id: 3, firstName: "Robert", lastName: "Johnson", email: "robert.j@example.com", enrollmentDate: "2023-09-01" },
  ],
  teachers: [
    { id: 1, firstName: "Emily", lastName: "Davis", email: "emily.davis@example.com", department: "Mathematics" },
    { id: 2, firstName: "Michael", lastName: "Wilson", email: "m.wilson@example.com", department: "Science" },
  ]
};

export function UserManagement({ initialTab = "students" }: UserManagementProps) {
  const [activeTab, setActiveTab] = useState<"students" | "teachers">(initialTab);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [processingFile, setProcessingFile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const form = useForm<UserFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: activeTab === "students" ? "student" : "teacher",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExcelFile(e.target.files[0]);
    }
  };

  const handleBulkUpload = () => {
    if (!excelFile) {
      toast.error("Please select a file first");
      return;
    }

    setProcessingFile(true);
    
    // Simulate file processing
    setTimeout(() => {
      setProcessingFile(false);
      setExcelFile(null);
      toast.success(`Successfully imported ${activeTab} data`, {
        description: "New records have been added to the system."
      });
    }, 2000);
  };

  const handleSingleUserAdd = (data: UserFormData) => {
    toast.success(`Added new ${data.role}`, {
      description: `${data.firstName} ${data.lastName} (${data.email}) has been added successfully.`
    });
    form.reset();
  };

  const downloadTemplate = () => {
    toast.success("Template downloaded", {
      description: `The ${activeTab} import template has been downloaded to your device.`
    });
  };

  const filteredData = activeTab === "students" 
    ? mockData.students.filter(student => 
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockData.teachers.filter(teacher => 
        teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage students and teachers in the EduConnect system
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "students" ? "default" : "outline"}
            onClick={() => setActiveTab("students")}
            className="flex items-center gap-2"
          >
            <Users size={16} />
            Students
          </Button>
          <Button
            variant={activeTab === "teachers" ? "default" : "outline"}
            onClick={() => setActiveTab("teachers")}
            className="flex items-center gap-2"
          >
            <UserCog size={16} />
            Teachers
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Add Individual {activeTab === "students" ? "Student" : "Teacher"}</CardTitle>
            <CardDescription>
              Add a new {activeTab === "students" ? "student" : "teacher"} to the system manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSingleUserAdd)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add {activeTab === "students" ? "Student" : "Teacher"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Bulk Import {activeTab === "students" ? "Students" : "Teachers"}</CardTitle>
            <CardDescription>
              Add multiple {activeTab} at once using an Excel file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Make sure your Excel file follows the required template format. 
                <Button variant="link" className="p-0 h-auto" onClick={downloadTemplate}>
                  Download template
                </Button>
              </AlertDescription>
            </Alert>
            
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="excel-upload" className="text-sm font-medium">
                Excel File
              </label>
              <div className="flex items-center gap-2">
                <Input 
                  id="excel-upload" 
                  type="file" 
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  disabled={processingFile}
                />
                <Button 
                  onClick={handleBulkUpload} 
                  disabled={!excelFile || processingFile}
                  variant="secondary"
                >
                  {processingFile ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  Upload
                </Button>
              </div>
              {excelFile && <p className="text-sm text-muted-foreground">Selected: {excelFile.name}</p>}
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">
                The imported {activeTab} will be added to the system automatically.
                Make sure the data is correct before uploading.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Dialog>
          <DialogTrigger asChild>
            <Card className="hover:bg-muted/50 cursor-pointer">
              <CardHeader>
                <CardTitle>Download Template</CardTitle>
                <CardDescription>
                  Get a template file for bulk importing {activeTab}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-4">
                <Download className="h-12 w-12 text-primary/80" />
                <p className="text-sm text-center mt-4 text-muted-foreground">
                  Click to download a pre-formatted Excel template
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Download Import Template</DialogTitle>
              <DialogDescription>
                Download a template file to use for bulk importing {activeTab} into the system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>The template includes the following columns:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>First Name (required)</li>
                <li>Last Name (required)</li>
                <li>Email (required)</li>
                {activeTab === "students" ? (
                  <>
                    <li>Student ID (optional)</li>
                    <li>Enrollment Date (optional)</li>
                  </>
                ) : (
                  <>
                    <li>Teacher ID (optional)</li>
                    <li>Department (optional)</li>
                  </>
                )}
              </ul>
              <p className="text-sm text-muted-foreground">
                Fill in the template with your data and upload it using the bulk import feature.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={downloadTemplate}>
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="space-y-0 pt-6">
          <div className="flex items-center justify-between">
            <CardTitle>{activeTab === "students" ? "Student" : "Teacher"} List</CardTitle>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>{activeTab === "students" ? "Enrollment Date" : "Department"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    No {activeTab} found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                activeTab === "students" ? (
                  filteredData.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.firstName} {student.lastName}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.enrollmentDate}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  filteredData.map((teacher: any) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.firstName} {teacher.lastName}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
