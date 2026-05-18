import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, DollarSign, Flag, Calendar, Paperclip, MessageSquare, Download, Share2, MoreHorizontal, CheckCircle2, Circle, CircleDot, Timer, UserCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const project = {
  id: 'P2026-001',
  name: '代号·星辰 开放世界MMO',
  desc: '打造新一代开放世界MMO手游，探索无缝大世界与AI驱动叙事，支持L3+自动驾驶场景，覆盖高速公路、城市道路及停车场三大场景。',
  dept: '策划工作室',
  pm: '林晨',
  sponsor: 'CTO 赵志强',
  status: '进行中',
  priority: '高',
  progress: 78,
  budget: '2,800万',
  spent: '1,960万',
  budgetUsage: 70,
  members: 24,
  startDate: '2026-01-15',
  endDate: '2026-09-30',
  daysLeft: 137,
};

const milestones = [
  { name: '需求评审', date: '2026-01-30', done: true },
  { name: '架构设计', date: '2026-03-15', done: true },
  { name: '核心模块开发', date: '2026-06-30', done: false },
  { name: '系统集成测试', date: '2026-08-15', done: false },
  { name: '验收交付', date: '2026-09-30', done: false },
];

const grMilestones = [
  {
    id: 'GR0', name: '概念评审',
    date: '2026-01-28', status: 'passed',
    reviewer: 'CTO 赵志强', reviewerRole: '技术委员会',
    criteria: '市场需求验证、技术可行性评估、资源初步估算',
    decision: '批准进入方案阶段',
    duration: '3周',
  },
  {
    id: 'GR1', name: '方案评审',
    date: '2026-03-10', status: 'passed',
    reviewer: 'CTO 赵志强', reviewerRole: '技术委员会',
    criteria: '系统架构方案、核心技术选型、详细资源计划',
    decision: '批准进入开发阶段',
    duration: '6周',
  },
  {
    id: 'GR2', name: '原型评审',
    date: '2026-05-20', status: 'active',
    reviewer: 'VP 产品 陈志远', reviewerRole: '产品委员会',
    criteria: '核心功能原型验证、性能基准测试、UI/UX走查',
    decision: '待评审',
    duration: '10周',
  },
  {
    id: 'GR3', name: '集成评审',
    date: '2026-07-25', status: 'upcoming',
    reviewer: 'VP 产品 陈志远', reviewerRole: '产品委员会',
    criteria: '系统集成完成、全链路测试通过、安全评审',
    decision: '—',
    duration: '8周',
  },
  {
    id: 'GR4', name: '验收评审',
    date: '2026-09-10', status: 'upcoming',
    reviewer: 'CEO 王一鸣', reviewerRole: '管理层',
    criteria: '产品验收测试、UAT用户验收、文档交付',
    decision: '—',
    duration: '7周',
  },
  {
    id: 'GR5', name: '量产发布',
    date: '2026-09-30', status: 'upcoming',
    reviewer: 'CEO 王一鸣', reviewerRole: '管理层',
    criteria: '量产准备就绪、发布就绪检查、运营交接完成',
    decision: '—',
    duration: '3周',
  },
];

const tasks = [
  { name: '感知算法优化', assignee: '刘伟', status: '进行中', priority: '高', deadline: '2026-05-30' },
  { name: '决策规划模块开发', assignee: '陈明', status: '进行中', priority: '高', deadline: '2026-06-15' },
  { name: 'V2X通信协议集成', assignee: '王芳', status: '待开始', priority: '中', deadline: '2026-07-01' },
  { name: '数据标注平台搭建', assignee: '李强', status: '已完成', priority: '中', deadline: '2026-04-20' },
  { name: '安全冗余设计', assignee: '赵刚', status: '进行中', priority: '高', deadline: '2026-06-10' },
];

const risks = [
  { level: '高', desc: '感知算法准确率未达预期指标', owner: '刘伟', mitigation: '引入多模态融合方案' },
  { level: '中', desc: 'V2X车路协同标准尚未统一', owner: '王芳', mitigation: '采用兼容适配层设计' },
];

const progressData = [
  { week: 'W1', planned: 5, actual: 5 },
  { week: 'W4', planned: 20, actual: 18 },
  { week: 'W8', planned: 40, actual: 38 },
  { week: 'W12', planned: 60, actual: 55 },
  { week: 'W16', planned: 80, actual: 74 },
  { week: 'W20', planned: 95, actual: 78 },
];

