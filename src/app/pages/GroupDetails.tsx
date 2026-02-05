import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Download,
  Upload,
  Copy,
  Share2,
  MessageSquare,
  FileText,
  Users,
  Settings,
  Send,
  Paperclip,
  Image as ImageIcon,
} from "lucide-react";
import {
  mockGroups,
  mockTravellers,
  mockMessages,
  mockDocuments,
} from "../utils/mockData";
import { Traveller } from "../types";
import { toast } from "sonner";

export function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "travellers" | "chat" | "documents" | "settings"
  >("travellers");
  // | "private-chats"
  const group = mockGroups.find((g) => g.id === id);
  const travellers = mockTravellers.filter((t) => t.groupId === id);
  const messages = mockMessages.filter((m) => m.groupId === id);
  const documents = mockDocuments.filter((d) => d.groupId === id);

  const [isAddTravellerOpen, setIsAddTravellerOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");
  const [selectedTraveller, setSelectedTraveller] = useState<string | null>(
    null,
  );
  const [travellerForm, setTravellerForm] = useState({ name: "", mobile: "" });

  if (!group) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Group not found</p>
        <Button onClick={() => navigate("/groups")} className="mt-4">
          Back to Groups
        </Button>
      </div>
    );
  }

  const inviteLink = `https://tourmanager.app/invite/${group.id}/${Date.now()}`;

  // Mock private chat messages
  const mockPrivateChatMessages = [
    {
      id: "1",
      senderId: "staff",
      content: "Hi! How can I help you today?",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      senderId: "traveller",
      content: "I have a question about the visa requirements.",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      senderId: "staff",
      content: "Sure! I've sent you the detailed visa guide document.",
      timestamp: "10:35 AM",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success("Message sent!");
      setNewMessage("");
    }
  };

  const handleSendPrivateMessage = () => {
    if (privateMessage.trim()) {
      toast.success("Private message sent!");
      setPrivateMessage("");
    }
  };

  const handleAddTraveller = () => {
    toast.success("Traveller added successfully");
    setIsAddTravellerOpen(false);
    setTravellerForm({ name: "", mobile: "" });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard!");
  };

  const handleShareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(inviteLink)}`,
      "_blank",
    );
  };

  const tabs = [
    { id: "travellers", label: "Travellers", icon: <Users size={18} /> },
    { id: "chat", label: "Group Chat", icon: <MessageSquare size={18} /> },

    { id: "documents", label: "Documents", icon: <FileText size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];
  //  {
  //     id: "private-chats",
  //     label: "Private Chats",
  //     icon: <MessageSquare size={18} />,
  //   },
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/groups")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h3 className="text-xl text-gray-800">{group.name}</h3>
          <p className="text-sm text-gray-600">{group.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <CardContent className="p-6">
          {/* Travellers Tab */}
          {activeTab === "travellers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg text-gray-800">Manage Travellers</h4>
                <Button onClick={() => setIsAddTravellerOpen(true)}>
                  <Plus size={18} className="mr-2" />
                  Add Traveller
                </Button>
              </div>

              {/* Invite Link Section */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Share invite link with travellers:
                  </p>
                  <div className="flex gap-2">
                    <Input value={inviteLink} readOnly className="flex-1" />
                    <Button onClick={handleCopyLink} variant="secondary">
                      <Copy size={18} />
                    </Button>
                    <Button onClick={handleShareWhatsApp} variant="secondary">
                      <Share2 size={18} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    This link is unique and expires in 7 days
                  </p>
                </CardContent>
              </Card>

              {/* Travellers Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">
                        Mobile
                      </th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">
                        Invite Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {travellers.map((traveller) => (
                      <tr key={traveller.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {traveller.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {traveller.mobile}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              traveller.inviteStatus === "accepted"
                                ? "bg-green-100 text-green-700"
                                : traveller.inviteStatus === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {traveller.inviteStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Group Chat Tab */}
          {activeTab === "chat" && (
            <div className="space-y-4">
              <h4 className="text-lg text-gray-800">Group Chat</h4>

              {/* Chat Messages */}
              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderRole === "staff" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.senderRole === "staff"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <p className="text-xs mb-1 opacity-75">
                        {msg.senderName}
                      </p>
                      <p className="text-sm">{msg.content}</p>
                      {msg.fileName && (
                        <div className="mt-2 text-xs opacity-75">
                          📎 {msg.fileName}
                        </div>
                      )}
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsUploadDocOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Paperclip size={20} />
                  </button>
                  <button
                    onClick={() => setIsUploadDocOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <button
                    onClick={() => setIsUploadDocOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <FileText size={20} />
                  </button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Private Chats Tab */}
          {activeTab === "private-chats" && (
            <div className="grid grid-cols-3 gap-4 h-[500px]">
              {/* Travellers List */}
              <div className="border-r pr-4 overflow-y-auto">
                <h4 className="text-sm text-gray-700 mb-4 font-semibold">
                  Travellers
                </h4>
                <div className="space-y-2">
                  {travellers.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTraveller(t.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedTraveller === t.id
                          ? "bg-blue-50 border-l-4 border-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                          {t.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {t.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {t.mobile}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="col-span-2 flex flex-col h-full">
                {selectedTraveller ? (
                  <>
                    {/* Chat Header */}
                    <div className="pb-4 border-b border-gray-200 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        {travellers
                          .find((t) => t.id === selectedTraveller)
                          ?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {
                            travellers.find((t) => t.id === selectedTraveller)
                              ?.name
                          }
                        </p>
                        <p className="text-xs text-gray-500">Private Chat</p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto py-4 bg-gray-50 rounded-lg my-4 px-4 space-y-4">
                      {mockPrivateChatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.senderId === "staff"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              msg.senderId === "staff"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-800 shadow-sm"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs mt-1 opacity-75">
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Paperclip size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <ImageIcon size={18} />
                        </button>
                        <Input
                          placeholder="Type a message..."
                          value={privateMessage}
                          onChange={(e) => setPrivateMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendPrivateMessage()
                          }
                          className="flex-1"
                        />
                        <Button onClick={handleSendPrivateMessage}>
                          <Send size={18} />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <MessageSquare
                        size={48}
                        className="mx-auto mb-3 text-gray-400"
                      />
                      <p className="text-lg mb-2">
                        Select a traveller to start chatting
                      </p>
                      <p className="text-sm">
                        Choose from the list on the left
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg text-gray-800">Documents</h4>
                {/* <Button onClick={() => setIsUploadDocOpen(true)}>
                  <Upload size={18} className="mr-2" />
                  Upload Document
                </Button> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <Card
                    key={doc.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">{doc.size}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Download size={16} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h4 className="text-lg text-gray-800">Group Settings</h4>

              <div className="space-y-4">
                <Input label="Group Name" value={group.name} />
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={group.description}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={group.startDate}
                  />
                  <Input label="End Date" type="date" value={group.endDate} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Traveller Modal */}
      <Modal
        isOpen={isAddTravellerOpen}
        onClose={() => setIsAddTravellerOpen(false)}
        title="Add Traveller"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={travellerForm.name}
            onChange={(e) =>
              setTravellerForm({ ...travellerForm, name: e.target.value })
            }
            placeholder="Enter traveller name"
          />
          <Input
            label="Mobile Number"
            value={travellerForm.mobile}
            onChange={(e) =>
              setTravellerForm({ ...travellerForm, mobile: e.target.value })
            }
            placeholder="Enter mobile number"
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsAddTravellerOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddTraveller}>Add Traveller</Button>
          </div>
        </div>
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        isOpen={isUploadDocOpen}
        onClose={() => setIsUploadDocOpen(false)}
        title="Upload Document"
        size="md"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload size={40} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              Drag and drop files here or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports: PDF, Word, Excel, Images
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsUploadDocOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success("Document uploaded successfully");
                setIsUploadDocOpen(false);
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
