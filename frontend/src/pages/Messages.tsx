
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { MessageSquare, Send, Search, Phone, Video, MoreHorizontal, User, Paperclip } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserRole } from "@/hooks/use-user-role";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

// Sample chat data
const chats = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "teacher",
    avatar: "/avatar-placeholder.jpg",
    lastMessage: "Please submit your assignment by Friday",
    timestamp: "10:30 AM",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    role: "teacher",
    avatar: "",
    lastMessage: "The class will be held in Room 302 tomorrow",
    timestamp: "Yesterday",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Academic Office",
    role: "admin",
    avatar: "",
    lastMessage: "Your scholarship application has been approved",
    timestamp: "2 days ago",
    unread: 1,
    online: true
  },
  {
    id: 4,
    name: "John Smith",
    role: "student",
    avatar: "/avatar-placeholder.jpg",
    lastMessage: "Thank you for the clarification",
    timestamp: "3 days ago",
    unread: 0,
    online: false
  },
  {
    id: 5,
    name: "Emma Davis",
    role: "student",
    avatar: "",
    lastMessage: "Can we schedule a meeting to discuss the project?",
    timestamp: "1 week ago",
    unread: 0,
    online: true
  }
];

// Sample messages for selected chat
const sampleMessages = [
  {
    id: 1,
    sender: "Dr. Sarah Johnson",
    content: "Hello! I wanted to remind you about the upcoming assignment deadline.",
    timestamp: "10:15 AM",
    isMe: false
  },
  {
    id: 2,
    sender: "Me",
    content: "Thank you for the reminder. I'm working on it right now.",
    timestamp: "10:18 AM",
    isMe: true
  },
  {
    id: 3,
    sender: "Dr. Sarah Johnson",
    content: "Great! Let me know if you have any questions about the requirements.",
    timestamp: "10:20 AM",
    isMe: false
  },
  {
    id: 4,
    sender: "Me",
    content: "Actually, I'm having trouble understanding the third question. Could you please provide some clarification?",
    timestamp: "10:22 AM",
    isMe: true
  },
  {
    id: 5,
    sender: "Dr. Sarah Johnson",
    content: "Of course! For the third question, you need to analyze the case study and apply the concepts we discussed in class last week. Focus on how the principles of database normalization were applied in the scenario.",
    timestamp: "10:25 AM",
    isMe: false
  },
  {
    id: 6,
    sender: "Me",
    content: "That makes sense now. Thank you for the explanation!",
    timestamp: "10:28 AM",
    isMe: true
  },
  {
    id: 7,
    sender: "Dr. Sarah Johnson",
    content: "You're welcome! Please submit your assignment by Friday. Good luck!",
    timestamp: "10:30 AM",
    isMe: false
  }
];

const Messages = () => {
  const { role } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState("");

  // Filter chats based on search
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Role-based filter
  const chatContacts = role === "student" 
    ? filteredChats.filter(chat => chat.role === "teacher" || chat.role === "admin")
    : role === "teacher"
    ? filteredChats.filter(chat => chat.role === "student" || chat.role === "admin")
    : filteredChats;

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    // In a real app, this would send the message to the server
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <header className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground mt-1">
              Communicate with {role === "student" ? "teachers and staff" : role === "teacher" ? "students and colleagues" : "students and faculty"}
            </p>
          </motion.div>
        </header>

        <Card className="flex flex-1 overflow-hidden">
          {/* Left sidebar - Chat list */}
          <div className="w-full max-w-xs border-r border-border">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {chatContacts.length > 0 ? (
                <div className="divide-y divide-border">
                  {chatContacts.map((chat) => (
                    <div 
                      key={chat.id}
                      className={`p-4 hover:bg-accent/20 cursor-pointer transition-colors ${
                        selectedChat.id === chat.id ? "bg-accent/20" : ""
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">{chat.name}</h3>
                            <span className="text-xs text-muted-foreground flex-shrink-0">{chat.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">No contacts found</p>
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Right side - Chat window */}
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedChat.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {sampleMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[70%] ${
                      message.isMe ? "flex-row-reverse" : ""
                    }`}>
                      {!message.isMe && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                          <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className={`rounded-2xl px-4 py-2 ${
                          message.isMe 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-accent text-accent-foreground"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-2">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  size="icon" 
                  className="rounded-full"
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === ""}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Messages;
