import React from 'react';
import { Calendar, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const AssignmentSection = ({ userType }) => {
  const assignments = [
    {
      id: 1,
      title: 'Binary Tree Implementation',
      subject: 'Data Structures',
      dueDate: '2024-03-20',
      status: 'pending',
      description: 'Implement a binary tree with insertion, deletion, and traversal operations.',
      submissionCount: 25,
      totalStudents: 40,
    },
    {
      id: 2,
      title: 'Database Normalization',
      subject: 'Database Management',
      dueDate: '2024-03-22',
      status: 'submitted',
      description: 'Convert the given schema into 3NF and provide justification.',
      submissionCount: 35,
      totalStudents: 40,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Action Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
        {userType === 'teacher' && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Create Assignment
          </button>
        )}
      </div>

      {/* Assignment Cards */}
      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                <p className="text-blue-600">{assignment.subject}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  assignment.status === 'submitted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </span>
            </div>

            <p className="mt-3 text-gray-600">{assignment.description}</p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Due: {assignment.dueDate}</span>
              </div>
              {userType === 'teacher' && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    Submissions: {assignment.submissionCount}/{assignment.totalStudents}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 flex space-x-3">
              {userType === 'student' ? (
                <>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    {assignment.status === 'submitted' ? 'View Submission' : 'Submit Assignment'}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    View Details
                  </button>
                </>
              ) : (
                <>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Review Submissions
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Send Reminder
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentSection;
