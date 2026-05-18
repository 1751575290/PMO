import { ShieldAlert, Search, Plus, Filter, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';

const risks = [
  { id: 'R2026-012', project: '代号·星辰 开放世界MMO', desc: '感知算法准确率未达预期指标', level: '高', probability: 70, impact: 90, owner: '刘伟', mitigation: '引入多模态融合方案', status: '监控中', date: '2026-05-10' },
  { id: 'R2026-011', project: '代号·星辰 开放世界MMO', desc: 'V2X车路协同标准尚未统一', level: '中', probability: 45, impact: 60, owner: '王芳', mitigation: '采用兼容适配层设计', status: '监控中', date: '2026-05-08' },
  { id: 'R2026-010', project: '代号·破晓 战术竞技', desc: '供应商接口对接延迟', level: '高', probability: 60, impact: 80, owner: '苏婉', mitigation: '增加资源并行推进', status: '处置中', date: '2026-05-07' },
  { id: 'R2026-009', project: '代号·幻塔 二次元卡牌', desc: '数据迁移质量不达标', level: '中', probability: 50, impact: 70, owner: '赵翼', mitigation: '分批迁移+验证', status: '监控中', date: '2026-05-05' },
  { id: 'R2026-008', project: '代号·山海 休闲放置', desc: '模型训练样本不足', level: '高', probability: 65, impact: 75, owner: '唐菲', mitigation: '扩充数据采集渠道', status: '处置中', date: '2026-05-03' },
  { id: 'R2026-007', project: '代号·暗潮 赛博朋克FPS', desc: '国产中间件性能瓶颈', level: '中', probability: 40, impact: 55, owner: '周恒', mitigation: '性能压测+优化', status: '已关闭', date: '2026-04-28' },
];

const levelColors = { '高': '#ef4444', '中': '#f59e0b', '低': '#22c55e' };
const levelBg = { '高': 'bg-red-50 text-red-600', '中': 'bg-amber-50 text-amber-600', '低': 'bg-emerald-50 text-emerald-600' };
const statusBg = { '监控中': 'bg-blue-50 text-blue-600', '处置中': 'bg-amber-50 text-amber-600', '已关闭': 'bg-gray-50 text-gray-500' };

// Transform data for scatter chart
const scatterData = risks.map(r => ({ x: r.probability, y: r.impact, level: r.level, name: r.desc.substring(0, 10) + '...' }));

export default function RiskManagement() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">风险管理</h2>
          <p className="text-sm text-text-secondary mt-0.5">活跃风险 6 项 · 高等级 3 项</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-sidebar text-white rounded-lg text-sm font-medium hover:bg-sidebar-hover transition-colors">
          <Plus size={16} />
          登记风险
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk Matrix */}
        <div className="lg:col-span-2 bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">风险矩阵</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" dataKey="x" name="概率" unit="%" domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} label={{ value: '发生概率 (%)', position: 'bottom', fontSize: 12, fill: '#94a3b8' }} />
              <YAxis type="number" dataKey="y" name="影响" unit="%" domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} label={{ value: '影响程度 (%)', angle: -90, position: 'left', fontSize: 12, fill: '#94a3b8' }} />
              <ZAxis range={[80, 80]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={scatterData} fill="#3b82f6">
                {scatterData.map((entry, index) => (
                  <Cell key={index} fill={levelColors[entry.level]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          {[
            { label: '高等级', value: 3, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
            { label: '中等级', value: 2, icon: ShieldAlert, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: '处置中', value: 2, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: '已关闭', value: 1, icon: TrendingDown, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          ].map((s, i) => (
            <div key={i} className="bg-canvas rounded-xl border border-border-subtle p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div>
                <div className="text-xl font-bold text-text-primary">{s.value}</div>
                <div className="text-xs text-text-muted">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Table */}
      <div className="bg-canvas rounded-xl border border-border-subtle overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input placeholder="搜索风险..." className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
          <button className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"><Filter size={14} />筛选</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle bg-surface/50">
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">风险编号</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">风险描述</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">等级</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">关联项目</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">负责人</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">应对措施</th>
                <th className="text-left text-xs font-medium text-text-muted uppercase px-5 py-3">状态</th>
                <th className="w-10 px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.id} className="border-b border-border-subtle hover:bg-accent/3 transition-colors">
                  <td className="px-5 py-3 text-sm text-text-muted font-mono">{r.id}</td>
                  <td className="px-5 py-3 text-sm text-text-primary max-w-[200px]">
                    <div className="truncate">{r.desc}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelBg[r.level]}`}>{r.level}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-text-secondary">{r.project}</td>
                  <td className="px-5 py-3 text-sm text-text-secondary">{r.owner}</td>
                  <td className="px-5 py-3 text-sm text-accent max-w-[180px] truncate">{r.mitigation}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBg[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-text-muted hover:text-text-primary transition-colors"><MoreHorizontal size={16} /></button>
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
