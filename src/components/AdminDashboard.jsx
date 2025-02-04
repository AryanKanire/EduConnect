import React, { useState } from 'react';
import { Users, Calendar, ClipboardList, Building2, Settings, Plus, Edit, Trash2, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('students');

  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      rollNumber: 'CS2024001',
      branch: 'Computer Science',
      semester: '6th',
      email: 'alex.j@university.edu',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      rollNumber: 'CS2024002',
      branch: 'Computer Science',
      semester: '6th',
      email: 'sarah.w@university.edu',
    },
  ];

  const placements = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      role: 'Software Engineer',
      date: '2024-03-20',
      package: '12-15 LPA',
      status: 'Upcoming',
    },
    {
      id: 2,
      company: 'DataSys Inc',
      role: 'Data Analyst',
      date: '2024-03-25',
      package: '8-10 LPA',
      status: 'Upcoming',
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Mid-term Examinations',
      startDate: '2024-04-10',
      endDate: '2024-04-20',
      type: 'exam',
    },
    {
      id: 2,
      title: 'Technical Symposium',
      startDate: '2024-03-30',
      endDate: '2024-03-31',
      type: 'event',
    },
  ];

  const renderStudentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Branch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semester
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {student.rollNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {student.branch}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {student.semester}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPlacementManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Placement Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Placement Drive
        </button>
      </div>

      <div className="grid gap-6">
        {placements.map((placement) => (
          <div
            key={placement.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {placement.company}
                </h3>
                <p className="text-blue-600">{placement.role}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600">Package: {placement.package}</p>
                  <p className="text-gray-600">Date: {placement.date}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendarManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Academic Calendar Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600">
                    From: {event.startDate} To: {event.endDate}
                  </p>
                  <p className="text-blue-600 capitalize">{event.type}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm rounded-lg p-4 mr-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Admin Dashboard</h2>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('students')}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'students'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Students
          </button>
          <button
            onClick={() => setActiveSection('placements')}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'placements'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Building2 className="w-5 h-5 mr-3" />
            Placements
          </button>
          <button
            onClick={() => setActiveSection('calendar')}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'calendar'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Calendar
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeSection === 'students' && renderStudentManagement()}
        {activeSection === 'placements' && renderPlacementManagement()}
        {activeSection === 'calendar' && renderCalendarManagement()}
      </div>
    </div>
  );
};

export default AdminDashboard;