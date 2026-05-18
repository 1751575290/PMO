import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { ArrowLeft, Radar, TrendingUp, Brain, Star, Target, ShieldCheck } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// 评分维度 — 来自飞书 Base 问卷体系，适配 GR 评审
const dimensions = [
  { key: 'profitForecast', name: '成本收益预测', icon: TrendingUp, weight: 20,
    desc: '项目盈利预测是否合理，流水规模、成本估算是否有数据支撑', refLink: '飞书Base·盈利预测评分' },
  { key: 'teamFit', name: '团队匹配度', icon: Target, weight: 20,
    desc: '团队是否曾制作过同级产品，经验与项目需求的匹配程度', refLink: '飞书Base·团队实力评分' },
  { key: 'marketProspect', name: '市场前景', icon: Radar, weight: 15,
    desc: '市场机会大小、竞争格局、增长潜力评估', refLink: '飞书Base·市场机会评分' },
  { key: 'milestonePlan', name: '里程碑合理性', icon: ShieldCheck, weight: 15,
    desc: '时间计划是否合理，关键路径是否清晰，缓冲是否充足', refLink: '飞书Base·里程碑评分' },
  { key: 'techFeasibility', name: '技术可行性', icon: Brain, weight: 15,
    desc: '技术方案成熟度、核心难点攻克路径、技术风险可控性', refLink: '飞书Base·综合评级' },
  { key: 'overallRisk', name: '综合风险', icon: Star, weight: 15,
    desc: '投资意愿、整体风险收益比、是否值得继续投入', refLink: '飞书Base·投资意向' },
];

// 当前 GR2 的 AI 评分数据 (满分5)
const grAiScores = [
  { dimension: '成本收益预测', score: 3.2, fullMark: 5, level: '偏低', levelColor: 'text-amber-500', comment: '流水预测偏乐观（高于行业均值约30%），成本结构尚可' },
  { dimension: '团队匹配度', score: 4.1, fullMark: 5, level: '良好', levelColor: 'text-emerald-500', comment: '核心成员有L2级自动驾驶量产经验，匹配度高' },
  { dimension: '市场前景', score: 4.5, fullMark: 5, level: '优秀', levelColor: 'text-emerald-600', comment: 'L3+市场年增速45%，竞争窗口期明确，市场空间大' },
  { dimension: '里程碑合理性', score: 3.7, fullMark: 5, level: '中等', levelColor: 'text-blue-500', comment: '整体计划合理，但集成测试缓冲仅2周，建议延长至4周' },
  { dimension: '技术可行性', score: 3.8, fullMark: 5, level: '中等', levelColor: 'text-blue-500', comment: '感知算法有明确路线，但V2X模块存在标准不确定性' },
  { dimension: '综合风险', score: 3.5, fullMark: 5, level: '中低', levelColor: 'text-amber-500', comment: '整体风险可控，建议关注MMO引擎性能优化和发行渠道依赖' },
];

// 各项详细打分拆解
const detailScores = [
  { name: '成本收益预测', '数据支撑': 3.5, '逻辑自洽': 3.0, '敏感性分析': 2.8 },
  { name: '团队匹配度', '人才质量': 4.5, '品类经验': 3.8, '团队稳定性': 4.0 },
  { name: '市场前景', '市场空间': 4.8, '竞争格局': 4.2, '增长趋势': 4.5 },
  { name: '里程碑合理性', '时间分配': 3.5, '资源匹配': 3.8, '缓冲机制': 3.2 },
  { name: '技术可行性', '方案成熟度': 4.0, '攻关路径': 3.5, '技术风险': 3.8 },
  { name: '综合风险', '投资回报': 3.5, '退出机制': 3.0, '整体把控': 4.0 },
];

const radarData = dimensions.map((d, i) => ({
  dimension: d.name,
  score: grAiScores[i].score,
  fullMark: 5,
}));

const weightedTotal = grAiScores.reduce((sum, s, i) => sum + s.score * dimensions[i].weight, 0) / 100 * 5;

