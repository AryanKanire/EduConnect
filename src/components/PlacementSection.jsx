import React from 'react';
import { Building2, Users, TrendingUp, Calendar } from 'lucide-react';

const PlacementSection = () => {
  const upcomingDrives = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      role: 'Software Engineer',
      date: '2024-03-20',
      package: '12-15 LPA',
      requirements: 'B.Tech/BE in CS/IT, 7.5+ CGPA',
      logo: 'https://images.unsplash.com/photo-1496200186974-4293800e2c20?auto=format&fit=crop&q=80&w=100&h=100',
    },
    {
      id: 2,
      company: 'DataSys Inc',
      role: 'Data Analyst',
      date: '2024-03-25',
      package: '8-10 LPA',
      requirements: 'B.Tech in CS/IT/Analytics, 7.0+ CGPA',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=100&h=100',
    },
  ];

  const stats = [
    { id: 1, title: 'Companies Visited', value: '45+', icon: Building2 },
    { id: 2, title: 'Students Placed', value: '250+', icon: Users },
    { id: 3, title: 'Highest Package', value: '45 LPA', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-lg border border-gray-200 text-center"
            >
              <div className="flex justify-center mb-4">
                <Icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Upcoming Drives */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Placement Drives</h2>
        <div className="space-y-4">
          {upcomingDrives.map((drive) => (
            <div
              key={drive.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={drive.logo}
                  alt={drive.company}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {drive.company}
                      </h3>
                      <p className="text-blue-600 font-medium">{drive.role}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Apply Now
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">{drive.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">{drive.package}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">
                    <span className="font-medium">Requirements:</span> {drive.requirements}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementSection;