import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Users, Calendar, MessageSquare, UserPlus } from 'lucide-react';
import { mockGroups } from '../utils/mockData';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl text-gray-900 mb-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StaffDashboard() {
  const activeTours = mockGroups.filter((g) => g.status === 'active').length;
  const upcomingTours = mockGroups.filter((g) => g.status === 'upcoming').length;
  const totalTravellers = mockGroups.reduce((sum, g) => sum + g.totalTravellers, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 text-white">
        <h3 className="text-2xl mb-2">Welcome back!</h3>
        <p className="text-blue-100">Here's an overview of your tours and activities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Active Tours"
          value={activeTours}
          icon={<Users size={24} className="text-white" />}
          color="bg-blue-500"
          subtitle="Currently ongoing"
        />
        <StatCard
          title="Upcoming Tours"
          value={upcomingTours}
          icon={<Calendar size={24} className="text-white" />}
          color="bg-teal-500"
          subtitle="Starting soon"
        />
        <StatCard
          title="Total Travellers"
          value={totalTravellers}
          icon={<Users size={24} className="text-white" />}
          color="bg-purple-500"
          subtitle="Across all tours"
        />
        <StatCard
          title="Messages Today"
          value={47}
          icon={<MessageSquare size={24} className="text-white" />}
          color="bg-orange-500"
          subtitle="Unread: 8"
        />
      </div>

      {/* Active Tours */}
      <Card>
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg text-gray-800">Active Tours</h4>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            {mockGroups
              .filter((g) => g.status === 'active')
              .map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h5 className="text-gray-900 mb-1">{group.name}</h5>
                    <p className="text-sm text-gray-600">{group.description}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-500">
                        {group.startDate} - {group.endDate}
                      </span>
                      <span className="text-xs text-gray-500">
                        {group.totalTravellers} travellers
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tours */}
      <Card>
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg text-gray-800">Upcoming Tours</h4>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            {mockGroups
              .filter((g) => g.status === 'upcoming')
              .map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h5 className="text-gray-900 mb-1">{group.name}</h5>
                    <p className="text-sm text-gray-600">{group.description}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-500">
                        Starts: {group.startDate}
                      </span>
                      <span className="text-xs text-gray-500">
                        {group.totalTravellers} travellers
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      Upcoming
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invites */}
      <Card>
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg text-gray-800">Pending Invites</h4>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-gray-600">
            <UserPlus size={40} />
            <div>
              <p className="text-2xl text-gray-900">3</p>
              <p className="text-sm">Travellers haven't accepted yet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
