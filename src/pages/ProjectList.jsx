import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, MoreHorizontal, Clock, Users, ArrowUpDown } from 'lucide-react';

const projects = [
  { id: 'P2026-001', name: '代号·星辰 开放世界MMO', dept: '策划工作室', pm: '林晨', progress: 78, status: '进行中', priority: '高', budget: '2,800万', members: 24, startDate: '2026-01-15', endDate: '2026-09-30' },
  { id: 'P2026-002', name: '代号·破晓 战术竞技', dept: '发行运营中心', pm: '苏婉', progress: 92, status: '进行中', priority: '高', budget: '1,200万', members: 18, startDate: '2025-11-01', endDate: '2026-06-30' },
  { id: 'P2026-003', name: '代号·幻塔 二次元卡牌', dept: '数据分析中心', pm: '赵翼', progress: 45, status: '进行中', priority: '中', budget: '1,500万', members: 16, startDate: '2026-03-01', endDate: '2026-12-31' },
  { id: 'P2026-004', name: '代号·龙魂 国风动作RPG', dept: '财务法务中心', pm: '韩冰', progress: 100, status: '已完成', priority: '高', budget: '900万', members: 12, startDate: '2025-06-01', endDate: '2026-04-15' },
  { id: 'P2026-005', name: '代号·暗潮 赛博朋克FPS', dept: '技术中台', pm: '周恒', progress: 65, status: '进行中', priority: '中', budget: '600万', members: 14, startDate: '2026-02-01', endDate: '2026-08-31' },
  { id: 'P2026-006', name: '代号·山海 休闲放置', dept: '产品创新部', pm: '唐菲', progress: 30, status: '进行中', priority: '高', budget: '1,800万', members: 22, startDate: '2026-04-01', endDate: '2027-03-31' },
  { id: 'P2026-007', name: '代号·极光 三消养成', dept: '合规安全部', pm: '陆骁', progress: 88, status: '进行中', priority: '高', budget: '750万', members: 10, startDate: '2026-01-01', endDate: '2026-07-31' },
  { id: 'P2026-008', name: '代号·永恒 策略SLG', dept: '策划工作室', pm: '沈韵', progress: 55, status: '进行中', priority: '中', budget: '1,100万', members: 20, startDate: '2026-03-15', endDate: '2026-11-30' },
];

const statusColors = {
  '进行中': 'bg-blue-50 text-blue-600',
  '已完成': 'bg-emerald-50 text-emerald-600',
  '暂停': 'bg-amber-50 text-amber-600',
  '计划中': 'bg-purple-50 text-purple-600',
};

const priorityColors = {
  '高': 'bg-red-50 text-red-600',
  '中': 'bg-amber-50 text-amber-600',
  '低': 'bg-gray-50 text-gray-600',
};

export default function ProjectList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">项目列表</h2>
          <p className="text-sm text-text-secondary mt-0.5">{projects.length} 个项目</p>
        </div>
        <button
          onClick={() => navigate('/projects/new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-sidebar text-white rounded-lg text-sm font-medium hover:bg-sidebar-hover transition-colors"
        >
          <Plus size={16} />
          新建项目
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索项目名称或编号..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border-subtle bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <select className="px-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm text-text-primary">
          <option>全部状态</option>
          <option>进行中</option>
          <option>已完成</option>
          <option>暂停</option>
        </select>
        <select className="px-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm text-text-primary">
          <option>全部优先级</option>
          <option>高</option>
          <option>中</option>
          <option>低</option>
        </select>
        <select className="px-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm text-text-primary">
          <option>全部部门</option>
          <option>策划工作室</option>
          <option>产品创新部</option>
          <option>发行运营中心</option>
        </select>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <Filter size={14} />
          更多筛选
        </button>
      </div>

      {/* Table */}
      <div className="bg-canvas rounded-xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle bg-surface/50">
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">
                  <button className="flex items-center gap-1 hover:text-text-secondary transition-colors">
                    项目编号 <ArrowUpDown size={10} />
                  </button>
                </th>
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">项目名称</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">状态</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">优先级</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">进度</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">预算</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">成员</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">PM</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">截止日期</th>
                <th className="w-10 px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className="border-b border-border-subtle hover:bg-accent/3 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3 text-sm text-text-muted font-mono">{p.id}</td>
                  <td className="px-5 py-3">
                    <div>
                      <span className="text-sm font-medium text-text-primary">{p.name}</span>
                      <p className="text-xs text-text-muted mt-0.5">{p.dept}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[p.priority]}`}>{p.priority}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${p.progress >= 100 ? 'bg-emerald-500' : p.progress >= 70 ? 'bg-accent' : 'bg-amber-500'}`}
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-text-secondary">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-text-secondary font-mono">{p.budget}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <Users size={14} />
                      {p.members}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-text-secondary">{p.pm}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <Clock size={14} />
                      {p.endDate}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-text-muted hover:text-text-primary transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border-subtle">
          <p className="text-xs text-text-muted">显示 1-8 条，共 186 个项目</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm text-text-secondary rounded-lg hover:bg-surface transition-colors disabled:opacity-30" disabled>上一页</button>
            <button className="px-3 py-1.5 text-sm bg-accent text-white rounded-lg font-medium">1</button>
            <button className="px-3 py-1.5 text-sm text-text-secondary rounded-lg hover:bg-surface transition-colors">2</button>
            <button className="px-3 py-1.5 text-sm text-text-secondary rounded-lg hover:bg-surface transition-colors">3</button>
            <button className="px-3 py-1.5 text-sm text-text-secondary rounded-lg hover:bg-surface transition-colors">...</button>
            <button className="px-3 py-1.5 text-sm text-text-secondary rounded-lg hover:bg-surface transition-colors">24</button>
            <button className="px-3 py-1.5 text-sm text-text-secondary rounded-lg hover:bg-surface transition-colors">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
