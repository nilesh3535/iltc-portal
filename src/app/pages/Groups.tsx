import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Toggle } from "../components/ui/Toggle";
import {
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  Users,
  Calendar,
} from "lucide-react";
import { mockGroups } from "../utils/mockData";
import { TourGroup } from "../types";
import { toast } from "sonner";

export function Groups() {
  const navigate = useNavigate();
  const [groupsList, setGroupsList] = useState<TourGroup[]>(mockGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<TourGroup | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    chatEnabled: true,
    broadcastEnabled: true,
  });

  const handleAddGroup = () => {
    setEditingGroup(null);
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      chatEnabled: true,
      broadcastEnabled: true,
    });
    setIsModalOpen(true);
  };

  const handleEditGroup = (group: TourGroup) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      description: group.description,
      startDate: group.startDate,
      endDate: group.endDate,
      chatEnabled: group.chatEnabled,
      broadcastEnabled: group.broadcastEnabled,
    });
    setIsModalOpen(true);
  };

  const handleSaveGroup = () => {
    if (editingGroup) {
      setGroupsList(
        groupsList.map((g) =>
          g.id === editingGroup.id ? { ...g, ...formData } : g,
        ),
      );
      toast.success("Group updated successfully");
    } else {
      const newGroup: TourGroup = {
        id: String(Date.now()),
        ...formData,
        totalTravellers: 0,
        status: "upcoming",
      };
      setGroupsList([...groupsList, newGroup]);
      toast.success("Group created successfully");
    }
    setIsModalOpen(false);
  };

  const handleDeleteGroup = (id: string) => {
    setGroupsList(groupsList.filter((g) => g.id !== id));
    setShowDeleteConfirm(null);
    toast.success("Group deleted successfully");
  };

  const handleToggleChat = (id: string, enabled: boolean) => {
    setGroupsList(
      groupsList.map((g) => (g.id === id ? { ...g, chatEnabled: enabled } : g)),
    );
    toast.success(`Chat ${enabled ? "enabled" : "disabled"}`);
  };

  const filteredGroups = groupsList.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800">Tour Groups</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage all your tour groups and their settings
          </p>
        </div>
        <Button onClick={handleAddGroup}>
          <Plus size={18} className="mr-2" />
          Create Group
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg text-gray-900 mb-1">{group.name}</h4>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${getStatusColor(group.status)}`}
                >
                  {group.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>
                    {group.startDate} - {group.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>{group.totalTravellers} Travellers</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Toggle
                  enabled={group.chatEnabled}
                  onChange={(enabled) => handleToggleChat(group.id, enabled)}
                  label="Chat"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/groups/${group.id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEditGroup(group)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(group.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingGroup ? "Edit Group" : "Create New Group"}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Group Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., European Adventure 2026"
            required
          />
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the tour..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
            />
            <Input
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-3">
            <Toggle
              enabled={formData.chatEnabled}
              onChange={(enabled) =>
                setFormData({ ...formData, chatEnabled: enabled })
              }
              label="Enable Group Chat"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveGroup}>
              {editingGroup ? "Update" : "Create"} Group
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Modal
          isOpen={true}
          onClose={() => setShowDeleteConfirm(null)}
          title="Delete Group"
          size="sm"
        >
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this group? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteGroup(showDeleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
