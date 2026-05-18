import { Users, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const workloadData = [
  { name: '林晨', dept: '策划工作室', role: '游戏制作人', projects: 4, load: 88, status: 'overload' },
  { name: '苏婉', dept: '发行运营中心', role: '发行制作人', projects: 2, load: 65, status: 'normal' },
  { name: '赵翼', dept: '数据分析中心', role: '主程', projects: 3, load: 92, status: 'overload' },
  { name: '韩冰', dept: '财务法务中心', role: '数值策划', projects: 1, load: 45, status: 'normal' },
  { name: '周恒', dept: '技术中台', role: '技术美术', projects: 3, load: 78, status: 'warning' },
  { name: '唐菲', dept: '产品创新部', role: '主策划', projects: 2, load: 72, status: 'normal' },
  { name: '陆骁', dept: '合规安全部', role: '合规风控', projects: 2, load: 55, status: 'normal' },
  { name: '沈韵', dept: '策划工作室', role: '引擎开发', projects: 3, load: 85, status: 'overload' },
  { name: '李明', dept: '测试部', role: '测试经理', projects: 4, load: 70, status: 'normal' },
  { name: '吴婷', dept: '设计部', role: 'UX设计师', projects: 3, load: 80, status: 'warning' },
];

const deptLoad = [
  { name: '研发', current: 85, capacity: 100 },
  { name: '产品', current: 42, capacity: 60 },
  { name: '设计', current: 28, capacity: 35 },
  { name: '测试', current: 36, capacity: 45 },
  { name: '运营', current: 24, capacity: 40 },
  { name: '运维', current: 18, capacity: 25 },
];

const loadColors = {
  overload: 'bg-red-500',
  warning: 'bg-amber-500',
  normal: 'bg-emerald-500',
};

const loadLabels = {
  overload: '超负荷',
  warning: '偏高',
  normal: '正常',
};

export default function ResourceManagement() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">资源管理</h2>
          <p className="text-sm text-text-secondary mt-0.5">人员负载与部门资源分布</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-sidebar text-white rounded-lg text-sm font-medium hover:bg-sidebar-hover transition-colors">
          <Users size={16} />
          资源规划
        </button>
      </div>

      {/* Department Load Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">部门资源负载</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deptLoad}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" name="当前人力" fill="#3b82f6" radius={[4,4,0,0]} barSize={24} />
              <Bar dataKey="capacity" name="编制上限" fill="#e2e8f0" radius={[4,4,0,0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">负载概览</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '总人力', value: '328人', color: 'text-text-primary' },
              { label: '平均负载', value: '72.4%', color: 'text-text-primary' },
              { label: '超负荷', value: '47人', color: 'text-danger' },
              { label: '空闲', value: '35人', color: 'text-emerald-600' },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl border border-border-subtle">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Table */}
      <div className="bg-canvas rounded-xl border border-border-subtle overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input placeholder="搜索人员..." className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
          <button className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <Filter size={14} /> 筛选
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">姓名</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">部门</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">角色</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">参与项目</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">负载率</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">状态</th>
              </tr>
            </thead>
            <tbody>
              {workloadData.map((p, i) => (
                <tr key={i} className="border-b border-border-subtle hover:bg-accent/3 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
                        {p.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-text-primary">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-text-secondary">{p.dept}</td>
                  <td className="px-5 py-3 text-sm text-text-secondary">{p.role}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 text-sm text-text-secondary bg-gray-50 px-2 py-0.5 rounded-full">
                      {p.projects} 个项目
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${p.load >= 85 ? 'bg-red-500' : p.load >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${p.load}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-text-secondary">{p.load}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      p.status === 'overload' ? 'bg-red-50 text-red-600' :
                      p.status === 'warning' ? 'bg-amber-50 text-amber-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${loadColors[p.status]}`} />
                      {loadLabels[p.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
