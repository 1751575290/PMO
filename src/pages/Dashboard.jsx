import { TrendingUp, TrendingDown, Flag, AlertTriangle, CheckCircle2, Users, ShieldAlert, Zap, Activity } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const stats = [
  { label: '项目总数', value: '186', change: '+12', up: true, icon: Flag },
  { label: '进行中', value: '84', change: '+5', up: true, icon: TrendingUp },
  { label: '已完成', value: '73', change: '+18', up: true, icon: CheckCircle2 },
  { label: '逾期项目', value: '8', change: '-3', up: false, icon: AlertTriangle },
  { label: '风险项目', value: '14', change: '-2', up: false, icon: ShieldAlert },
  { label: '团队人数', value: '328', change: '+24', up: true, icon: Users },
];

const monthlyData = [
  { month: '1月', 新立项: 12, 已完成: 8 }, { month: '2月', 新立项: 15, 已完成: 10 }, { month: '3月', 新立项: 18, 已完成: 12 },
  { month: '4月', 新立项: 14, 已完成: 15 }, { month: '5月', 新立项: 20, 已完成: 14 }, { month: '6月', 新立项: 22, 已完成: 18 },
  { month: '7月', 新立项: 16, 已完成: 20 }, { month: '8月', 新立项: 19, 已完成: 16 }, { month: '9月', 新立项: 24, 已完成: 22 },
  { month: '10月', 新立项: 18, 已完成: 19 }, { month: '11月', 新立项: 21, 已完成: 24 }, { month: '12月', 新立项: 15, 已完成: 21 },
];

const workloadData = [
  { name: '研发部', 人力: 85 }, { name: '产品创新部', 人力: 42 }, { name: '设计部', 人力: 28 },
  { name: '测试部', 人力: 36 }, { name: '发行运营中心', 人力: 24 }, { name: '运维部', 人力: 18 },
];

const pieData = [
  { name: '进行中', value: 84, color: '#3b82f6' }, { name: '已完成', value: 73, color: '#22c55e' },
  { name: '暂停', value: 12, color: '#f59e0b' }, { name: '计划中', value: 17, color: '#a855f7' },
];

const recentProjects = [
  { name: '代号·星辰 开放世界MMO', dept: '策划工作室', progress: 78, status: '进行中', pm: '林晨' },
  { name: '代号·破晓 战术竞技', dept: '发行运营中心', progress: 92, status: '进行中', pm: '苏婉' },
  { name: '代号·幻塔 二次元卡牌', dept: '数据分析中心', progress: 45, status: '进行中', pm: '赵翼' },
  { name: '代号·龙魂 国风动作RPG', dept: '财务法务中心', progress: 100, status: '已完成', pm: '韩冰' },
  { name: '代号·暗潮 赛博朋克FPS', dept: '技术中台', progress: 65, status: '进行中', pm: '周恒' },
];

