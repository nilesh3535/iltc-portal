import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
  UserCog,
  MessageSquare,
  Radio,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  superAdminOnly?: boolean;
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Groups', path: '/groups', icon: <Users size={20} /> },
  { label: 'Staffs', path: '/staffs', icon: <UserCog size={20} />, superAdminOnly: true },
  { label: 'Individual Chats', path: '/chats', icon: <MessageSquare size={20} /> },
  { label: 'Broadcasts', path: '/broadcasts', icon: <Radio size={20} /> },
  { label: 'Documents', path: '/documents', icon: <FileText size={20} /> },
  { label: 'Reports', path: '/reports', icon: <BarChart3 size={20} />, superAdminOnly: true },
  { label: 'Settings', path: '/settings', icon: <Settings size={20} />, superAdminOnly: true },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredMenuItems = menuItems.filter(
    (item) => !item.superAdminOnly || user?.role === 'super_admin'
  );

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } shadow-xl z-30`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-blue-700 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-xl">ILTC Travels</h1>
              <p className="text-xs text-blue-200 mt-1">
                {user?.role === 'super_admin' ? 'Super Admin' : 'Staff Panel'}
              </p>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors ml-auto"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700/50'
                }`}
                title={collapsed ? item.label : ''}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700/50 transition-colors w-full"
            title={collapsed ? 'Logout' : ''}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}