
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  BookOpen, 
  Download, 
  FileText, 
  Filter, 
  Search, 
  Upload, 
  Star, 
  Clock,
  MoreVertical,
  Plus,
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

// Sample notes data
const notesData = [
  {
    id: 1,
    title: "Database Management Systems: Normalization",
    subject: "Database Systems",
    uploadedBy: "Dr. Sarah Johnson",
    uploadDate: "May 15, 2023",
    fileSize: "2.5 MB",
    fileType: "PDF",
    starred: true
  },
  {
    id: 2,
    title: "Computer Networks: OSI Model",
    subject: "Computer Networks",
    uploadedBy: "Prof. Michael Chen",
    uploadDate: "May 10, 2023",
    fileSize: "1.8 MB",
    fileType: "PDF",
    starred: false
  },
  {
    id: 3,
    title: "Cloud Computing: Service Models",
    subject: "Cloud Computing",
    uploadedBy: "Dr. Emily Wong",
    uploadDate: "May 5, 2023",
    fileSize: "3.2 MB",
    fileType: "PPTX",
    starred: true
  },
  {
    id: 4,
    title: "Operating Systems: Process Scheduling",
    subject: "Operating Systems",
    uploadedBy: "Prof. David Miller",
    uploadDate: "April 30, 2023",
    fileSize: "1.5 MB",
    fileType: "PDF",
    starred: false
  },
  {
    id: 5,
    title: "Web Development: JavaScript Frameworks",
    subject: "Web Development",
    uploadedBy: "Prof. Jessica Brown",
    uploadDate: "April 25, 2023",
    fileSize: "4.1 MB",
    fileType: "ZIP",
    starred: false
  },
  {
    id: 6,
    title: "Artificial Intelligence: Neural Networks",
    subject: "Artificial Intelligence",
    uploadedBy: "Dr. Robert Kim",
    uploadDate: "April 20, 2023",
    fileSize: "2.9 MB",
    fileType: "PDF",
    starred: false
  }
];

// Subjects for filtering
const subjects = [
  "All Subjects",
  "Database Systems",
  "Computer Networks",
  "Cloud Computing",
  "Operating Systems",
  "Web Development",
  "Artificial Intelligence"
];

const Notes = () => {
  const { role } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [sortBy, setSortBy] = useState("newest");
  const [starredNotes, setStarredNotes] = useState<number[]>(
    notesData.filter(note => note.starred).map(note => note.id)
  );

  // Toggle star status
  const toggleStar = (noteId: number) => {
    if (starredNotes.includes(noteId)) {
      setStarredNotes(starredNotes.filter(id => id !== noteId));
    } else {
      setStarredNotes([...starredNotes, noteId]);
    }
  };

  // Filter notes based on search, subject, and sort
  const filteredNotes = notesData
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = selectedSubject === "All Subjects" || note.subject === selectedSubject;
      
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      const dateA = new Date(a.uploadDate);
      const dateB = new Date(b.uploadDate);
      
      if (sortBy === "newest") {
        return dateB.getTime() - dateA.getTime();
      } else if (sortBy === "oldest") {
        return dateA.getTime() - dateB.getTime();
      } else if (sortBy === "a-z") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "z-a") {
        return b.title.localeCompare(a.title);
      }
      
      return 0;
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
            <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
            <p className="text-muted-foreground mt-1">
              {role === "student" 
                ? "Access and download course materials shared by your teachers" 
                : "Manage and share learning materials with your students"}
            </p>
          </motion.div>
        </header>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Input
              type="text"
              placeholder="Search notes by title, subject, or uploader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Subject: {selectedSubject}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {subjects.map((subject) => (
                  <DropdownMenuItem 
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Sort by: {
                    sortBy === "newest" ? "Newest" :
                    sortBy === "oldest" ? "Oldest" :
                    sortBy === "a-z" ? "A-Z" : "Z-A"
                  }</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("a-z")}>
                  A-Z
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("z-a")}>
                  Z-A
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {role === "teacher" && (
          <Button className="self-start flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload New Notes
          </Button>
        )}

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${
                      note.fileType === "PDF" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" :
                      note.fileType === "PPTX" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium line-clamp-1">{note.title}</h3>
                      <p className="text-xs text-muted-foreground">{note.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => toggleStar(note.id)}
                    >
                      <Star 
                        className={`h-4 w-4 ${
                          starredNotes.includes(note.id) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-muted-foreground"
                        }`} 
                      />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" /> Download
                        </DropdownMenuItem>
                        {role !== "student" && (
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                        )}
                        {role !== "student" && (
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Uploaded by: {note.uploadedBy}</span>
                    <Badge variant="outline" className="text-xs">
                      {note.fileType}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                    <span>{note.uploadDate}</span>
                    <span>{note.fileSize}</span>
                  </div>
                </div>
                <Button className="w-full mt-4 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 flex flex-col items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No notes found</h3>
            <p className="text-center text-muted-foreground mt-1">
              {searchTerm || selectedSubject !== "All Subjects"
                ? "Try adjusting your search or filter criteria"
                : role === "student"
                ? "No notes have been shared with you yet"
                : "You haven't uploaded any notes yet"}
            </p>
            {role !== "student" && (
              <Button className="mt-4 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Notes
              </Button>
            )}
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Notes;
