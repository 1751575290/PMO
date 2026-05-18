import { useState, useMemo } from 'react';
import { Calendar, Rocket, FlaskConical, Globe, Monitor, RefreshCw, Flag, TrendingUp, Filter } from 'lucide-react';

const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

// ── 在研项目（未上线，含GR/测试等里程碑） ──
const inDevProjects = [
  {
    name: '代号·星辰 开放世界MMO', pm: '林晨', dept: '策划工作室', status: '在研',
    events: [
      { id:1, label:'GR0 概念评审', start:0, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:2, label:'GR1 方案评审', start:1.5, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:3, label:'核心原型开发', start:2, span:2.5, color:'bg-blue-500', type:'开发', icon:Monitor },
      { id:4, label:'GR2 原型评审', start:4.5, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:5, label:'Alpha 技术测试', start:5, span:0.8, color:'bg-amber-500', type:'测试', icon:FlaskConical },
      { id:6, label:'引擎性能优化', start:6, span:2, color:'bg-blue-500', type:'开发', icon:Monitor },
      { id:7, label:'GR3 集成评审', start:8, span:0.5, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:8, label:'封闭Beta测试', start:8.5, span:1, color:'bg-amber-500', type:'测试', icon:FlaskConical },
      { id:9, label:'GR4 验收评审', start:9.8, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:10, label:'首发版本交付', start:10.3, span:0.5, color:'bg-emerald-500', type:'发布', icon:Rocket },
    ],
  },
  {
    name: '代号·破晓 战术竞技', pm: '苏婉', dept: '发行运营中心', status: '在研',
    events: [
      { id:1, label:'GR0 概念评审', start:0, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:2, label:'UE5选型验证', start:0.5, span:1.5, color:'bg-blue-500', type:'开发', icon:Monitor },
      { id:3, label:'GR1 方案评审', start:2, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:4, label:'核心玩法开发', start:2.5, span:3, color:'bg-blue-500', type:'开发', icon:Monitor },
      { id:5, label:'GR2 原型评审', start:5.5, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:6, label:'首次公开测试', start:6, span:0.8, color:'bg-amber-500', type:'测试', icon:FlaskConical },
      { id:7, label:'战斗平衡调优', start:7, span:1.5, color:'bg-blue-500', type:'开发', icon:Monitor },
      { id:8, label:'GR3 集成评审', start:8.5, span:0.5, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:9, label:'压力测试', start:9.2, span:0.8, color:'bg-amber-500', type:'测试', icon:FlaskConical },
    ],
  },
  {
    name: '代号·龙魂 国风动作RPG', pm: '韩冰', dept: '策划工作室', status: '在研',
    events: [
      { id:1, label:'GR0 概念评审', start:0.5, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:2, label:'GR1 方案评审', start:2, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:3, label:'动作系统开发', start:2.5, span:3, color:'bg-blue-500', type:'开发', icon:Monitor },
      { id:4, label:'GR2 原型评审', start:5.5, span:0.4, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:5, label:'Alpha内部测试', start:6, span:0.8, color:'bg-amber-500', type:'测试', icon:FlaskConical },
      { id:6, label:'剧情管线生产', start:7, span:2, color:'bg-pink-400', type:'制作', icon:Monitor },
      { id:7, label:'GR3 集成评审', start:9, span:0.5, color:'bg-purple-500', type:'GR', icon:Flag },
    ],
  },
  {
    name: '代号·暗潮 赛博朋克FPS', pm: '周恒', dept: '技术中台', status: '在研',
    events: [
      { id:1, label:'GR0 概念评审', start:1, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:2, label:'GR1 方案评审', start:3, span:0.3, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:3, label:'地图场景开发', start:3.5, span:3, color:'bg-blue-500', type:'开发', icon:Monitor },
      { id:4, label:'GR2 原型评审', start:6.5, span:0.4, color:'bg-purple-500', type:'GR', icon:Flag },
      { id:5, label:'首次射击测试', start:7, span:0.8, color:'bg-amber-500', type:'测试', icon:FlaskConical },
    ],
  },
];

