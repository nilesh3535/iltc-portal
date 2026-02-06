import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Search, Send, Paperclip, Image, FileText, Upload } from "lucide-react";
import { mockGroups } from "../utils/mockData";
import { Modal } from "../components/ui/Modal";
import { toast } from "sonner";
export function GroupChats() {
  const [selectedTraveller, setSelectedTraveller] = useState<string | null>(
    null,
  );
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTravellers = mockGroups.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const mockChatMessages = [
    {
      id: "1",
      senderId: "staff",
      content: "Hi Sourav! How can I help you today?",
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
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl text-gray-800">Group Chats</h3>
        <p className="text-sm text-gray-600 mt-1"></p>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Travellers List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search group..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Travellers */}
            <div className="flex-1 overflow-y-auto">
              {filteredTravellers.map((traveller) => (
                <button
                  key={traveller.id}
                  onClick={() => setSelectedTraveller(traveller.id)}
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedTraveller === traveller.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {traveller.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {traveller.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Total travellers: {traveller.totalTravellers}
                      </p>
                    </div>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          <CardContent className="p-0 h-full flex flex-col">
            {selectedTraveller ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {mockGroups
                      .find((t) => t.id === selectedTraveller)
                      ?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      {mockGroups.find((t) => t.id === selectedTraveller)?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {" "}
                      {
                        mockGroups.find((t) => t.id === selectedTraveller)
                          ?.totalTravellers
                      }{" "}
                      peoples
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                  {mockChatMessages.map((msg) => (
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
                            : "bg-white text-gray-800"
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
                      <Image size={20} />
                    </button>
                    <button
                      onClick={() => setIsUploadDocOpen(true)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <FileText size={20} />
                    </button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-2">
                    Select a traveller to start chatting
                  </p>
                  <p className="text-sm">Choose from the list on the left</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
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
