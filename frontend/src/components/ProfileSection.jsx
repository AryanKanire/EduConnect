import React from 'react';
import { Mail, Phone, Book, GraduationCap, Building, Calendar } from 'lucide-react';

const ProfileSection = ({ userType }) => {
  const studentProfile = {
    name: 'Alex Johnson',
    email: 'alex.j@university.edu',
    phone: '+1 234-567-8900',
    rollNumber: 'CS2024001',
    semester: '6th',
    branch: 'Computer Science',
    cgpa: '8.9',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    enrolledCourses: ['Data Structures', 'Database Management', 'Computer Networks'],
  };

  const teacherProfile = {
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    phone: '+1 234-567-8901',
    department: 'Computer Science',
    designation: 'Associate Professor',
    specialization: 'Data Structures & Algorithms',
    experience: '8 years',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    courses: ['Advanced Data Structures', 'Algorithm Design', 'Programming Fundamentals'],
  };

  const profile = userType === 'student' ? studentProfile : teacherProfile;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start space-x-6">
          <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-lg object-cover" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-blue-600">{userType === 'student' ? 'Student' : profile.designation}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Edit Profile</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">{profile.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {userType === 'student' ? 'Academic Information' : 'Professional Information'}
            </h2>
            <div className="space-y-4">
              {userType === 'student' ? (
                <>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Roll Number: {studentProfile.rollNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Semester: {studentProfile.semester}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Branch: {studentProfile.branch}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Book className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">CGPA: {studentProfile.cgpa}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Department: {teacherProfile.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Book className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Specialization: {teacherProfile.specialization}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Experience: {teacherProfile.experience}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {userType === 'student' ? 'Enrolled Courses' : 'Teaching Courses'}
            </h2>
            <div className="space-y-3">
              {(userType === 'student' ? studentProfile.enrolledCourses : teacherProfile.courses).map((course, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                  <Book className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
