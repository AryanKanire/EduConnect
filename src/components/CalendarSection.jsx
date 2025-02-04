import React from 'react';
import { Calendar as CalendarIcon, Clock, Book, Users, Bell } from 'lucide-react';

const CalendarSection = () => {
  const events = [
    {
      id: 1,
      title: 'Data Structures Lecture',
      type: 'lecture',
      date: '2024-03-18',
      time: '10:00 AM',
      duration: '1h 30m',
      location: 'Room 301',
      instructor: 'Dr. Sarah Wilson',
    },
    {
      id: 2,
      title: 'Database Lab',
      type: 'lab',
      date: '2024-03-18',
      time: '2:00 PM',
      duration: '2h',
      location: 'Computer Lab 2',
      instructor: 'Prof. Michael Chen',
    },
    {
      id: 3,
      title: 'Assignment Submission Deadline',
      type: 'deadline',
      date: '2024-03-20',
      time: '11:59 PM',
      subject: 'Data Structures',
    },
  ];

  const getEventTypeStyles = (type) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lab':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'deadline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Academic Calendar</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Set Reminder
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        {/* Calendar Component would go here */}
        <div className="h-64 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Calendar Component</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className={`p-4 rounded-lg border ${getEventTypeStyles(event.type)}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {event.time} {event.duration && `(${event.duration})`}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-2">
                        <Book className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{event.location}</span>
                      </div>
                    )}
                    {event.instructor && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{event.instructor}</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm capitalize ${getEventTypeStyles(event.type)}`}>
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
