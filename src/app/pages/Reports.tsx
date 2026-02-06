import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const reportsData = {
  toursCreated: [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 4 },
    { month: 'Mar', count: 6 },
    { month: 'Apr', count: 3 },
    { month: 'May', count: 7 },
    { month: 'Jun', count: 5 },
  ],
  travellersPerTour: [
    { tour: 'European Adventure', travellers: 24 },
    { tour: 'Asia Discovery', travellers: 18 },
    { tour: 'Mediterranean Cruise', travellers: 32 },
    { tour: 'African Safari', travellers: 15 },
  ],
  inviteStatus: {
    accepted: 189,
    pending: 42,
    declined: 17,
  },
  chatActivity: {
    totalMessages: 1456,
    groupChats: 982,
    privateChats: 474,
  },
};

export function Reports() {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-02-05');

  const handleExportPDF = () => {
    toast.success('Report exported as PDF');
  };

  const handleExportExcel = () => {
    toast.success('Report exported as Excel');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl text-gray-800">Reports & Analytics</h3>
        <p className="text-sm text-gray-600 mt-1">
          Comprehensive insights into your tour management operations
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">Date Range Filter</h4>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="flex items-end gap-2">
              <Button className="flex-1">Apply Filter</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleExportPDF} variant="secondary">
          <FileText size={18} className="mr-2" />
          Export as PDF
        </Button>
        <Button onClick={handleExportExcel} variant="secondary">
          <FileSpreadsheet size={18} className="mr-2" />
          Export as Excel
        </Button>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Tours</p>
            <p className="text-3xl text-gray-900">12</p>
            <p className="text-xs text-green-600 mt-2">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Travellers</p>
            <p className="text-3xl text-gray-900">248</p>
            <p className="text-xs text-green-600 mt-2">+42 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Invite Acceptance Rate</p>
            <p className="text-3xl text-gray-900">76%</p>
            <p className="text-xs text-gray-500 mt-2">189/248 accepted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Messages</p>
            <p className="text-3xl text-gray-900">1,456</p>
            <p className="text-xs text-gray-500 mt-2">67% group chats</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}


      {/* Invite Status */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">Invite Status Breakdown</h4>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-4xl text-green-600 mb-2">{reportsData.inviteStatus.accepted}</p>
              <p className="text-sm text-gray-700">Accepted</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <p className="text-4xl text-yellow-600 mb-2">{reportsData.inviteStatus.pending}</p>
              <p className="text-sm text-gray-700">Pending</p>
            </div>
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <p className="text-4xl text-red-600 mb-2">{reportsData.inviteStatus.declined}</p>
              <p className="text-sm text-gray-700">Declined</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Activity */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">Chat Activity Summary</h4>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Messages</span>
              <span className="text-xl text-gray-900">{reportsData.chatActivity.totalMessages}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Group Chat Messages</span>
              <span className="text-xl text-blue-600">{reportsData.chatActivity.groupChats}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Private Chat Messages</span>
              <span className="text-xl text-purple-600">{reportsData.chatActivity.privateChats}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
