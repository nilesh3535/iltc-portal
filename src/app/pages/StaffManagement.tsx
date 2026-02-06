import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Toggle } from "../components/ui/Toggle";
import { Edit2, Trash2, Plus, Search, EyeOff, Eye } from "lucide-react";
import { mockStaff } from "../utils/mockData";
import { Staff } from "../types";
import { toast } from "sonner";

export function StaffManagement() {
  const [staffList, setStaffList] = useState<Staff[]>(mockStaff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "staff" as "staff" | "super_admin",
    status: "active" as "active" | "inactive",
  });

  const handleAddStaff = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      password: "",
      role: "staff",
      status: "active",
    });
    setIsModalOpen(true);
  };

  const handleEditStaff = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      mobile: staff.mobile,
      email: staff.email,
      password: staff.password,
      role: staff.role,
      status: staff.status,
    });
    setIsModalOpen(true);
  };

  const handleSaveStaff = () => {
    if (editingStaff) {
      setStaffList(
        staffList.map((s) =>
          s.id === editingStaff.id ? { ...s, ...formData } : s,
        ),
      );
      toast.success("Staff updated successfully");
    } else {
      const newStaff: Staff = {
        id: String(Date.now()),
        ...formData,
        permissions: [],
      };
      setStaffList([...staffList, newStaff]);
      toast.success("Staff added successfully");
    }
    setIsModalOpen(false);
  };

  const handleDeleteStaff = (id: string) => {
    setStaffList(staffList.filter((s) => s.id !== id));
    setShowDeleteConfirm(null);
    toast.success("Staff deleted successfully");
  };

  const handleToggleStatus = (id: string, status: "active" | "inactive") => {
    setStaffList(staffList.map((s) => (s.id === id ? { ...s, status } : s)));
    toast.success(`Staff ${status === "active" ? "activated" : "deactivated"}`);
  };

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.mobile.includes(searchTerm),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800">Staff Management</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage your team members and their permissions
          </p>
        </div>
        <Button onClick={handleAddStaff}>
          <Plus size={18} className="mr-2" />
          Add Staff
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          placeholder="Search by name, email, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Staff Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">
                    Mobile
                  </th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {staff.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {staff.mobile}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {staff.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {staff.role === "super_admin" ? "Super Admin" : "Staff"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Toggle
                        enabled={staff.status === "active"}
                        onChange={(enabled) =>
                          handleToggleStatus(
                            staff.id,
                            enabled ? "active" : "inactive",
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditStaff(staff)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(staff.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStaff ? "Edit Staff" : "Add New Staff"}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter staff name"
            required
          />
          <Input
            label="Mobile"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            placeholder="Enter mobile number"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter email address"
            required
          />
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Set password"
              required
              aria-label="Toggle password visibility"
              className="pr-10 transition-colors"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as any })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="staff">Staff</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStaff}>
              {editingStaff ? "Update" : "Add"} Staff
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Modal
          isOpen={true}
          onClose={() => setShowDeleteConfirm(null)}
          title="Delete Staff"
          size="sm"
        >
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this staff member? This action
            cannot be undone.
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
              onClick={() => handleDeleteStaff(showDeleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
