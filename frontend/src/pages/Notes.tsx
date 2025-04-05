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
import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

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
  const [notes, setNotes] = useState([]); // Ensure notes is initialized as an array
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [sortBy, setSortBy] = useState("newest");
  const [starredNotes, setStarredNotes] = useState<number[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for modal
  const { register, handleSubmit, reset } = useForm();

  // Fetch notes from the backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/api/teacher/notes/"); // Updated API route
        const data = Array.isArray(response.data) ? response.data : []; // Ensure response is an array
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]); // Fallback to an empty array in case of an error
      }
    };
    fetchNotes();
  }, []);

  // Toggle star status
  const toggleStar = (noteId: number) => {
    if (starredNotes.includes(noteId)) {
      setStarredNotes(starredNotes.filter(id => id !== noteId));
    } else {
      setStarredNotes([...starredNotes, noteId]);
    }
  };

  // Handle note download
  const handleDownload = async (noteId: string) => {
    try {
      const response = await axios.get(`/api/notes/${noteId}/download`);
      const link = document.createElement("a");
      link.href = response.data.downloadUrl;
      link.download = ""; // Optional: Set a default filename
      link.click();
    } catch (error) {
      console.error("Failed to download note:", error);
    }
  };

  const handleUpload = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("year", data.year);
      formData.append("subject", data.subject);
      formData.append("file", data.file[0]);

      await axios.post("/api/teacher/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }); // Updated API route

      setIsUploadModalOpen(false);
      reset();
      // Refresh notes after upload
      const response = await axios.get("/api/teacher/notes/"); // Updated API route
      setNotes(response.data);
    } catch (error) {
      console.error("Failed to upload note:", error);
    }
  };

  // Filter notes based on search, subject, and sort
  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = selectedSubject === "All Subjects" || note.subject === selectedSubject;
      
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
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
          <Button
            className="self-start flex items-center gap-2"
            onClick={() => setIsUploadModalOpen(true)} // Open modal
          >
            <Upload className="h-4 w-4" />
            Upload New Notes
          </Button>
        )}

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card key={note._id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${
                      note.fileName.endsWith(".pdf") ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" :
                      note.fileName.endsWith(".pptx") ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
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
                      onClick={() => toggleStar(note._id)}
                    >
                      <Star 
                        className={`h-4 w-4 ${
                          starredNotes.includes(note._id) 
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
                        <DropdownMenuItem onClick={() => handleDownload(note._id)}>
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
                    <span>Uploaded by: {note.teacher.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {note.fileName.split('.').pop()?.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    <span>{note.fileName}</span>
                  </div>
                </div>
                <Button className="w-full mt-4 flex items-center gap-2" onClick={() => handleDownload(note._id)}>
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

        {/* Upload Notes Modal */}
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Notes</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpload)}>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
                />
                <Textarea
                  placeholder="Description"
                  {...register("description")}
                />
                <Input
                  type="text"
                  placeholder="Year"
                  {...register("year", { required: true })}
                />
                <Input
                  type="text"
                  placeholder="Subject"
                  {...register("subject", { required: true })}
                />
                <Input
                  type="file"
                  {...register("file", { required: true })}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Upload</Button>
                <Button
                  variant="outline"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Notes;
