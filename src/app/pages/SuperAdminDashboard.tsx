import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Users, TrendingUp, CheckCircle, MessageSquare, FileText, Plane } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockDashboardMetrics, toursOverTimeData, messageActivityData, tourStatusData } from '../utils/mockData';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, icon, color }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl text-gray-900">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SuperAdminDashboard() {
  const [dateFilter, setDateFilter] = useState('monthly');

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800">Overview</h3>
          <p className="text-sm text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDateFilter('monthly')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              dateFilter === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setDateFilter('yearly')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              dateFilter === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setDateFilter('custom')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              dateFilter === 'custom'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Custom Range
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Tour Groups"
          value={mockDashboardMetrics.totalGroups}
          icon={<Users size={24} className="text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Total Travellers"
          value={mockDashboardMetrics.totalTravellers}
          icon={<Users size={24} className="text-white" />}
          color="bg-teal-500"
        />
        <MetricCard
          title="Tours In Progress"
          value={mockDashboardMetrics.toursInProgress}
          icon={<Plane size={24} className="text-white" />}
          color="bg-orange-500"
        />
        <MetricCard
          title="Completed Tours"
          value={mockDashboardMetrics.completedTours}
          icon={<CheckCircle size={24} className="text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Total Messages"
          value={mockDashboardMetrics.totalMessages}
          icon={<MessageSquare size={24} className="text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Documents Uploaded"
          value={mockDashboardMetrics.documentsUploaded}
          icon={<FileText size={24} className="text-white" />}
          color="bg-pink-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tours Over Time */}
        <Card>
          <CardHeader>
            <h4 className="text-lg text-gray-800">Tours Over Time</h4>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={toursOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tours" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Message Activity */}
        <Card>
          <CardHeader>
            <h4 className="text-lg text-gray-800">Message & Broadcast Activity</h4>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={messageActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="messages" fill="#3b82f6" />
                <Bar dataKey="broadcasts" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tour Status Pie Chart */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">Tour Status Distribution</h4>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tourStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {tourStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
