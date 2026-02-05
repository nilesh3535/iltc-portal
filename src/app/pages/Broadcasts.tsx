import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Plus, Send, Radio } from 'lucide-react';
import { mockGroups, mockBroadcasts } from '../utils/mockData';
import { toast } from 'sonner';

export function Broadcasts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [message, setMessage] = useState('');

  const handleSendBroadcast = () => {
    if (!selectedGroup || !message.trim()) {
      toast.error('Please select a group and enter a message');
      return;
    }
    toast.success('Broadcast sent successfully!');
    setIsModalOpen(false);
    setSelectedGroup('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800">Broadcast Messages</h3>
          <p className="text-sm text-gray-600 mt-1">
            Send announcements to all travellers in a group
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} className="mr-2" />
          New Broadcast
        </Button>
      </div>

      {/* Broadcast History */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">Broadcast History</h4>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBroadcasts.map((broadcast) => {
              const group = mockGroups.find((g) => g.id === broadcast.groupId);
              return (
                <div
                  key={broadcast.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Radio size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{group?.name}</p>
                        <p className="text-xs text-gray-500">
                          {broadcast.recipientCount} recipients
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{broadcast.sentAt}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{broadcast.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">Sent by {broadcast.sentBy}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Send size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">24</p>
                <p className="text-sm text-gray-600">Total Broadcasts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Radio size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">8</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Send size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">892</p>
                <p className="text-sm text-gray-600">Total Recipients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Broadcast Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Send Broadcast Message"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Select Tour Group</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a group...</option>
              {mockGroups
                .filter((g) => g.broadcastEnabled)
                .map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name} ({group.totalTravellers} travellers)
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Broadcast Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              This message will be sent to all travellers in the selected group
            </p>
          </div>

          {/* Preview */}
          {message && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 mb-2">Preview:</p>
              <div className="bg-white p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Radio size={16} className="text-blue-600" />
                  <span className="text-xs text-gray-600">Broadcast</span>
                </div>
                <p className="text-sm text-gray-800">{message}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendBroadcast}>
              <Send size={18} className="mr-2" />
              Send Broadcast
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
