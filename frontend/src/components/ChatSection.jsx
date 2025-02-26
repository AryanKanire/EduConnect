import React from 'react';
import { Send, Clock } from 'lucide-react';

const ChatSection = () => {
  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      subject: 'Data Structures',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
      online: true,
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subject: 'Database Management',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
      online: false,
    },
  ];

  return (
    <div className="flex h-[600px]">
      {/* Teachers List */}
      <div className="w-1/3 border-r">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Teachers</h3>
          <div className="space-y-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      teacher.online ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{teacher.name}</p>
                  <p className="text-sm text-gray-500">{teacher.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Dr. Sarah Wilson</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {/* Chat messages would go here */}
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-lg p-3 max-w-md">
                <p>Hello Dr. Wilson, I had a question about today's lecture on binary trees.</p>
                <span className="text-xs text-blue-100 flex items-center justify-end mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  10:30 AM
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                <p>Of course! What would you like to know?</p>
                <span className="text-xs text-gray-500 flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  10:32 AM
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;