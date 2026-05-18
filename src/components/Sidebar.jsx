import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, CalendarRange,
  Users, ClipboardCheck, ShieldAlert, BarChart3, Settings, ChevronLeft
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: '项目总览' },
  { to: '/projects', icon: FolderKanban, label: '项目列表' },
  { to: '/gantt', icon: CalendarRange, label: '项目规划' },
  { to: '/resources', icon: Users, label: '资源管理' },
  { to: '/approval', icon: ClipboardCheck, label: '审批中心' },
  { to: '/risks', icon: ShieldAlert, label: '风险管理' },
  { to: '/analytics', icon: BarChart3, label: '数据分析' },
  { to: '/settings', icon: Settings, label: '系统设置' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside className={`fixed left-0 top-0 h-full bg-sidebar text-white transition-all duration-300 z-30 flex flex-col ${
      collapsed ? 'w-[68px]' : 'w-[240px]'
    }`}>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex-1">
            <h1 className="text-lg font-bold tracking-tight">PMO Suite</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">Enterprise</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${collapsed ? 'mx-auto' : ''}`}
        >
          <ChevronLeft size={18} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                isActive
                  ? 'bg-sidebar-active text-white font-medium'
                  : 'text-white/60 hover:text-white hover:bg-sidebar-hover'
              }`
            }
          >
            <Icon size={20} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-sidebar text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-white/10">
        <div className={`flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold shrink-0">
            李
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">李明远</p>
              <p className="text-xs text-white/40 truncate">PMO总监</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
