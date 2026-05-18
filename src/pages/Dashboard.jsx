import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Flag, AlertTriangle, CheckCircle2, Users, ShieldAlert, Zap, Activity, X, ChevronRight, ExternalLink } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

// ── 6 张统计卡片，每张绑定下钻路由 ──
const statsDef = [
  { label: '项目总数', value: '186', change: '+12', up: true, icon: Flag, drillPath: '/projects', drillLabel: '查看全部项目' },
  { label: '进行中', value: '84', change: '+5', up: true, icon: TrendingUp, drillPath: '/projects?status=进行中', drillLabel: '查看进行中的项目' },
  { label: '已完成', value: '73', change: '+18', up: true, icon: CheckCircle2, drillPath: '/projects?status=已完成', drillLabel: '查看已完成的项目' },
  { label: '逾期项目', value: '8', change: '-3', up: false, icon: AlertTriangle, drillPath: '/projects?overdue=1', drillLabel: '查看逾期项目' },
  { label: '风险项目', value: '14', change: '-2', up: false, icon: ShieldAlert, drillPath: '/risks', drillLabel: '进入风险管理' },
  { label: '团队人数', value: '328', change: '+24', up: true, icon: Users, drillPath: '/resources', drillLabel: '查看资源分布' },
];

const monthlyData = [
  { month: '1月', 新立项: 12, 已完成: 8 }, { month: '2月', 新立项: 15, 已完成: 10 }, { month: '3月', 新立项: 18, 已完成: 12 },
  { month: '4月', 新立项: 14, 已完成: 15 }, { month: '5月', 新立项: 20, 已完成: 14 }, { month: '6月', 新立项: 22, 已完成: 18 },
  { month: '7月', 新立项: 16, 已完成: 20 }, { month: '8月', 新立项: 19, 已完成: 16 }, { month: '9月', 新立项: 24, 已完成: 22 },
  { month: '10月', 新立项: 18, 已完成: 19 }, { month: '11月', 新立项: 21, 已完成: 24 }, { month: '12月', 新立项: 15, 已完成: 21 },
];

const workloadData = [
  { name: '研发部', 人力: 85, 负载率: 78, projects: 24, members: 85, avgExp: '4.2年', lead: '张涛' },
  { name: '产品创新部', 人力: 42, 负载率: 65, projects: 12, members: 42, avgExp: '3.8年', lead: '陈静' },
  { name: '设计部', 人力: 28, 负载率: 82, projects: 18, members: 28, avgExp: '3.1年', lead: '吴思远' },
  { name: '测试部', 人力: 36, 负载率: 71, projects: 16, members: 36, avgExp: '2.9年', lead: '刘洋' },
  { name: '发行运营中心', 人力: 24, 负载率: 55, projects: 8, members: 24, avgExp: '3.5年', lead: '苏婉' },
  { name: '运维部', 人力: 18, 负载率: 60, projects: 6, members: 18, avgExp: '4.5年', lead: '赵磊' },
];

const pieData = [
  { name: '进行中', value: 84, color: '#3b82f6' }, { name: '已完成', value: 73, color: '#22c55e' },
  { name: '暂停', value: 12, color: '#f59e0b' }, { name: '计划中', value: 17, color: '#a855f7' },
];

const recentProjects = [
  { id: 'P2026-001', name: '代号·星辰 开放世界MMO', dept: '策划工作室', progress: 78, status: '进行中', pm: '林晨' },
  { id: 'P2026-002', name: '代号·破晓 战术竞技', dept: '发行运营中心', progress: 92, status: '进行中', pm: '苏婉' },
  { id: 'P2026-003', name: '代号·幻塔 二次元卡牌', dept: '数据分析中心', progress: 45, status: '进行中', pm: '赵翼' },
  { id: 'P2026-004', name: '代号·龙魂 国风动作RPG', dept: '财务法务中心', progress: 100, status: '已完成', pm: '韩冰' },
  { id: 'P2026-005', name: '代号·暗潮 赛博朋克FPS', dept: '技术中台', progress: 65, status: '进行中', pm: '周恒' },
];

