import { Download, Filter, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const deliveryData = [
  { month: '1月', 准时: 8, 延迟: 2 },
  { month: '2月', 准时: 9, 延迟: 1 },
  { month: '3月', 准时: 7, 延迟: 3 },
  { month: '4月', 准时: 11, 延迟: 1 },
  { month: '5月', 准时: 10, 延迟: 2 },
  { month: '6月', 准时: 8, 延迟: 3 },
  { month: '7月', 准时: 12, 延迟: 1 },
  { month: '8月', 准时: 9, 延迟: 2 },
  { month: '9月', 准时: 11, 延迟: 2 },
  { month: '10月', 准时: 10, 延迟: 1 },
  { month: '11月', 准时: 12, 延迟: 0 },
  { month: '12月', 准时: 9, 延迟: 2 },
];

const budgetData = [
  { name: '代号·星辰 MMO', budget: 2800, spent: 1960 },
  { name: '代号·破晓 竞技', budget: 1200, spent: 1104 },
  { name: '代号·幻塔 卡牌', budget: 1500, spent: 675 },
  { name: '代号·龙魂 RPG', budget: 900, spent: 870 },
  { name: 'OA改造', budget: 600, spent: 390 },
  { name: 'AI客服', budget: 1800, spent: 540 },
  { name: '安全合规', budget: 750, spent: 660 },
  { name: '代号·永恒 SLG', budget: 1100, spent: 605 },
];

const deptProjects = [
  { name: '策划工作室', value: 35, color: '#3b82f6' },
  { name: '产品创新部', value: 18, color: '#8b5cf6' },
  { name: '发行运营中心', value: 22, color: '#22c55e' },
  { name: '数据分析中心', value: 15, color: '#f59e0b' },
  { name: '其他', value: 10, color: '#94a3b8' },
];

const kpiCards = [
  { label: '项目交付率', value: '94.7%', change: '+2.1%', up: true },
  { label: '预算偏差率', value: '8.3%', change: '-1.5%', up: false },
  { label: '平均延期天数', value: '4.2天', change: '-1.8天', up: false },
  { label: '需求变更率', value: '12.5%', change: '-3.2%', up: false },
];

export default function DataAnalytics() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">数据分析</h2>
          <p className="text-sm text-text-secondary mt-0.5">项目度量与趋势分析</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm">
            <option>2026年</option>
            <option>2025年</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle text-sm hover:bg-surface transition-colors">
            <Download size={16} /> 导出
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((k, i) => (
          <div key={i} className="bg-canvas rounded-xl border border-border-subtle p-4">
            <div className="text-2xl font-bold text-text-primary">{k.value}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-text-muted">{k.label}</span>
              <span className={`text-xs font-medium ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>{k.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Delivery Stats */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">项目交付统计</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="准时" fill="#22c55e" radius={[4,4,0,0]} name="准时交付" />
              <Bar dataKey="延迟" fill="#ef4444" radius={[4,4,0,0]} name="延迟交付" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Budget vs Spent */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">预算执行对比 (万元)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={budgetData} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} width={90} />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#94a3b8" radius={[0,4,4,0]} name="预算" />
              <Bar dataKey="spent" fill="#3b82f6" radius={[0,4,4,0]} name="已支出" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Dept Distribution */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">部门项目分布</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={deptProjects} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={3}>
                {deptProjects.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trend */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">交付率趋势</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip />
              <Line type="monotone" dataKey="准时" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="准时率(%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
