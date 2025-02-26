import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = ({ userType, onUserTypeChange }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">EduConnect</h1>
          </div>

          <div className="flex-1 max-w-xl px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for notes, teachers..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Temporary user type toggle - In a real app, this would be handled by authentication */}
            <select
              value={userType}
              onChange={(e) => onUserTypeChange(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