// ── 趋势月度明细数据 ──
const monthlyDetail = [
  { month: '1月', 新立项: 12, 已完成: 8, 新立项项目: '代号·星辰(开放世界)|代号·破晓(战术竞技)|数据中台升级', 完成项目: 'AI客服平台V1|OA系统迁移|供应链二期' },
  { month: '2月', 新立项: 15, 已完成: 10, 新立项项目: '代号·暗潮(FPS)|海外发行中台|CDP平台V2|UE5引擎预研', 完成项目: '数据安全合规|移动办公V1|财务中台一期' },
  { month: '3月', 新立项: 18, 已完成: 12, 新立项项目: '代号·山海(休闲)|代号·永恒(SLG)|AI美术管线', 完成项目: '智能客服V2|用户画像系统|基础设施迁移' },
  { month: '4月', 新立项: 14, 已完成: 15, 新立项项目: '代号·龙魂(RPG)|全球化支付|反外挂方案', 完成项目: 'CDP平台V2|移动办公V2|OE系统上线' },
  { month: '5月', 新立项: 20, 已完成: 14, 新立项项目: '代号·幻塔(卡牌)|跨服战斗架构|开放世界编辑器', 完成项目: '安全审计V3|VPN改造|统一登录SSO' },
  { month: '6月', 新立项: 22, 已完成: 18, 新立项项目: '代号·极光(三消)|社交平台升级|云游戏适配', 完成项目: '运营数据中台|BI可视化仪表盘|帮助中心' },
  { month: '7月', 新立项: 16, 已完成: 20, 新立项项目: 'AIGC美术工具|海外合规SaaS|小程序平台', 完成项目: '海外发行中台|反外挂V2|统一账号体系' },
  { month: '8月', 新立项: 19, 已完成: 16, 新立项项目: '实时对战引擎|数字人直播|AI关卡生成', 完成项目: 'CDP平台V3|灰度发布系统|云游戏V1' },
  { month: '9月', 新立项: 24, 已完成: 22, 新立项项目: '元宇宙入口|物理引擎升级|多端适配框架', 完成项目: 'AIGC工具链|加密SDK|性能监控平台' },
  { month: '10月', 新立项: 18, 已完成: 19, 新立项项目: 'AI语音合成|Unity工具链|云原生迁移', 完成项目: '编辑器V2|大世界服务器|自动化测试' },
  { month: '11月', 新立项: 21, 已完成: 24, 新立项项目: 'XR适配层|动态天气系统|AI剧情引擎', 完成项目: '反作弊V3|全球化SDK|运营活动平台' },
  { month: '12月', 新立项: 15, 已完成: 21, 新立项项目: '年度技术规划|AI NPC系统|引擎5.0迁移', 完成项目: 'DDoS防护|弹性伸缩v2|渲染管线升级' },
];

