import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, ChevronRight, ChevronLeft, Check, FileText, Users, Calendar, Flag, Building2 } from 'lucide-react';

const steps = [
  { id: 1, label: '基本信息', icon: FileText },
  { id: 2, label: '团队配置', icon: Users },
  { id: 3, label: '时间与预算', icon: Calendar },
  { id: 4, label: '确认提交', icon: Check },
];

export default function NewProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    dept: '',
    type: '',
    priority: '中',
    description: '',
    pm: '',
    sponsor: '',
    members: [] ,
    startDate: '',
    endDate: '',
    budget: '',
    grEnabled: true,
  });
  const [newMember, setNewMember] = useState({ name: '', role: '' });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addMember = () => {
    if (!newMember.name) return;
    update('members', [...form.members, { ...newMember }]);
    setNewMember({ name: '', role: '' });
  };

  const removeMember = (i) => {
    update('members', form.members.filter((_, idx) => idx !== i));
  };

  const canNext = () => {
    if (step === 1) return form.name && form.dept && form.type;
    if (step === 2) return form.pm;
    if (step === 3) return form.startDate && form.endDate;
    return true;
  };

  const handleSubmit = () => {
    navigate('/projects');
  };

  const Field = ({ label, required, children }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-text-primary">
        {label}{required && <span className="text-danger ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <button onClick={() => navigate('/projects')} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
        <ArrowLeft size={16} /> 返回列表
      </button>

      <div>
        <h2 className="text-2xl font-bold text-text-primary">新建项目</h2>
        <p className="text-sm text-text-secondary mt-0.5">步骤式向导创建，4 步完成项目立项</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-between bg-canvas rounded-xl border border-border-subtle p-4">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > s.id ? 'bg-emerald-500 text-white' :
                step === s.id ? 'bg-accent text-white ring-4 ring-accent/20' :
                'bg-gray-100 text-text-muted'
              }`}>
                {step > s.id ? <Check size={18} /> : <s.icon size={18} />}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                step >= s.id ? 'text-text-primary' : 'text-text-muted'
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-full h-0.5 -mt-5 ${
                step > s.id ? 'bg-emerald-300' : 'bg-gray-100'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-canvas rounded-xl border border-border-subtle p-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-5">
            <Field label="项目名称" required>
              <input value={form.name} onChange={(e) => update('name', e.target.value)}
                placeholder="如：代号·星辰 开放世界MMO"
                className="w-full px-4 py-2.5 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="归属部门" required>
                <select value={form.dept} onChange={(e) => update('dept', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border-subtle text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20">
                  <option value="">请选择</option>
                  <option>策划工作室</option><option>产品创新部</option><option>发行运营中心</option><option>数据分析中心</option><option>技术中台</option><option>财务法务中心</option>
                </select>
              </Field>
              <Field label="项目类型" required>
                <select value={form.type} onChange={(e) => update('type', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border-subtle text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20">
                  <option value="">请选择</option>
                  <option>产品研发</option><option>技术平台</option><option>数字化升级</option><option>信创改造</option><option>运维项目</option>
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="优先级">
                <div className="flex gap-2">
                  {['高','中','低'].map((p) => (
                    <button key={p} onClick={() => update('priority', p)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        form.priority === p
                          ? p === '高' ? 'border-red-300 bg-red-50 text-red-600' :
                            p === '中' ? 'border-amber-300 bg-amber-50 text-amber-600' :
                            'border-gray-300 bg-gray-50 text-gray-600'
                          : 'border-border-subtle text-text-secondary hover:border-gray-300'
                      }`}>
                      {p}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="启用 GR 里程碑">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={form.grEnabled} onChange={(e) => update('grEnabled', e.target.checked)}
                    className="w-4 h-4 rounded text-accent focus:ring-accent/20" />
                  <span className="text-sm text-text-secondary">自动创建 GR0-GR5 门禁节点</span>
                </label>
              </Field>
            </div>
            <Field label="项目描述">
              <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3}
                placeholder="简要描述项目目标、范围和预期成果..."
                className="w-full px-4 py-2.5 rounded-lg border border-border-subtle text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/20" />
            </Field>
          </div>
        )}

        {/* Step 2: Team */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="发行制作人" required>
                <input value={form.pm} onChange={(e) => update('pm', e.target.value)}
                  placeholder="输入发行制作人姓名"
                  className="w-full px-4 py-2.5 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </Field>
              <Field label="项目发起人">
                <input value={form.sponsor} onChange={(e) => update('sponsor', e.target.value)}
                  placeholder="输入项目发起人姓名"
                  className="w-full px-4 py-2.5 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </Field>
            </div>
            <Field label="核心成员">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="姓名" className="flex-1 px-3 py-2 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
                  <input value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="角色" className="flex-1 px-3 py-2 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
                  <button onClick={addMember} className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-dark transition-colors flex items-center gap-1">
                    <Plus size={14} /> 添加
                  </button>
                </div>
                {form.members.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.members.map((m, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/8 text-accent text-sm">
                        {m.name} · {m.role}
                        <button onClick={() => removeMember(i)} className="hover:text-danger transition-colors"><X size={14} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Field>
          </div>
        )}

        {/* Step 3: Timeline & Budget */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="计划开始" required>
                <input type="date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </Field>
              <Field label="计划结束" required>
                <input type="date" value={form.endDate} onChange={(e) => update('endDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </Field>
            </div>
            <Field label="项目预算（万元）">
              <input type="number" value={form.budget} onChange={(e) => update('budget', e.target.value)}
                placeholder="0" className="w-64 px-4 py-2.5 rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
            </Field>
            {form.grEnabled && (
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                <div className="flex items-center gap-2 mb-3">
                  <Flag size={16} className="text-accent" />
                  <span className="text-sm font-medium text-text-primary">GR 里程碑预览（系统自动初始化）</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  {['GR0 概念','GR1 方案','GR2 原型','GR3 集成','GR4 验收','GR5 发布'].map((g, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> {g}
                      {i < 5 && <span className="text-gray-200 mx-0.5">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
              <Check size={20} className="text-emerald-600 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-emerald-800">确认项目信息</div>
                <p className="text-xs text-emerald-600 mt-0.5">请仔细核对以下信息，提交后将进入立项审批流程</p>
              </div>
            </div>
            {[
              { label: '项目名称', value: form.name || '—' },
              { label: '归属部门', value: form.dept || '—' },
              { label: '项目类型', value: form.type || '—' },
              { label: '优先级', value: form.priority },
              { label: '发行制作人', value: form.pm || '—' },
              { label: '发起人', value: form.sponsor || '—' },
              { label: '核心成员', value: form.members.map((m) => `${m.name}(${m.role})`).join(', ') || '—' },
              { label: '计划周期', value: form.startDate && form.endDate ? `${form.startDate} 至 ${form.endDate}` : '—' },
              { label: '预算', value: form.budget ? `${form.budget}万元` : '—' },
              { label: 'GR 里程碑', value: form.grEnabled ? '已启用 GR0-GR5' : '未启用' },
            ].map((item, i) => (
              <div key={i} className="flex items-start py-2.5 border-b border-border-subtle last:border-0">
                <span className="text-sm text-text-muted w-24 shrink-0">{item.label}</span>
                <span className="text-sm text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/projects')}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-border-subtle rounded-lg text-sm text-text-secondary hover:bg-surface transition-colors">
          <ChevronLeft size={16} /> {step === 1 ? '取消' : '上一步'}
        </button>
        {step < 4 ? (
          <button disabled={!canNext()} onClick={() => setStep(step + 1)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            下一步 <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSubmit}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
            <Check size={16} /> 提交立项
          </button>
        )}
      </div>
    </div>
  );
}
