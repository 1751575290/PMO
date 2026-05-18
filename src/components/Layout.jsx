import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className={`flex-1 transition-all duration-300 ${
        collapsed ? 'ml-[68px]' : 'ml-[240px]'
      }`}>
        <Outlet />
      </main>
    </div>
  );
}
