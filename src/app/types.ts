// Type definitions for the Tour Management System

export type UserRole = "super_admin" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  permissions: Permission[];
}

export interface Permission {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface Staff {
  id: string;
  name: string;
  mobile: string;
  email: string;
  password: string;
  role: UserRole;
  status: "active" | "inactive";
  permissions: Permission[];
}

export interface TourGroup {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  totalTravellers: number;
  chatEnabled: boolean;
  broadcastEnabled: boolean;
  status: "active" | "completed" | "upcoming";
  assignedStaff?: string[];
}

export interface Traveller {
  id: string;
  name: string;
  mobile: string;
  groupId: string;
  inviteStatus: "pending" | "accepted" | "declined";
  joinedAt?: string;
}

export interface Message {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  senderRole: "staff" | "traveller";
  content: string;
  type: "text" | "image" | "document";
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
  isPrivate?: boolean;
  receiverId?: string;
}

export interface Document {
  id: string;
  groupId: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

export interface DashboardMetrics {
  totalGroups: number;
  totalTravellers: number;
  toursInProgress: number;
  completedTours: number;
  totalMessages: number;
  documentsUploaded: number;
}

export interface Broadcast {
  id: string;
  groupId: string;
  message: string;
  sentBy: string;
  sentAt: string;
  recipientCount: number;
}
