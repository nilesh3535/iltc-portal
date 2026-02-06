import {
  TourGroup,
  Traveller,
  Message,
  Document,
  Staff,
  DashboardMetrics,
  Broadcast,
} from "../types";

export const mockStaff: Staff[] = [
  {
    id: "1",
    name: "Mr. Talwinder",
    mobile: "+1234567890",
    email: "talwinder@tourmanager.com",
    role: "staff",
    status: "active",
    permissions: [],
  },
  {
    id: "2",
    name: "Ms. Ankita",
    mobile: "+1234567891",
    email: "ankita@tourmanager.com",
    role: "staff",
    status: "active",
    permissions: [],
  },
  {
    id: "3",
    name: "Nitesh Ayyar",
    mobile: "+1234567892",
    email: "nitesh@tourmanager.com",
    role: "staff",
    status: "inactive",
    permissions: [],
  },
];

export const mockGroups: TourGroup[] = [
  {
    id: "1",
    name: "European Adventure 2026",
    description: "Explore the best of Europe - Paris, Rome, Barcelona",
    startDate: "2026-03-15",
    endDate: "2026-03-25",
    totalTravellers: 24,
    chatEnabled: true,
    broadcastEnabled: true,
    status: "active",
    assignedStaff: ["1", "2"],
  },
  {
    id: "2",
    name: "Asia Discovery Tour",
    description: "Journey through Thailand, Vietnam, and Cambodia",
    startDate: "2026-04-01",
    endDate: "2026-04-14",
    totalTravellers: 18,
    chatEnabled: false,
    broadcastEnabled: true,
    status: "upcoming",
    assignedStaff: ["1"],
  },
  {
    id: "3",
    name: "Mediterranean Cruise",
    description: "Luxury cruise along the Mediterranean coast",
    startDate: "2026-01-10",
    endDate: "2026-01-20",
    totalTravellers: 32,
    chatEnabled: false,
    broadcastEnabled: true,
    status: "completed",
    assignedStaff: ["2"],
  },
  {
    id: "4",
    name: "African Safari Experience",
    description: "Wildlife safari in Kenya and Tanzania",
    startDate: "2026-05-05",
    endDate: "2026-05-15",
    totalTravellers: 15,
    chatEnabled: false,
    broadcastEnabled: true,
    status: "upcoming",
    assignedStaff: ["1", "2"],
  },
];

export const mockTravellers: Traveller[] = [
  {
    id: "1",
    name: "Sourav Kumar",
    mobile: "+1234567001",
    groupId: "1",
    inviteStatus: "accepted",
    joinedAt: "2026-02-10",
  },
  {
    id: "2",
    name: "Mrs. Sangita",
    mobile: "+1234567002",
    groupId: "1",
    inviteStatus: "accepted",
    joinedAt: "2026-02-11",
  },
  {
    id: "3",
    name: "Ramesh Kumar",
    mobile: "+1234567003",
    groupId: "1",
    inviteStatus: "pending",
  },
  {
    id: "4",
    name: "Riya Beniwal",
    mobile: "+1234567004",
    groupId: "2",
    inviteStatus: "accepted",
    joinedAt: "2026-02-15",
  },
  {
    id: "5",
    name: "Tanmay Beniwal",
    mobile: "+1234567005",
    groupId: "2",
    inviteStatus: "accepted",
    joinedAt: "2026-02-16",
  },
];

export const mockMessages: Message[] = [
  {
    id: "1",
    groupId: "1",
    senderId: "1",
    senderName: "Mr. Talwinder (Tour Guide)",
    senderRole: "staff",
    content: "Welcome everyone to European Adventure 2026! 🎉",
    type: "text",
    timestamp: "2026-02-05T10:00:00Z",
  },
  {
    id: "2",
    groupId: "1",
    senderId: "1",
    senderName: "Sourav Kumar",
    senderRole: "traveller",
    content: "Thank you! So excited for this trip!",
    type: "text",
    timestamp: "2026-02-05T10:05:00Z",
  },
  {
    id: "3",
    groupId: "1",
    senderId: "2",
    senderName: "Mrs. Sangita",
    senderRole: "traveller",
    content: "Can't wait to see Paris!",
    type: "text",
    timestamp: "2026-02-05T10:10:00Z",
  },
  {
    id: "4",
    groupId: "1",
    senderId: "1",
    senderName: "Mr. Talwinder (Tour Guide)",
    senderRole: "staff",
    content: "Please find the detailed itinerary attached.",
    type: "document",
    fileName: "Itinerary.pdf",
    fileUrl: "#",
    timestamp: "2026-02-05T11:00:00Z",
  },
];

export const mockDocuments: Document[] = [
  {
    id: "1",
    groupId: "1",
    name: "Tour Itinerary.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Mr. Talwinder",
    uploadedAt: "2026-02-05",
    url: "#",
  },
  {
    id: "2",
    groupId: "1",
    name: "Visa Requirements.docx",
    type: "docx",
    size: "1.1 MB",
    uploadedBy: "Mr. Talwinder",
    uploadedAt: "2026-02-06",
    url: "#",
  },
  {
    id: "3",
    groupId: "1",
    name: "Hotel Bookings.xlsx",
    type: "xlsx",
    size: "856 KB",
    uploadedBy: "Mr. Talwinder",
    uploadedAt: "2026-02-07",
    url: "#",
  },
  {
    id: "4",
    groupId: "1",
    name: "Emergency Contacts.pdf",
    type: "pdf",
    size: "524 KB",
    uploadedBy: "Mr. Talwinder",
    uploadedAt: "2026-02-08",
    url: "#",
  },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalGroups: 12,
  totalTravellers: 248,
  toursInProgress: 3,
  completedTours: 8,
  totalMessages: 1456,
  documentsUploaded: 67,
};

export const mockBroadcasts: Broadcast[] = [
  {
    id: "1",
    groupId: "1",
    message:
      "Reminder: Tour starts in 7 days! Please ensure all documents are ready.",
    sentBy: "Mr. Talwinder",
    sentAt: "2026-03-08",
    recipientCount: 24,
  },
  {
    id: "2",
    groupId: "1",
    message: "Weather update: Expect sunny weather throughout the trip!",
    sentBy: "Mr. Talwinder",
    sentAt: "2026-03-10",
    recipientCount: 24,
  },
];

// Chart data
export const toursOverTimeData = [
  { month: "Aug", tours: 2 },
  { month: "Sep", tours: 3 },
  { month: "Oct", tours: 2 },
  { month: "Nov", tours: 4 },
  { month: "Dec", tours: 3 },
  { month: "Jan", tours: 5 },
  { month: "Feb", tours: 4 },
];

export const messageActivityData = [
  { day: "Mon", messages: 45, broadcasts: 3 },
  { day: "Tue", messages: 62, broadcasts: 5 },
  { day: "Wed", messages: 38, broadcasts: 2 },
  { day: "Thu", messages: 71, broadcasts: 4 },
  { day: "Fri", messages: 55, broadcasts: 6 },
  { day: "Sat", messages: 42, broadcasts: 3 },
  { day: "Sun", messages: 28, broadcasts: 1 },
];

export const tourStatusData = [
  { name: "Active", value: 3, fill: "#0ea5e9" },
  { name: "Completed", value: 8, fill: "#22c55e" },
  { name: "Upcoming", value: 1, fill: "#f59e0b" },
];