// ── 在营项目（已上线，含运营事件/地区上线等） ──
const liveProjects = [
  {
    name: '代号·幻塔 二次元卡牌', pm: '赵翼', dept: '产品创新部', status: '在营',
    events: [
      { id:1, label:'国服上线·iOS+安卓', start:0, span:0.4, color:'bg-emerald-500', type:'上线', icon:Rocket },
      { id:2, label:'v1.1 夏日活动', start:0.5, span:0.5, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:3, label:'日服·东京上线', start:1.5, span:0.4, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:4, label:'v2.0 周年版本', start:2.5, span:0.5, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:5, label:'韩服·首尔上线', start:3.5, span:0.4, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:6, label:'v2.2 联动活动', start:4.5, span:0.8, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:7, label:'东南亚服·上线', start:6, span:0.5, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:8, label:'v3.0 大版本更新', start:7.5, span:0.6, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:9, label:'欧美服·洛杉矶上线', start:8.8, span:0.4, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:10, label:'周年庆典·全民活动', start:10, span:0.8, color:'bg-fuchsia-500', type:'大促', icon:TrendingUp },
    ],
  },
  {
    name: '代号·山海 休闲放置', pm: '唐菲', dept: '产品创新部', status: '在营',
    events: [
      { id:1, label:'国服双端上线', start:0, span:0.4, color:'bg-emerald-500', type:'上线', icon:Rocket },
      { id:2, label:'v1.2 航海版本', start:1, span:0.5, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:3, label:'中国台湾服上线', start:2.5, span:0.4, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:4, label:'v2.0 家园系统', start:3.5, span:0.7, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:5, label:'中国香港·新马上线', start:5, span:0.5, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:6, label:'v2.5 春节活动', start:6.5, span:0.8, color:'bg-fuchsia-500', type:'大促', icon:TrendingUp },
      { id:7, label:'日服·大阪上线', start:8, span:0.4, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:8, label:'v3.0 社交大改', start:9, span:1, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
    ],
  },
  {
    name: '代号·永恒 策略SLG', pm: '沈韵', dept: '发行运营中心', status: '在营',
    events: [
      { id:1, label:'国服安卓先锋上线', start:0.2, span:0.4, color:'bg-emerald-500', type:'上线', icon:Rocket },
      { id:2, label:'国服iOS补上', start:0.8, span:0.3, color:'bg-emerald-500', type:'上线', icon:Rocket },
      { id:3, label:'S1赛季·群雄逐鹿', start:1.3, span:1.2, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:4, label:'韩国·首尔上线', start:3, span:0.4, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:5, label:'S2赛季·三国争霸', start:3.8, span:1.2, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:6, label:'东南亚·泰越上线', start:5.5, span:0.5, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:7, label:'S3赛季·逐鹿中原', start:6.5, span:1.2, color:'bg-cyan-500', type:'运营', icon:RefreshCw },
      { id:8, label:'欧美服·伦敦上线', start:8.2, span:0.4, color:'bg-emerald-500', type:'上线', icon:Globe },
      { id:9, label:'全服联盟战', start:9.2, span:0.8, color:'bg-fuchsia-500', type:'大促', icon:TrendingUp },
    ],
  },
];

const allProjects = [...inDevProjects, ...liveProjects];

const typeConfig = {
  'GR': { label:'GR评审', bg:'bg-purple-100 text-purple-600', dot:'bg-purple-500' },
  '开发': { label:'开发', bg:'bg-blue-100 text-blue-600', dot:'bg-blue-500' },
  '制作': { label:'制作', bg:'bg-pink-100 text-pink-600', dot:'bg-pink-400' },
  '测试': { label:'测试', bg:'bg-amber-100 text-amber-600', dot:'bg-amber-500' },
  '发布': { label:'发布', bg:'bg-emerald-100 text-emerald-600', dot:'bg-emerald-500' },
  '上线': { label:'上线', bg:'bg-emerald-100 text-emerald-600', dot:'bg-emerald-500' },
  '运营': { label:'运营', bg:'bg-cyan-100 text-cyan-600', dot:'bg-cyan-500' },
  '大促': { label:'大促', bg:'bg-fuchsia-100 text-fuchsia-600', dot:'bg-fuchsia-500' },
};

export default function GanttChart() {
  const [filter, setFilter] = useState('all'); // all | inDev | live

  const displayProjects = useMemo(() => {
    if (filter === 'inDev') return inDevProjects;
    if (filter === 'live') return liveProjects;
    return allProjects;
  }, [filter]);

  const inDevCount = inDevProjects.length;
  const liveCount = liveProjects.length;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">项目规划</h2>
          <p className="text-sm text-text-secondary mt-0.5">产品生命周期里程碑 · 2026年度</p>
        </div>
        <select className="px-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm text-text-primary">
          <option>2026年</option>
          <option>2025年</option>
        </select>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3">
        <div className="flex rounded-lg border border-border-subtle bg-surface overflow-hidden">
          {[
            { key:'all', label:'全部项目', count: inDevCount + liveCount },
            { key:'inDev', label:'在研项目', count: inDevCount },
            { key:'live', label:'在营项目', count: liveCount },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.key ? 'bg-sidebar text-white' : 'text-text-secondary hover:text-text-primary'
              }`}>
              {f.label} <span className="ml-1 text-xs opacity-70">({f.count})</span>
            </button>
          ))}
        </div>
        <span className="text-xs text-text-muted flex items-center gap-1"><Filter size={12}/>点击项目条查看详情</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5">
        {Object.entries(typeConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <div className={`w-2.5 h-2.5 rounded ${cfg.dot}`} />
            {cfg.label}
          </div>
        ))}
      </div>

      {/* Timeline Chart */}
      <div className="bg-canvas rounded-xl border border-border-subtle overflow-hidden">
        {/* Header */}
        <div className="flex border-b border-border-subtle bg-surface/50">
          <div className="w-56 shrink-0 px-4 py-2.5 text-xs font-medium text-text-muted border-r border-border-subtle">项目</div>
          <div className="flex-1 flex">
            {months.map(m => (
              <div key={m} className="flex-1 px-1 py-2.5 text-center text-xs font-medium text-text-muted border-r border-border-subtle last:border-r-0">
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {displayProjects.map((project, pi) => (
          <div key={pi} className="border-b border-border-subtle last:border-b-0">
            <div className="flex">
              {/* Project info */}
              <div className="w-56 shrink-0 px-4 py-3 border-r border-border-subtle bg-surface/20">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${project.status === '在研' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  <span className="text-sm font-medium text-text-primary truncate" title={project.name}>{project.name}</span>
                </div>
                <div className="text-xs text-text-muted flex items-center gap-2">
                  <span>PM: {project.pm}</span>
                  <span className={'text-[10px] px-1.5 py-0.5 rounded ' + (project.status === '在研' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600')}>
                    {project.status === '在研' ? '🔬在研' : '🎮在营'}
                  </span>
                </div>
              </div>

              {/* Bars area */}
              <div className="flex-1 relative" style={{ height: project.events.length > 6 ? 72 : 54 }}>
                {project.events.map((ev, i) => {
                  const topOffset = 6 + (i % 3) * 18;
                  return (
                    <div key={ev.id}
                      className="absolute rounded-md cursor-pointer group"
                      style={{
                        left: `${(ev.start / 12) * 100}%`,
                        width: `${(ev.span / 12) * 100}%`,
                        top: topOffset,
                        height: 14,
                      }}
                      title={`${ev.label} · ${project.name}`}
                    >
                      <div className={`h-full rounded-md ${ev.color} opacity-85 hover:opacity-100 transition-opacity flex items-center px-1.5 shadow-sm`}>
                        <ev.icon size={10} className="text-white/80 mr-1 shrink-0" />
                        <span className="text-[9px] text-white font-medium truncate drop-shadow-sm">{ev.label}</span>
                      </div>
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-sidebar text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                        {ev.label}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-sidebar" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'在研项目', value: inDevCount + '个', icon: Monitor, color:'text-amber-500', note:'含GR评审中' },
          { label:'在营项目', value: liveCount + '个', icon: Globe, color:'text-emerald-500', note:'多地区运营' },
          { label:'年度里程碑', value: displayProjects.reduce((s,p)=>s+p.events.length,0)+'项', icon: Flag, color:'text-purple-500', note:'跨品类覆盖' },
          { label:'时间跨度', value:'12个月', icon: Calendar, color:'text-accent', note:'2026年度' },
        ].map((s, i) => (
          <div key={i} className="bg-canvas rounded-xl border border-border-subtle p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className={s.color} />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
            <div className="text-xl font-bold text-text-primary">{s.value}</div>
            <div className="text-[10px] text-text-muted mt-0.5">{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
