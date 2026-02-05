import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Plus, Search, Download, Trash2, FileText, File, FileSpreadsheet, Image as ImageIcon, Upload } from 'lucide-react';
import { mockDocuments, mockGroups } from '../utils/mockData';
import { toast } from 'sonner';

export function Documents() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-600" size={40} />;
      case 'docx':
      case 'doc':
        return <File className="text-blue-600" size={40} />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="text-green-600" size={40} />;
      case 'jpg':
      case 'png':
        return <ImageIcon className="text-purple-600" size={40} />;
      default:
        return <File className="text-gray-600" size={40} />;
    }
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || doc.groupId === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleUpload = () => {
    toast.success('Document uploaded successfully');
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800">Documents</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage and organize all tour documents
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Plus size={18} className="mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Groups</option>
            {mockGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Documents</p>
            <p className="text-2xl text-gray-900 mt-1">{mockDocuments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">PDFs</p>
            <p className="text-2xl text-gray-900 mt-1">
              {mockDocuments.filter((d) => d.type === 'pdf').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Documents</p>
            <p className="text-2xl text-gray-900 mt-1">
              {mockDocuments.filter((d) => d.type === 'docx').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Spreadsheets</p>
            <p className="text-2xl text-gray-900 mt-1">
              {mockDocuments.filter((d) => d.type === 'xlsx').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => {
          const group = mockGroups.find((g) => g.id === doc.groupId);
          return (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  {getFileIcon(doc.type)}
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h4 className="text-sm text-gray-900 mb-2 truncate">{doc.name}</h4>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Size: {doc.size}</p>
                  <p className="text-xs text-gray-500">Group: {group?.name}</p>
                  <p className="text-xs text-gray-500">Uploaded by {doc.uploadedBy}</p>
                  <p className="text-xs text-gray-500">On {doc.uploadedAt}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No documents found</p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or upload a new document
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Document"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Select Tour Group</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {mockGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <Upload size={40} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              Drag and drop files here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supports: PDF, Word, Excel, Images (Max 10MB)
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>Upload</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
