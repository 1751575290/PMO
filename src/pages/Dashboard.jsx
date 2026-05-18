import { TrendingUp, TrendingDown, Flag, Clock, AlertTriangle, CheckCircle2, Users, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const stats = [
  { label: '项目总数', value: '186', change: '+12', up: true, icon: Flag, color: 'text-accent', bg: 'bg-accent/10' },
  { label: '进行中', value: '84', change: '+5', up: true, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '已完成', value: '73', change: '+18', up: true, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: '逾期项目', value: '8', change: '-3', up: false, icon: AlertTriangle, color: 'text-danger', bg: 'bg-red-50' },
  { label: '风险项目', value: '14', change: '-2', up: false, icon: ShieldAlert, color: 'text-warning', bg: 'bg-amber-50' },
  { label: '团队人数', value: '328', change: '+24', up: true, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const monthlyData = [
  { month: '1月', 新立项: 12, 已完成: 8, 进行中: 45 },
  { month: '2月', 新立项: 15, 已完成: 10, 进行中: 50 },
  { month: '3月', 新立项: 18, 已完成: 12, 进行中: 56 },
  { month: '4月', 新立项: 14, 已完成: 15, 进行中: 55 },
  { month: '5月', 新立项: 20, 已完成: 14, 进行中: 61 },
  { month: '6月', 新立项: 22, 已完成: 18, 进行中: 65 },
  { month: '7月', 新立项: 16, 已完成: 20, 进行中: 61 },
  { month: '8月', 新立项: 19, 已完成: 16, 进行中: 64 },
  { month: '9月', 新立项: 24, 已完成: 22, 进行中: 66 },
  { month: '10月', 新立项: 18, 已完成: 19, 进行中: 65 },
  { month: '11月', 新立项: 21, 已完成: 24, 进行中: 62 },
  { month: '12月', 新立项: 15, 已完成: 21, 进行中: 56 },
];

const workloadData = [
  { name: '研发部', 人力: 85, 负载率: 78 },
  { name: '产品创新部', 人力: 42, 负载率: 65 },
  { name: '设计部', 人力: 28, 负载率: 82 },
  { name: '测试部', 人力: 36, 负载率: 71 },
  { name: '发行运营中心', 人力: 24, 负载率: 55 },
  { name: '运维部', 人力: 18, 负载率: 60 },
];

const pieData = [
  { name: '进行中', value: 84, color: '#3b82f6' },
  { name: '已完成', value: 73, color: '#22c55e' },
  { name: '暂停', value: 12, color: '#f59e0b' },
  { name: '计划中', value: 17, color: '#8b5cf6' },
];

const recentProjects = [
  { name: '代号·星辰 开放世界MMO', dept: '策划工作室', progress: 78, status: '进行中', pm: '林晨' },
  { name: '代号·破晓 战术竞技', dept: '发行运营中心', progress: 92, status: '进行中', pm: '苏婉' },
  { name: '代号·幻塔 二次元卡牌', dept: '数据分析中心', progress: 45, status: '进行中', pm: '赵翼' },
  { name: '代号·龙魂 国风动作RPG', dept: '财务法务中心', progress: 100, status: '已完成', pm: '韩冰' },
  { name: '代号·暗潮 赛博朋克FPS', dept: '技术中台', progress: 65, status: '进行中', pm: '周恒' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">项目总览</h2>
          <p className="text-sm text-text-secondary mt-0.5">PMO管理驾驶舱 · 最后更新: 2026-05-16 09:30</p>
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20">
            <option>2026年</option>
            <option>2025年</option>
          </select>
          <button className="px-4 py-2 bg-sidebar text-white rounded-lg text-sm font-medium hover:bg-sidebar-hover transition-colors">
            导出报表
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-canvas rounded-xl p-4 border border-border-subtle hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{s.value}</div>
            <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Project Trend */}
        <div className="lg:col-span-2 bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">项目趋势分析</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
              <Area type="monotone" dataKey="新立项" stroke="#3b82f6" fill="url(#grad1)" strokeWidth={2} />
              <Area type="monotone" dataKey="已完成" stroke="#22c55e" fill="url(#grad2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">项目状态分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                {pieData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-text-secondary">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                {d.name} {d.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Workload */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">部门人力和负载</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={workloadData} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={50} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} />
              <Bar dataKey="人力" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Projects */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">近期重点项目</h3>
          <div className="space-y-3">
            {recentProjects.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface transition-colors group cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary truncate">{p.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                      p.status === '已完成' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>{p.status}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    <span>{p.dept}</span>
                    <span>PM: {p.pm}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${p.progress >= 100 ? 'bg-emerald-500' : p.progress >= 70 ? 'bg-accent' : 'bg-amber-500'}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-text-secondary w-8 text-right">{p.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
