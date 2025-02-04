import React from 'react';
import { FileText, Download, Share2, Upload, Plus } from 'lucide-react';

const NotesSection = ({ userType }) => {
  const subjects = [
    {
      id: 1,
      name: 'Data Structures',
      notes: [
        { id: 1, title: 'Arrays and Linked Lists', date: '2024-03-10', size: '2.4 MB', uploadedBy: 'Dr. Sarah Wilson' },
        { id: 2, title: 'Trees and Graphs', date: '2024-03-08', size: '1.8 MB', uploadedBy: 'Dr. Sarah Wilson' },
      ],
    },
    {
      id: 2,
      name: 'Database Management',
      notes: [
        { id: 3, title: 'SQL Fundamentals', date: '2024-03-07', size: '3.1 MB', uploadedBy: 'Prof. Michael Chen' },
        { id: 4, title: 'Normalization', date: '2024-03-05', size: '1.5 MB', uploadedBy: 'Prof. Michael Chen' },
      ],
    },
  ];

  const handleUpload = () => {
    // Handle file upload logic
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course Notes</h2>
        {userType === 'teacher' && (
          <div className="flex space-x-3">
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Notes
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create Folder
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject.id} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{subject.name}</h3>
            <div className="space-y-3">
              {subject.notes.map((note) => (
                <div key={note.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-800">{note.title}</p>
                      <p className="text-sm text-gray-500">
                        Added {note.date} • {note.size} • Uploaded by {note.uploadedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-200 rounded-full">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-full">
                      <Download className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSection;
