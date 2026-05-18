import { Clock, User, AlertTriangle, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';

const approvals = [
  { id: 'A2026-056', project: '代号·星辰 开放世界MMO', type: '项目变更', title: 'V2X模块预算追加申请', applicant: '林晨', dept: '策划工作室', submitted: '2026-05-15', priority: '高', status: '待审批' },
  { id: 'A2026-055', project: '代号·破晓 战术竞技', type: '里程碑评审', title: '系统设计阶段评审', applicant: '苏婉', dept: '发行运营中心', submitted: '2026-05-14', priority: '中', status: '待审批' },
  { id: 'A2026-054', project: '代号·暗潮 赛博朋克FPS', type: '项目立项', title: '二期扩容立项申请', applicant: '周恒', dept: '技术中台', submitted: '2026-05-13', priority: '高', status: '审批中' },
  { id: 'A2026-053', project: '代号·龙魂 国风动作RPG', type: '验收审批', title: '项目终验审批', applicant: '韩冰', dept: '财务法务中心', submitted: '2026-05-10', priority: '高', status: '已通过' },
  { id: 'A2026-052', project: '代号·幻塔 二次元卡牌', type: '资源申请', title: '数据工程师增援申请', applicant: '赵翼', dept: '数据分析中心', submitted: '2026-05-09', priority: '中', status: '已驳回' },
  { id: 'A2026-051', project: '代号·山海 休闲放置', type: '技术评审', title: 'AI模型选型技术评审', applicant: '唐菲', dept: '产品创新部', submitted: '2026-05-08', priority: '中', status: '已通过' },
];

const statusStyles = {
  '待审批': 'bg-amber-50 text-amber-600 border-amber-200',
  '审批中': 'bg-blue-50 text-blue-600 border-blue-200',
  '已通过': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  '已驳回': 'bg-red-50 text-red-600 border-red-200',
};

export default function ApprovalCenter() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">审批中心</h2>
          <p className="text-sm text-text-secondary mt-0.5">待处理 3 项 · 累计 56 项</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-border-subtle overflow-hidden text-sm">
            <button className="px-3 py-1.5 text-white bg-accent">待处理 (3)</button>
            <button className="px-3 py-1.5 text-text-secondary hover:bg-surface transition-colors">处理中 (1)</button>
            <button className="px-3 py-1.5 text-text-secondary hover:bg-surface transition-colors">已办结</button>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input placeholder="搜索审批..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
        </div>
        <select className="px-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm text-text-primary">
          <option>全部类型</option>
          <option>项目变更</option>
          <option>里程碑评审</option>
          <option>项目立项</option>
          <option>验收审批</option>
        </select>
        <button className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <Filter size={14} />
          更多
        </button>
      </div>

      {/* Approval Cards */}
      <div className="space-y-3">
        {approvals.map((a) => (
          <div key={a.id} className="bg-canvas rounded-xl border border-border-subtle p-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  a.status === '待审批' ? 'bg-amber-100' :
                  a.status === '已通过' ? 'bg-emerald-100' :
                  a.status === '已驳回' ? 'bg-red-100' :
                  'bg-blue-100'
                }`}>
                  {a.status === '已通过' ? <CheckCircle2 size={18} className="text-emerald-600" /> :
                   a.status === '已驳回' ? <XCircle size={18} className="text-red-600" /> :
                   a.status === '审批中' ? <Clock size={18} className="text-blue-600" /> :
                   <AlertTriangle size={18} className="text-amber-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusStyles[a.status]}`}>{a.status}</span>
                    <span className="text-xs text-text-muted">{a.type}</span>
                    <span className="text-xs text-text-muted">#{a.id}</span>
                  </div>
                  <h3 className="text-sm font-medium text-text-primary mb-1.5">{a.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Clock size={12} /> {a.submitted}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {a.applicant} · {a.dept}</span>
                    <span>关联项目: <span className="text-accent">{a.project}</span></span>
                  </div>
                </div>
              </div>
              {/* Actions for pending */}
              {a.status === '待审批' && (
                <div className="flex items-center gap-2 ml-4">
                  <button className="px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition-colors">通过</button>
                  <button className="px-3 py-1.5 border border-border-subtle text-text-secondary text-sm rounded-lg hover:bg-surface transition-colors">驳回</button>
                </div>
              )}
              {a.status === '审批中' && (
                <button className="px-3 py-1.5 bg-accent text-white text-sm rounded-lg hover:bg-accent-dark transition-colors ml-4">查看进度</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