export default function Dashboard() {
  const { isDark } = useTheme();

  // ── 根据主题动态计算所有样式 ──
  const bg = isDark
    ? 'linear-gradient(135deg, #0a0f1a 0%, #0d1525 50%, #0a0e17 100%)'
    : '#f8f9fb';
  const cardBg = isDark ? '#0f1724' : '#ffffff';
  const cardBorder = isDark ? '#1e293b' : '#e5e7eb';
  const cardShadow = isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.04)';
  const titleColor = isDark ? '#ffffff' : '#111827';
  const subColor = isDark ? '#6b7280' : '#6b7280';
  const statText = isDark ? '#ffffff' : '#111827';
  const statLabel = isDark ? '#6b7280' : '#9ca3af';
  const sectionTitle = isDark ? '#e2e8f0' : '#111827';
  const chartGrid = isDark ? '#1e293b' : '#f1f5f9';
  const chartTick = isDark ? '#64748b' : '#94a3b8';
  const chartYTick = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e5e7eb';
  const tooltipText = isDark ? '#e2e8f0' : '#111827';
  const inputBg = isDark ? 'rgba(31,41,55,0.5)' : '#ffffff';
  const inputBorder = isDark ? '#374151' : '#e5e7eb';
  const inputText = isDark ? '#d1d5db' : '#111827';
  const btnExportBg = isDark
    ? 'linear-gradient(to right, #06b6d4, #2563eb)'
    : '#0f172a';
  const btnExportShadow = isDark ? '0 0 20px rgba(6,182,212,0.3)' : 'none';
  const liveBorder = isDark ? '1px solid rgba(6,182,212,0.2)' : '1px solid rgba(6,182,212,0.2)';
  const liveBg = isDark ? 'rgba(6,182,212,0.05)' : 'rgba(6,182,212,0.05)';
  const zlColor = isDark ? '#22d3ee' : '#3b82f6';
  const statIconBg = (color) => isDark ? color + '26' : color + '10';
  const statCardBorder = (color) => isDark ? color + '4d' : '#e5e7eb';
  const statusBarText = isDark ? '#4b5563' : '#9ca3af';
  const statusBarBorder = isDark ? 'rgba(31,41,55,0.5)' : '#e5e7eb';
  const progressTrack = isDark ? '#1e293b' : '#f1f5f9';
  const hoverBg = isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9';
  const hoverBorder = isDark ? '#1e293b' : '#e5e7eb';

  const areaGrad1 = isDark
    ? { offset5: '#06b6d4', opacity: 0.25 }
    : { offset5: '#3b82f6', opacity: 0.15 };
  const areaGrad2 = isDark
    ? { offset5: '#22c55e', opacity: 0.2 }
    : { offset5: '#22c55e', opacity: 0.15 };

  const statColors = [
    { icon: '#22d3ee', bg: 'rgba(6,182,212,0.15)', border: 'rgba(6,182,212,0.3)' },
    { icon: '#60a5fa', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
    { icon: '#4ade80', bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)' },
    { icon: '#f87171', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)' },
    { icon: '#fbbf24', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.3)' },
    { icon: '#c084fc', bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)' },
  ];

  if (!isDark) {
    statColors.forEach(c => {
      c.bg = c.bg.replace('0.15', '0.07');
      c.border = '#e5e7eb';
    });
  }

  const tooltipStyle = { borderRadius: 10, border: '1px solid ' + tooltipBorder, background: tooltipBg, color: tooltipText, boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.5)' : '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: 12 };
  const xTickStyle = { fontSize: 11, fill: chartTick };
  const yAxisTick = { fontSize: 11, fill: chartYTick };

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div style={{ width: 4, height: 24, borderRadius: 999, background: 'linear-gradient(to bottom, #22d3ee, #2563eb)', boxShadow: isDark ? '0 0 10px rgba(6,182,212,0.5)' : 'none' }} />
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: titleColor }}>项目总览</h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ border: liveBorder, background: liveBg }}>
              <Activity size={10} style={{ color: zlColor }} />
              <span style={{ fontSize: 10, color: zlColor, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Live</span>
            </div>
          </div>
          <p className="text-sm ml-4" style={{ color: subColor }}>PMO管理驾驶舱 · 最后更新: 2026-05-16 09:30</p>
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 rounded-lg text-sm transition-all" style={{ border: '1px solid ' + inputBorder, background: inputBg, color: inputText, outline: 'none' }}>
            <option>2026年</option><option>2025年</option>
          </select>
          <button className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-all" style={{ background: btnExportBg, boxShadow: btnExportShadow }}>
            导出报表
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div key={s.label} className="rounded-xl p-4 border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer" style={{ background: cardBg, borderColor: statColors[i].border, boxShadow: cardShadow }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: statColors[i].bg }}>
                <s.icon size={18} style={{ color: statColors[i].icon }} />
              </div>
              <span className={'text-xs font-bold flex items-center gap-0.5 ' + (s.up ? 'text-emerald-400' : 'text-red-400')}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{s.change}
              </span>
            </div>
            <div className="text-2xl font-bold" style={{ color: statText }}>{s.value}</div>
            <div className="text-xs" style={{ color: statLabel, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border p-5" style={{ background: cardBg, borderColor: cardBorder, boxShadow: cardShadow }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} style={{ color: zlColor }} />
            <h3 className="text-sm font-semibold" style={{ color: sectionTitle }}>项目趋势分析</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={areaGrad1.offset5} stopOpacity={areaGrad1.opacity} /><stop offset="95%" stopColor={areaGrad1.offset5} stopOpacity={0} /></linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={areaGrad2.offset5} stopOpacity={areaGrad2.opacity} /><stop offset="95%" stopColor={areaGrad2.offset5} stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="month" tick={xTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: chartTick }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="新立项" stroke={isDark ? '#06b6d4' : '#3b82f6'} fill="url(#grad1)" strokeWidth={2.5} dot={false} />
              <Area type="monotone" dataKey="已完成" stroke="#22c55e" fill="url(#grad2)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border p-5" style={{ background: cardBg, borderColor: cardBorder, boxShadow: cardShadow }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} style={{ color: isDark ? '#c084fc' : '#8b5cf6' }} />
            <h3 className="text-sm font-semibold" style={{ color: sectionTitle }}>项目状态分布</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                {pieData.map((d, idx) => (<Cell key={idx} fill={d.color} stroke={cardBg} strokeWidth={2} />))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color, boxShadow: isDark ? '0 0 6px ' + d.color + '80' : 'none' }} />
                {d.name} {d.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border p-5" style={{ background: cardBg, borderColor: cardBorder, boxShadow: cardShadow }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} style={{ color: isDark ? '#60a5fa' : '#3b82f6' }} />
            <h3 className="text-sm font-semibold" style={{ color: sectionTitle }}>部门人力和负载</h3>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={workloadData} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: chartTick }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={yAxisTick} axisLine={false} tickLine={false} width={50} />
              <Tooltip contentStyle={tooltipStyle} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor={isDark ? '#06b6d4' : '#60a5fa'} />
                </linearGradient>
              </defs>
              <Bar dataKey="人力" fill="url(#barGrad)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border p-5" style={{ background: cardBg, borderColor: cardBorder, boxShadow: cardShadow }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} style={{ color: isDark ? '#fbbf24' : '#f59e0b' }} />
            <h3 className="text-sm font-semibold" style={{ color: sectionTitle }}>近期重点项目</h3>
          </div>
          <div className="space-y-2">
            {recentProjects.map((p, i) => {
              const doneColor = isDark ? '#34d399' : '#22c55e';
              const activeColor = isDark ? '#60a5fa' : '#3b82f6';
              const isDone = p.status === '已完成';
              const dotColor = isDone ? '#4ade80' : '#60a5fa';
              const dotShadow = isDark ? (isDone ? 'rgba(34,197,94,0.5)' : 'rgba(59,130,246,0.5)') : 'none';
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border" style={{ ':hover': { background: hoverBg, borderColor: hoverBorder } }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dotColor, boxShadow: '0 0 6px ' + dotShadow }} />
                      <span className="text-sm font-medium truncate" style={{ color: isDark ? '#e2e8f0' : '#111827' }}>{p.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0" style={{
                        background: isDone ? 'rgba(52,211,153,0.1)' : 'rgba(96,165,250,0.1)',
                        color: isDone ? doneColor : activeColor,
                        border: '1px solid ' + (isDone ? 'rgba(52,211,153,0.2)' : 'rgba(96,165,250,0.2)')
                      }}>{p.status}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs ml-3.5" style={{ color: isDark ? '#6b7280' : '#6b7280' }}>
                      <span>{p.dept}</span><span>PM: {p.pm}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: progressTrack }}>
                      <div className="h-full rounded-full" style={{
                        width: p.progress + '%',
                        background: p.progress >= 100 ? 'linear-gradient(to right, #34d399, #4ade80)' : p.progress >= 70 ? 'linear-gradient(to right, #06b6d4, #3b82f6)' : 'linear-gradient(to right, #f59e0b, #fbbf24)'
                      }} />
                    </div>
                    <span className="text-xs font-medium w-8 text-right" style={{ color: isDark ? '#9ca3af' : '#6b7280', fontFamily: 'monospace' }}>{p.progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between pt-2 border-t" style={{ fontSize: 11, color: statusBarText, borderColor: statusBarBorder }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: isDark ? 'rgba(6,182,212,0.6)' : '#22c55e', boxShadow: isDark ? '0 0 6px rgba(6,182,212,0.4)' : 'none' }} />系统在线
          </span>
          <span>响应时间 &lt; 120ms</span>
          <span>数据同步 3分钟前</span>
        </div>
        <span>PMO Suite v1.0 · Enterprise</span>
      </div>
    </div>
  );
}