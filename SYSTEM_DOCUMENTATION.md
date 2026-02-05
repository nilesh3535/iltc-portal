# TourManager Admin Panel - System Documentation

## Overview
A complete, modern, professional web admin panel for a tour management system with role-based access control.

## Design Style
- Clean enterprise SaaS dashboard
- Travel-tech inspired design
- Light theme with soft shadows
- Rounded cards (8–12px radius)
- Primary color: Deep Blue (#1e40af) / Teal (#14b8a6)
- Accent colors: Green (success), Orange (warning), Red (danger)
- Typography: System fonts
- Desktop-first responsive layout
- Professional business look

## Authentication System

### Login Credentials
The system uses a single login for both Super Admin and Staff roles:

**Super Admin:**
- Email: admin@tourmanager.com
- Password: admin123
- Access: Full system access including staff management, reports, and settings

**Staff:**
- Email: staff@tourmanager.com
- Password: staff123
- Access: Limited to tour management, chats, broadcasts, and documents

### Role-Based Access Control
- Menu items are automatically filtered based on user role
- Super Admin-only pages: Staff Management, Reports, Settings
- Shared pages: Dashboard, Groups, Individual Chats, Broadcasts, Documents

## System Architecture

### Tech Stack
- React 18.3.1
- TypeScript
- React Router 7 (Data Mode)
- Tailwind CSS v4
- Recharts (for data visualization)
- Lucide React (icons)
- Sonner (toast notifications)

### Project Structure
```
/src/app/
  ├── components/
  │   ├── layout/          # Layout components (Sidebar, Header, DashboardLayout)
  │   ├── ui/              # Reusable UI components (Button, Card, Input, Modal, etc.)
  │   └── ProtectedRoute.tsx
  ├── context/
  │   └── AuthContext.tsx  # Authentication state management
  ├── pages/               # All page components
  │   ├── Login.tsx
  │   ├── SuperAdminDashboard.tsx
  │   ├── StaffDashboard.tsx
  │   ├── StaffManagement.tsx
  │   ├── Groups.tsx
  │   ├── GroupDetails.tsx
  │   ├── Chats.tsx
  │   ├── Broadcasts.tsx
  │   ├── Documents.tsx
  │   ├── Reports.tsx
  │   ├── Settings.tsx
  │   └── NotFound.tsx
  ├── utils/
  │   └── mockData.ts      # Mock data for demonstration
  ├── types.ts             # TypeScript type definitions
  ├── routes.tsx           # React Router configuration
  └── App.tsx              # Main app component
```

## Features by Role

### Super Admin Features

#### 1. Super Admin Dashboard
- Metric cards showing:
  - Total Tour Groups
  - Total Travellers
  - Tours In Progress
  - Completed Tours
  - Total Messages
  - Documents Uploaded
- Charts:
  - Line chart: Tours over time
  - Bar chart: Message & Broadcast activity
  - Pie chart: Tour status distribution
- Date filters: Monthly / Yearly / Custom range

#### 2. Staff Management
- Complete CRUD operations for staff members
- Staff list table with:
  - Name, Mobile, Email, Role, Status
  - Active/Inactive toggle
  - Edit and Delete actions
- Add/Edit Staff modal with:
  - Name, Mobile, Email fields
  - Role dropdown (Staff / Super Admin)
  - Permission toggles
- Search functionality

#### 3. Reports
- Date range filtering
- Key metrics:
  - Tours created over time
  - Travellers per tour
  - Invite acceptance rates
  - Chat activity breakdown
- Export functionality (PDF/Excel)
- Visual charts and graphs

#### 4. Settings
- App Branding:
  - Application name
  - Logo upload
- File Upload Settings:
  - Maximum file size
  - Allowed file types
- Notification Preferences:
  - Email notifications toggle
  - SMS notifications toggle
  - Push notifications toggle
- Default Tour Settings:
  - Group chat enabled by default
  - Broadcast enabled by default
  - Auto-archive completed tours
  - Require invite approval

### Staff Features

#### 5. Staff Dashboard
- Quick stats:
  - My Active Tours
  - Upcoming Tours
  - Total Travellers
  - Messages Today
- Active tours list with details
- Upcoming tours preview
- Pending invites counter

### Shared Features

#### 6. Groups Management
- Card-based or table view of tour groups
- Group information:
  - Tour Name, Description
  - Start Date – End Date
  - Total Travellers count
  - Chat ON/OFF toggle
  - Status badges (Active / Completed / Upcoming)
- CRUD operations:
  - Create new group
  - Edit group details
  - Delete group (with confirmation)
  - View group details
- Search and filter functionality

#### 7. Group Details (Tab Layout)
Five main tabs:

**Travellers Tab:**
- Traveller management table
- Add/Edit/Delete travellers
- Invite status tracking (Accepted / Pending / Declined)
- Unique invite link generation
- Share via WhatsApp/SMS
- Copy invite link functionality

**Group Chat Tab:**
- WhatsApp-style chat interface
- Message bubbles with sender info
- Support for:
  - Text messages
  - Images
  - Documents (PDF, Word, Excel)
  - File attachments
- Date separators
- Admin delete message option
- Real-time message input

**Private Chats Tab:**
- Left panel: Traveller list
- Right panel: Chat window
- One-on-one messaging
- Same attachment support as group chat

**Documents Tab:**
- Document upload functionality
- File list with:
  - File name, type, size
  - Uploaded by, Upload date
  - Download/Delete actions
- File type icons (PDF, Word, Excel, Images)
- Group-filtered document view

**Settings Tab:**
- Edit group information
- Update dates
- Modify group settings

#### 8. Individual Chats
- Split-screen layout
- Left: Traveller list with search
- Right: Chat window
- Private messaging between staff and travellers
- Attachment support (files, images, documents)
- Online status indicators

#### 9. Broadcasts
- Send announcements to all travellers in a group
- Broadcast history with:
  - Group name
  - Message content
  - Recipient count
  - Sent by and timestamp
- New broadcast modal:
  - Group selection
  - Message composition
  - Live preview
- Broadcast statistics dashboard

#### 10. Documents
- Centralized document management
- Search and filter by group
- Document statistics:
  - Total documents
  - By file type (PDFs, Documents, Spreadsheets)
- Grid view with file previews
- Upload modal with drag-and-drop
- Download/Delete actions

## UI/UX Features

### Layout Structure
- Fixed left sidebar with icons and text
- Collapsible sidebar functionality
- Top header with:
  - Page title
  - Notifications icon
  - User profile dropdown
- Main content area with proper spacing
- Responsive design

### Design Elements
- Consistent card-based layout
- Soft shadows for depth
- Rounded corners (8-12px)
- Color-coded status badges
- Interactive hover states
- Smooth transitions and animations
- Professional typography hierarchy

### User Experience
- Toast notifications for actions
- Confirmation modals for destructive actions
- Empty states with helpful messages
- Loading states for async operations
- Breadcrumb navigation
- Search and filter capabilities
- Keyboard shortcuts support (Enter to submit)

### Responsive Behavior
- Desktop-first approach
- Adapts to tablet and mobile screens
- Sidebar collapses on smaller screens
- Table scrolls horizontally on mobile
- Touch-friendly interface elements

## Data Flow

### Authentication
1. User enters credentials on login page
2. AuthContext validates against mock users
3. User data stored in localStorage
4. User role determines menu visibility
5. Protected routes check authentication status
6. Redirects to dashboard on successful login

### State Management
- React Context API for authentication
- Local component state for UI interactions
- localStorage for persistence
- Mock data serves as backend simulation

### Routing
- React Router Data Mode
- Protected routes with role checking
- Nested routes for layouts
- Programmatic navigation
- 404 handling

## Mock Data

The system includes comprehensive mock data:
- 3 staff members (various roles and statuses)
- 4 tour groups (different statuses)
- 5 travellers (various invite statuses)
- Message threads with attachments
- Document repository
- Broadcast history
- Dashboard metrics
- Chart data for visualizations

## Future Enhancements

### Suggested Features
- Real-time chat with WebSocket integration
- Push notifications system
- Advanced reporting with custom date ranges
- Bulk operations for travellers
- Email template management
- Payment integration
- Multi-language support
- Dark mode theme
- Mobile app companion
- API integration documentation

### Technical Improvements
- Implement proper backend API
- Add database integration (Supabase recommended)
- Real-time updates with WebSocket
- File upload to cloud storage
- Advanced caching strategies
- Performance optimization
- Progressive Web App (PWA) features
- Analytics integration

## Development Notes

### Best Practices Followed
- TypeScript for type safety
- Component-based architecture
- Separation of concerns
- Reusable UI components
- Consistent naming conventions
- Clean code structure
- Responsive design patterns
- Accessibility considerations

### Testing Recommendations
- Unit tests for components
- Integration tests for flows
- E2E tests for critical paths
- Role-based access testing
- Responsive design testing
- Browser compatibility testing

## Support & Maintenance

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance
- Optimized bundle size
- Lazy loading for routes
- Image optimization
- Efficient re-renders

---

**Version:** 1.0.0  
**Last Updated:** February 5, 2026  
**License:** Proprietary