export default function GRAIScoring() {
  const { projectId, grId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <button onClick={() => navigate(`/projects/${projectId}/gr/${grId}`)} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
        <ArrowLeft size={16} /> 返回 GR 审查
      </button>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-text-primary">{grId || 'GR2'} · AI 综合评分</h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-50 text-purple-600 border border-purple-200">雷达图模型</span>
          </div>
          <p className="text-sm text-text-secondary">
            关联项目: 代号·星辰 开放世界MMO · 评审阶段: {grId || 'GR2'} 原型评审
          </p>
        </div>
        <button onClick={() => navigate(`/projects/${projectId}/gr/${grId}`)}
          className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors">
          返回审查
        </button>
      </div>

      {/* Overall Score Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-accent rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white/70">AI 综合加权评分</div>
            <div className="text-4xl font-bold mt-1">{weightedTotal.toFixed(1)} <span className="text-lg font-normal text-white/60">/ 5.0</span></div>
            <div className="text-sm text-white/50 mt-1">基于飞书Base评审维度 · 6项加权计算</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60">评分等级</div>
            <div className={`text-2xl font-bold mt-1 ${weightedTotal >= 4 ? 'text-emerald-200' : weightedTotal >= 3.5 ? 'text-amber-200' : 'text-red-200'}`}>
              {weightedTotal >= 4 ? 'B+ 良好' : weightedTotal >= 3.5 ? 'B 中等偏上' : 'C 需改进'}
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart + Score Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Radar Chart */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-2">AI 评分雷达图</h3>
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#64748b' }} />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fill: '#94a3b8' }} tickCount={6} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }} />
              <RechartsRadar name="AI 评分" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              <RechartsRadar name="满分标准" dataKey="fullMark" stroke="#e5e7eb" fill="#f9fafb" fillOpacity={0.1} strokeWidth={1} strokeDasharray="4 4" />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Score breakdown cards */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">维度得分明细</h3>
          <div className="space-y-3">
            {grAiScores.map((s, i) => (
              <div key={s.dimension} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                  {React.createElement(dimensions[i].icon, { size: 16, className: 'text-purple-500' })}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-primary truncate">{s.dimension}</span>
                    <span className={`text-xs font-medium ${s.levelColor}`}>{s.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-purple-500" style={{ width: `${s.score / 5 * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-text-primary w-10 text-right">{s.score.toFixed(1)}</span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1">{s.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail sub-scores bar chart */}
      <div className="bg-canvas rounded-xl border border-border-subtle p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">各维度子指标拆解</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={detailScores} layout="vertical" barSize={12} margin={{ left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} width={90} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }} />
            <Legend />
            <Bar dataKey="数据支撑" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="逻辑自洽" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            <Bar dataKey="敏感性分析" fill="#c4b5fd" radius={[0, 4, 4, 0]} />
            <Bar dataKey="人才质量" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="品类经验" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            <Bar dataKey="团队稳定性" fill="#c4b5fd" radius={[0, 4, 4, 0]} />
            <Bar dataKey="市场空间" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="竞争格局" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            <Bar dataKey="增长趋势" fill="#c4b5fd" radius={[0, 4, 4, 0]} />
            <Bar dataKey="时间分配" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="资源匹配" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            <Bar dataKey="缓冲机制" fill="#c4b5fd" radius={[0, 4, 4, 0]} />
            <Bar dataKey="方案成熟度" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="攻关路径" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            <Bar dataKey="技术风险" fill="#c4b5fd" radius={[0, 4, 4, 0]} />
            <Bar dataKey="投资回报" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="退出机制" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            <Bar dataKey="整体把控" fill="#c4b5fd" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-text-muted mt-2 ml-[60px]">※ 评分标准基于飞书 Base「游族项目评审问卷」体系</p>
      </div>

      {/* Reference link */}
      <div className="bg-purple-50/30 rounded-xl border border-purple-100 p-4 flex items-center gap-3">
        <Brain size={18} className="text-purple-500" />
        <div>
          <div className="text-sm font-medium text-text-primary">评分维度与标准参考</div>
          <a href="https://youzu.feishu.cn/base/CyPzbugpAabo80s3yLIc9PWXnAb" target="_blank" rel="noopener" className="text-xs text-accent hover:underline">
            youzu.feishu.cn/base/CyPzbugpAabo80s3yLIc9PWXnAb
          </a>
        </div>
      </div>
    </div>
  );
}
