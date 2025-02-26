import React, { useState } from 'react';
import { BookOpen, MessageCircle, Building2, ClipboardList, CheckSquare, Calendar, User } from 'lucide-react';
import Navbar from './components/Navbar';
import NotesSection from './components/NotesSection';
import ChatSection from './components/ChatSection';
import PlacementSection from './components/PlacementSection';
import ProfileSection from './components/ProfileSection';
import AttendanceSection from './components/AttendanceSection';
import AssignmentSection from './components/AssignmentSection';
import CalendarSection from './components/CalendarSection';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('notes');
  const [userType, setUserType] = useState('student'); // ✅ Fix applied

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType={userType} onUserTypeChange={setUserType} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {userType === 'admin' ? (
          <AdminDashboard />
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'notes' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Notes
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'chat' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('placement')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'placement' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Placement
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ClipboardList className="w-5 h-5 mr-2" />
                Attendance
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'assignments' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CheckSquare className="w-5 h-5 mr-2" />
                Assignments
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Calendar
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Profile
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'notes' && <NotesSection userType={userType} />}
              {activeTab === 'chat' && <ChatSection />}
              {activeTab === 'placement' && <PlacementSection />}
              {activeTab === 'attendance' && <AttendanceSection userType={userType} />}
              {activeTab === 'assignments' && <AssignmentSection userType={userType} />}
              {activeTab === 'calendar' && <CalendarSection />}
              {activeTab === 'profile' && <ProfileSection userType={userType} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