export default function Dashboard() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // ── 下钻状态 ──
  const [drillDept, setDrillDept] = useState(null);   // 部门下钻弹窗
  const [drillMonth, setDrillMonth] = useState(null);  // 月度趋势下钻弹窗

  // ── 主题样式 ── 保持不变 ──
  const bg = isDark ? 'linear-gradient(135deg, #0a0f1a, #0d1525, #0a0e17)' : '#f8f9fb';
  const cardBg = isDark ? '#0f1724' : '#ffffff';
  const cardBorder = isDark ? '#1e293b' : '#e5e7eb';
  const cardShadow = isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.04)';
  const titleColor = isDark ? '#ffffff' : '#111827';
  const subColor = '#6b7280';
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
  const btnExportBg = isDark ? 'linear-gradient(to right, #06b6d4, #2563eb)' : '#0f172a';
  const btnExportShadow = isDark ? '0 0 20px rgba(6,182,212,0.3)' : 'none';
  const zlColor = isDark ? '#22d3ee' : '#3b82f6';
  const statusBarText = isDark ? '#4b5563' : '#9ca3af';
  const statusBarBorder = isDark ? 'rgba(31,41,55,0.5)' : '#e5e7eb';
  const progressTrack = isDark ? '#1e293b' : '#f1f5f9';
  const hoverBg = isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9';
  const hoverBorder = isDark ? '#1e293b' : '#e5e7eb';
  const statColors = [
    { icon: '#22d3ee', bg: 'rgba(6,182,212,0.15)', border: 'rgba(6,182,212,0.3)' },
    { icon: '#60a5fa', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
    { icon: '#4ade80', bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)' },
    { icon: '#f87171', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)' },
    { icon: '#fbbf24', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.3)' },
    { icon: '#c084fc', bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)' },
  ];
  if (!isDark) statColors.forEach(c => { c.bg = c.bg.replace('0.15', '0.07'); c.border = '#e5e7eb'; });
  const tooltipStyle = { borderRadius: 10, border: '1px solid ' + tooltipBorder, background: tooltipBg, color: tooltipText, boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.5)' : '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: 12 };
  const areaGrad1 = isDark ? { c: '#06b6d4', o: 0.25 } : { c: '#3b82f6', o: 0.15 };
  const areaGrad2 = isDark ? { c: '#22c55e', o: 0.2 } : { c: '#22c55e', o: 0.15 };

  // ── 关闭下钻弹窗 ──
  const closeDrill = () => { setDrillDept(null); setDrillMonth(null); };

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="p-6 space-y-6">
      {/* ══════ Header ══════ */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div style={{ width: 4, height: 24, borderRadius: 999, background: 'linear-gradient(to bottom, #22d3ee, #2563eb)', boxShadow: isDark ? '0 0 10px rgba(6,182,212,0.5)' : 'none' }} />
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: titleColor }}>项目总览</h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ border: '1px solid rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.05)' }}>
              <Activity size={10} style={{ color: zlColor }} />
              <span style={{ fontSize: 10, color: zlColor, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Live</span>
            </div>
          </div>
          <p className="text-sm ml-4" style={{ color: subColor }}>PMO管理驾驶舱 · 最后更新: 2026-05-16 09:30 · 点击卡片可下钻查看详情</p>
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 rounded-lg text-sm transition-all" style={{ border: '1px solid ' + inputBorder, background: inputBg, color: inputText, outline: 'none' }}>
            <option>2026年</option><option>2025年</option>
          </select>
          <button className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-all" style={{ background: btnExportBg, boxShadow: btnExportShadow }}>导出报表</button>
        </div>
      </div>

      {/* ══════ Stats Grid — 点击卡片下钻 ══════ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsDef.map((s, i) => (
          <div
            key={s.label}
            title={s.drillLabel}
            onClick={() => navigate(s.drillPath)}
            className="rounded-xl p-4 border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
            style={{ background: cardBg, borderColor: statColors[i].border, boxShadow: cardShadow, position: 'relative' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: statColors[i].bg }}>
                <s.icon size={18} style={{ color: statColors[i].icon }} />
              </div>
              <span className={'text-xs font-bold flex items-center gap-0.5 ' + (s.up ? 'text-emerald-400' : 'text-red-400')}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{s.change}
              </span>
            </div>
            <div className="text-2xl font-bold" style={{ color: titleColor }}>{s.value}</div>
            <div className="flex items-center justify-between" style={{ marginTop: 2 }}>
              <span className="text-xs" style={{ color: '#6b7280' }}>{s.label}</span>
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: statColors[i].icon }} />
            </div>
          </div>
        ))}
      </div>

      {/* ══════ Charts Row ══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 趋势图 — 点击数据点下钻月度明细 */}
        <div className="lg:col-span-2 rounded-xl border p-5" style={{ background: cardBg, borderColor: cardBorder, boxShadow: cardShadow }}>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} style={{ color: zlColor }} />
            <h3 className="text-sm font-semibold" style={{ color: sectionTitle }}>项目趋势分析</h3>
            <span className="text-[10px] ml-auto" style={{ color: '#6b7280' }}>点击数据区域下钻月度明细</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData} onClick={(e) => { if (e && e.activeLabel) setDrillMonth(monthlyDetail.find(m => m.month === e.activeLabel) || null); }}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={areaGrad1.c} stopOpacity={areaGrad1.o} /><stop offset="95%" stopColor={areaGrad1.c} stopOpacity={0} /></linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={areaGrad2.c} stopOpacity={areaGrad2.o} /><stop offset="95%" stopColor={areaGrad2.c} stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: chartTick }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: chartTick }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="新立项" stroke={isDark ? '#06b6d4' : '#3b82f6'} fill="url(#grad1)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, stroke: isDark ? '#06b6d4' : '#3b82f6', strokeWidth: 2, fill: isDark ? '#0f1724' : '#fff', cursor: 'pointer' }} />
              <Area type="monotone" dataKey="已完成" stroke="#22c55e" fill="url(#grad2)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, stroke: '#22c55e', strokeWidth: 2, fill: isDark ? '#0f1724' : '#fff', cursor: 'pointer' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 饼图 — 点击扇区下钻 */}
        <div className="rounded-xl border p-5" style={{ background: cardBg, borderColor: cardBorder, boxShadow: cardShadow }}>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} style={{ color: isDark ? '#c084fc' : '#8b5cf6' }} />
            <h3 className="text-sm font-semibold" style={{ color: sectionTitle }}>项目状态分布</h3>
            <span className="text-[10px] ml-auto" style={{ color: '#6b7280' }}>点击扇区查看</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}
                onClick={(_, index) => { if (index >= 0) navigate('/projects?status=' + pieData[index].name); }}
              >
                {pieData.map((d, idx) => (<Cell key={idx} fill={d.color} stroke={cardBg} strokeWidth={2} style={{ cursor: 'pointer' }} />))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map((d) => (
              <div key={d.name} onClick={() => navigate('/projects?status=' + d.name)}
                className="flex items-center gap-1.5 text-xs cursor-pointer hover:underline transition-all"
                style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color, boxShadow: isDark ? '0 0 6px ' + d.color + '80' : 'none' }} />
                {d.name} {d.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ Bottom Row ══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 部门人力 — 点击柱子下钻部门详情 */}
        <div className="rounded-xl border p-5" style={{ background: cardBg, borderColor: cardBorder, boxShadow: cardShadow }}>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} style={{ color: isDark ? '#60a5fa' : '#3b82f6' }} />
            <h3 className="text-sm font-semibold" style={{ color: sectionTitle }}>部门人力和负载</h3>
            <span className="text-[10px] ml-auto" style={{ color: '#6b7280' }}>点击柱子查看详情</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={workloadData} layout="vertical" barSize={16}
              onClick={(e) => { if (e && e.activePayload) setDrillDept(e.activePayload[0].payload); }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: chartTick }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: chartYTick }} axisLine={false} tickLine={false} width={50} />
              <Tooltip contentStyle={tooltipStyle} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor={isDark ? '#06b6d4' : '#60a5fa'} />
                </linearGradient>
              </defs>
              <Bar dataKey="人力" fill="url(#barGrad)" radius={[0, 4, 4, 0]} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 近期项目 — 点击行跳转项目详情 */}
        <div className="rounded-xl border p-5" style={{ background: cardBg, borderColor: cardBorder, boxShadow: cardShadow }}>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} style={{ color: isDark ? '#fbbf24' : '#f59e0b' }} />
            <h3 className="text-sm font-semibold" style={{ color: sectionTitle }}>近期重点项目</h3>
            <span className="text-[10px] ml-auto" style={{ color: '#6b7280' }}>点击进入项目详情</span>
          </div>
          <div className="space-y-2">
            {recentProjects.map((p) => {
              const isDone = p.status === '已完成';
              return (
                <div key={p.id}
                  onClick={() => navigate('/projects/' + p.id)}
                  className="flex items-center gap-3 p-2.5 rounded-lg transition-colors cursor-pointer border border-transparent"
                  style={{ ':hover': { background: hoverBg, borderColor: hoverBorder } }}
                  onMouseEnter={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.borderColor = hoverBorder; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: isDone ? '#4ade80' : '#60a5fa', boxShadow: isDark ? '0 0 6px ' + (isDone ? 'rgba(34,197,94,0.5)' : 'rgba(59,130,246,0.5)') : 'none' }} />
                      <span className="text-sm font-medium truncate" style={{ color: isDark ? '#e2e8f0' : '#111827' }}>{p.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0" style={{
                        background: isDone ? 'rgba(52,211,153,0.1)' : 'rgba(96,165,250,0.1)',
                        color: isDone ? '#34d399' : '#60a5fa',
                        border: '1px solid ' + (isDone ? 'rgba(52,211,153,0.2)' : 'rgba(96,165,250,0.2)')
                      }}>{p.status}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs ml-3.5" style={{ color: '#6b7280' }}>
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
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 shrink-0" style={{ color: '#6b7280' }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════ Status bar ══════ */}
      <div className="flex items-center justify-between pt-2 border-t" style={{ fontSize: 11, color: statusBarText, borderColor: statusBarBorder }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: isDark ? 'rgba(6,182,212,0.6)' : '#22c55e', boxShadow: isDark ? '0 0 6px rgba(6,182,212,0.4)' : 'none' }} />系统在线
          </span>
          <span>响应时间 &lt; 120ms</span>
          <span>数据同步 3分钟前</span>
        </div>
        <span>PMO Suite v1.0 · Enterprise · 所有卡片/图表均支持下钻</span>
      </div>

      {/* ═══════════ 下钻弹窗：部门详情 ═══════════ */}
      {drillDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={closeDrill}>
          <div className="rounded-xl p-6 w-[440px] shadow-2xl animate-in" style={{ background: isDark ? '#0f1724' : '#fff', borderColor: isDark ? '#1e293b' : '#e5e7eb', border: '1px solid ' + (isDark ? '#1e293b' : '#e5e7eb') }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users size={18} style={{ color: isDark ? '#60a5fa' : '#3b82f6' }} />
                <h3 className="text-lg font-semibold" style={{ color: isDark ? '#e2e8f0' : '#111827' }}>{drillDept.name}</h3>
              </div>
              <button onClick={closeDrill} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={18} style={{ color: '#6b7280' }} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: '总人力', value: drillDept.人力 + '人', color: '#3b82f6' },
                { label: '负载率', value: drillDept.负载率 + '%', color: drillDept.负载率 >= 80 ? '#ef4444' : drillDept.负载率 >= 60 ? '#f59e0b' : '#22c55e' },
                { label: '负责项目', value: drillDept.projects + '个', color: '#8b5cf6' },
                { label: '部门成员', value: drillDept.members + '人', color: '#06b6d4' },
                { label: '平均经验', value: drillDept.avgExp, color: '#f59e0b' },
                { label: '部门负责人', value: drillDept.lead, color: '#22c55e' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f8f9fb' }}>
                  <div className="text-xs mb-1" style={{ color: '#6b7280' }}>{item.label}</div>
                  <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { closeDrill(); navigate('/resources'); }}
                className="flex-1 py-2 rounded-lg text-sm font-medium text-white transition-all"
                style={{ background: 'linear-gradient(to right, #3b82f6, #06b6d4)' }}>
                进入资源管理
              </button>
              <button onClick={() => { closeDrill(); navigate('/projects?dept=' + drillDept.name); }}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9', color: isDark ? '#e2e8f0' : '#111827' }}>
                查看项目列表
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ 下钻弹窗：月度趋势详情 ═══════════ */}
      {drillMonth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={closeDrill}>
          <div className="rounded-xl p-6 w-[520px] shadow-2xl" style={{ background: isDark ? '#0f1724' : '#fff', border: '1px solid ' + (isDark ? '#1e293b' : '#e5e7eb') }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} style={{ color: isDark ? '#22d3ee' : '#3b82f6' }} />
                <h3 className="text-lg font-semibold" style={{ color: isDark ? '#e2e8f0' : '#111827' }}>{drillMonth.month} 项目趋势详情</h3>
              </div>
              <button onClick={closeDrill} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={18} style={{ color: '#6b7280' }} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg text-center" style={{ background: isDark ? 'rgba(6,182,212,0.1)' : '#eff6ff', border: '1px solid ' + (isDark ? 'rgba(6,182,212,0.2)' : '#bfdbfe') }}>
                <div className="text-xs mb-1" style={{ color: '#6b7280' }}>新立项</div>
                <div className="text-3xl font-bold" style={{ color: isDark ? '#22d3ee' : '#3b82f6' }}>{drillMonth.新立项}</div>
              </div>
              <div className="p-4 rounded-lg text-center" style={{ background: isDark ? 'rgba(34,197,94,0.1)' : '#f0fdf4', border: '1px solid ' + (isDark ? 'rgba(34,197,94,0.2)' : '#bbf7d0') }}>
                <div className="text-xs mb-1" style={{ color: '#6b7280' }}>已完成</div>
                <div className="text-3xl font-bold" style={{ color: '#22c55e' }}>{drillMonth.已完成}</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f8f9fb' }}>
                <div className="text-xs font-semibold mb-2" style={{ color: isDark ? '#22d3ee' : '#3b82f6' }}>🆕 新立项项目</div>
                <div className="text-sm leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{drillMonth.新立项项目.split('|').join(' · ')}</div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f8f9fb' }}>
                <div className="text-xs font-semibold mb-2" style={{ color: '#22c55e' }}>✅ 完成项目</div>
                <div className="text-sm leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{drillMonth.完成项目.split('|').join(' · ')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
