import React from 'react';
import { Calendar, CheckCircle, XCircle, BarChart } from 'lucide-react';

const AttendanceSection = ({ userType }) => {
  const attendanceData = {
    totalClasses: 45,
    attendedClasses: 38,
    percentage: 84.4,
    recentAttendance: [
      { date: '2024-03-15', status: 'present', subject: 'Data Structures' },
      { date: '2024-03-14', status: 'present', subject: 'Database Management' },
      { date: '2024-03-13', status: 'absent', subject: 'Computer Networks' },
      { date: '2024-03-12', status: 'present', subject: 'Data Structures' },
    ],
  };

  const subjects = [
    { name: 'Data Structures', attended: 15, total: 18 },
    { name: 'Database Management', attended: 12, total: 14 },
    { name: 'Computer Networks', attended: 11, total: 13 },
  ];

  return (
    <div className="space-y-6">
      {/* Attendance Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Classes</h3>
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{attendanceData.totalClasses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Classes Attended</h3>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{attendanceData.attendedClasses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Attendance %</h3>
            <BarChart className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{attendanceData.percentage}%</p>
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject-wise Attendance</h3>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{subject.name}</span>
                <span className="text-sm text-gray-600">
                  {subject.attended}/{subject.total} ({((subject.attended / subject.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(subject.attended / subject.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attendance */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Attendance</h3>
        <div className="space-y-3">
          {attendanceData.recentAttendance.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {record.status === 'present' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <p className="font-medium text-gray-800">{record.subject}</p>
                  <p className="text-sm text-gray-500">{record.date}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;
