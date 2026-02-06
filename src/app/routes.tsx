import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "./pages/Login";
import { SuperAdminDashboard } from "./pages/SuperAdminDashboard";
import { StaffDashboard } from "./pages/StaffDashboard";
import { StaffManagement } from "./pages/StaffManagement";
import { Groups } from "./pages/Groups";
import { GroupDetails } from "./pages/GroupDetails";
import { Chats } from "./pages/Chats";
import { GroupChats } from "./pages/GroupChats";
import { Broadcasts } from "./pages/Broadcasts";
import { Documents } from "./pages/Documents";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { NotFound } from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Wrapper for protected dashboard layout
function ProtectedDashboardLayout({ title }: { title: string }) {
  return (
    <ProtectedRoute>
      <DashboardLayout title={title} />
    </ProtectedRoute>
  );
}

// Wrapper for super admin protected dashboard layout
function SuperAdminDashboardLayout({ title }: { title: string }) {
  return (
    <ProtectedRoute requireSuperAdmin>
      <DashboardLayout title={title} />
    </ProtectedRoute>
  );
}

// Wrapper component to show different dashboards based on user role
function DashboardWrapper() {
  const userRole = localStorage.getItem("userRole") || "staff";
  return userRole === "super_admin" ? (
    <SuperAdminDashboard />
  ) : (
    <StaffDashboard />
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <ProtectedDashboardLayout title="Dashboard" />,
    children: [
      {
        index: true,
        element: <DashboardWrapper />,
      },
    ],
  },
  {
    path: "/groups",
    element: <ProtectedDashboardLayout title="Tour Groups" />,
    children: [
      {
        index: true,
        element: <Groups />,
      },
    ],
  },
  {
    path: "/groups/:id",
    element: <ProtectedDashboardLayout title="Group Details" />,
    children: [
      {
        index: true,
        element: <GroupDetails />,
      },
    ],
  },
  {
    path: "/staffs",
    element: <SuperAdminDashboardLayout title="Staff Management" />,
    children: [
      {
        index: true,
        element: <StaffManagement />,
      },
    ],
  },
  {
    path: "/chats",
    element: <ProtectedDashboardLayout title="Private Chats" />,
    children: [
      {
        index: true,
        element: <Chats />,
      },
    ],
  },
  {
    path: "/groupchats",
    element: <ProtectedDashboardLayout title="Group Chats" />,
    children: [
      {
        index: true,
        element: <GroupChats />,
      },
    ],
  },

  {
    path: "/broadcasts",
    element: <ProtectedDashboardLayout title="Broadcasts" />,
    children: [
      {
        index: true,
        element: <Broadcasts />,
      },
    ],
  },
  {
    path: "/documents",
    element: <ProtectedDashboardLayout title="Documents" />,
    children: [
      {
        index: true,
        element: <Documents />,
      },
    ],
  },
  {
    path: "/reports",
    element: <SuperAdminDashboardLayout title="Reports" />,
    children: [
      {
        index: true,
        element: <Reports />,
      },
    ],
  },
  {
    path: "/settings",
    element: <SuperAdminDashboardLayout title="Settings" />,
    children: [
      {
        index: true,
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