const statusColors = { '进行中': 'bg-blue-50 text-blue-600', '待开始': 'bg-gray-50 text-gray-500', '已完成': 'bg-emerald-50 text-emerald-600' };
const priorityColors = { '高': 'bg-red-50 text-red-600', '中': 'bg-amber-50 text-amber-600', '低': 'bg-gray-50 text-gray-600' };
const riskColors = { '高': 'bg-red-500', '中': 'bg-amber-500', '低': 'bg-emerald-500' };

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Back + Header */}
      <button onClick={() => navigate('/projects')} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
        <ArrowLeft size={16} /> 返回列表
      </button>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-text-primary">{project.name}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[project.status]}`}>{project.status}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[project.priority]}`}>{project.priority}优先级</span>
          </div>
          <p className="text-sm text-text-secondary max-w-2xl">{project.desc}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border-subtle text-text-secondary hover:bg-surface transition-colors"><Share2 size={16} /></button>
          <button className="p-2 rounded-lg border border-border-subtle text-text-secondary hover:bg-surface transition-colors"><Download size={16} /></button>
          <button className="p-2 rounded-lg border border-border-subtle text-text-secondary hover:bg-surface transition-colors"><MoreHorizontal size={16} /></button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[
          { icon: Flag, label: '项目编号', value: project.id },
          { icon: Clock, label: '剩余天数', value: `${project.daysLeft}天` },
          { icon: DollarSign, label: '预算使用', value: `${project.budgetUsage}%` },
          { icon: Users, label: '团队成员', value: `${project.members}人` },
          { icon: Calendar, label: '开始日期', value: project.startDate },
          { icon: Calendar, label: '截止日期', value: project.endDate },
          { icon: Users, label: '发行制作人', value: project.pm },
        ].map((m, i) => (
          <div key={i} className="bg-canvas rounded-xl border border-border-subtle p-4">
            <m.icon size={16} className="text-text-muted mb-2" />
            <div className="text-lg font-bold text-text-primary">{m.value}</div>
            <div className="text-xs text-text-muted mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* GR Milestones Timeline */}
      <div className="bg-canvas rounded-xl border border-border-subtle p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">GR 里程碑 · Gate Review</h3>
            <p className="text-xs text-text-muted mt-0.5">6 个门禁节点 · 当前阶段: GR2 原型评审</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> 已通过</span>
            <span className="flex items-center gap-1.5"><CircleDot size={12} className="text-accent" /> 当前节点</span>
            <span className="flex items-center gap-1.5"><Circle size={12} className="text-text-muted" /> 待开始</span>
          </div>
        </div>

        {/* Timeline track */}
        <div className="relative">
          {/* Background track */}
          <div className="absolute top-[60px] left-0 right-0 h-1 bg-gray-100 rounded-full" />
          {/* Progress track */}
          <div className="absolute top-[60px] left-0 h-1 bg-accent rounded-full transition-all" style={{ width: '33%' }} />

          {/* GR nodes */}
          <div className="flex justify-between relative">
            {grMilestones.map((gr, i) => {
              const Icon = gr.status === 'passed' ? CheckCircle2 : gr.status === 'active' ? CircleDot : Circle;
              const iconColor = gr.status === 'passed'
                ? 'text-emerald-500'
                : gr.status === 'active'
                  ? 'text-accent'
                  : 'text-text-muted';
              const cardBorder = gr.status === 'active'
                ? 'border-accent shadow-md shadow-accent/5'
                : gr.status === 'passed'
                  ? 'border-emerald-200'
                  : 'border-border-subtle';
              const bgAccent = gr.status === 'active'
                ? 'bg-accent/5'
                : gr.status === 'passed'
                  ? 'bg-emerald-50/50'
                  : 'bg-surface/50';

              return (
                <div key={gr.id} className="flex flex-col items-center group" style={{ width: `${100 / grMilestones.length}%`, minWidth: 0 }}>
                  {/* Connector line up to icon */}
                  <div className={`h-[28px] w-0.5 mb-0 ${gr.status === 'upcoming' ? 'bg-gray-100' : 'bg-accent'}`} />
                  
                  {/* Icon with hover date tooltip */}
                  <div className="relative">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center z-10 ring-4 ring-white cursor-pointer transition-transform hover:scale-110 ${
                      gr.status === 'active' ? 'bg-accent' : 'bg-white'
                    } ${gr.status === 'upcoming' ? 'border-2 border-gray-200' : ''}`}>
                      <Icon size={20} className={iconColor} />
                    </div>
                    {/* Hover tooltip - date */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-sidebar text-white text-[10px] px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
                      {gr.date}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-sidebar" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`mt-3 mx-1 p-3 rounded-xl border ${cardBorder} ${bgAccent} w-full max-w-[150px] relative group/card`}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        gr.status === 'active' ? 'bg-accent text-white' :
                        gr.status === 'passed' ? 'bg-emerald-500 text-white' :
                        'bg-gray-100 text-text-muted'
                      }`}>
                        {gr.id}
                      </span>
                      <span className={`text-[11px] font-semibold truncate ${gr.status === 'upcoming' ? 'text-text-muted' : 'text-text-primary'}`}>
                        {gr.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-text-muted leading-relaxed mb-2">{gr.date}</div>
                    <div className="flex items-center gap-1 text-[10px] text-text-muted mb-1">
                      <Timer size={10} />
                      <span>{gr.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-text-muted">
                      <UserCheck size={10} />
                      <span className="truncate">{gr.reviewer}</span>
                    </div>

                    {/* Hover "申请过会" button - only show for active or passed nodes */}
                    {(gr.status === 'active' || gr.status === 'passed') && (
                      <div className="absolute inset-0 bg-white/90 rounded-xl flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/projects/${id}/gr/${gr.id}`); }}
                          className="px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-dark transition-colors shadow-sm"
                        >
                          申请过会
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expanded detail for current GR */}
        <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent text-white">GR2 · 当前节点</span>
            <span className="text-sm font-semibold text-text-primary">原型评审</span>
            <span className="text-xs text-text-muted ml-auto">2026-05-20</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-xs text-text-muted mb-1">评审标准</div>
              <div className="text-text-primary">核心功能原型验证、性能基准测试、UI/UX走查</div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1">评审人</div>
              <div className="text-text-primary">VP 产品 陈志远 <span className="text-text-muted text-xs">· 产品委员会</span></div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1">阶段耗时</div>
              <div className="text-text-primary">10周 <span className="text-xs text-text-muted">(自 GR1 通过)</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">进度跟踪</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="planned" stroke="#94a3b8" fill="#f1f5f9" strokeWidth={2} strokeDasharray="4 4" name="计划进度" />
              <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="url(#gradActual)" strokeWidth={2} name="实际进度" />
              <defs>
                <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risks */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">风险登记</h3>
          <div className="space-y-3">
            {risks.map((r, i) => (
              <div key={i} className="p-3 rounded-lg bg-surface/50 border border-border-subtle">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-2 h-2 rounded-full ${riskColors[r.level]}`} />
                  <span className="text-xs font-medium text-text-secondary">{r.level}风险</span>
                </div>
                <p className="text-sm text-text-primary mb-2">{r.desc}</p>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>负责人: {r.owner}</span>
                  <span className="text-accent">→ {r.mitigation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks + Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tasks */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">关键任务</h3>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-text-muted border-b border-border-subtle">
                <th className="text-left pb-2.5 font-medium">任务</th>
                <th className="text-left pb-2.5 font-medium">负责人</th>
                <th className="text-left pb-2.5 font-medium">状态</th>
                <th className="text-right pb-2.5 font-medium">截止</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t, i) => (
                <tr key={i} className="border-b border-border-subtle last:border-0">
                  <td className="py-2.5 text-sm text-text-primary">{t.name}</td>
                  <td className="py-2.5 text-sm text-text-secondary">{t.assignee}</td>
                  <td className="py-2.5"><span className={`text-xs px-1.5 py-0.5 rounded font-medium ${statusColors[t.status]}`}>{t.status}</span></td>
                  <td className="py-2.5 text-xs text-text-muted text-right">{t.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Milestones */}
        <div className="bg-canvas rounded-xl border border-border-subtle p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">里程碑</h3>
          <div className="relative pl-6 space-y-1">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />
            {milestones.map((m, i) => (
              <div key={i} className="relative pb-5 last:pb-0">
                <div className={`absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full border-2 ${m.done ? 'bg-accent border-accent' : 'bg-white border-gray-300'}`} />
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${m.done ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>{m.name}</span>
                  <span className="text-xs text-text-muted">{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments placeholder */}
      <div className="bg-canvas rounded-xl border border-border-subtle p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={16} className="text-text-muted" />
          <h3 className="text-sm font-semibold text-text-primary">项目评论</h3>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold shrink-0">张</div>
          <div className="flex-1">
            <textarea
              placeholder="添加评论或更新..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <div className="flex items-center justify-between mt-2">
              <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors">
                <Paperclip size={14} /> 附件
              </button>
              <button className="px-3 py-1.5 bg-accent text-white text-sm rounded-lg hover:bg-accent-dark transition-colors">发布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
