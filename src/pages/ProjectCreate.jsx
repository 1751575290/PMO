import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, FileText, Users, Calendar, Flag,
  Plus, Trash2,
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { DEPARTMENT_OPTIONS, formatBudget } from '../data/projects';

const STEPS = [
  { title: '基本信息', subtitle: '项目名称与归属', icon: FileText },
  { title: '团队配置', subtitle: '负责人与优先级', icon: Users },
  { title: '计划预算', subtitle: '时间与资源', icon: Calendar },
  { title: '里程碑', subtitle: '关键节点规划', icon: Flag },
  { title: '确认提交', subtitle: '核对并创建', icon: Check },
];

const EMPTY_FORM = {
  name: '',
  desc: '',
  dept: '',
  pm: '',
  sponsor: '',
  status: '计划中',
  priority: '中',
  startDate: '',
  endDate: '',
  budgetAmount: '',
  members: '',
  milestones: [{ name: '', date: '' }],
};

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-border-subtle bg-canvas text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20';
const labelClass = 'block text-sm font-medium text-text-primary mb-1.5';

function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-text-muted mt-1">{hint}</p>}
    </div>
  );
}

function validateStep(step, form) {
  switch (step) {
    case 0:
      return form.name.trim() && form.dept;
    case 1:
      return form.pm.trim();
    case 2:
      return (
        form.startDate &&
        form.endDate &&
        form.endDate >= form.startDate &&
        Number(form.budgetAmount) > 0 &&
        Number(form.members) > 0
      );
    case 3:
      return true;
    default:
      return true;
  }
}

export default function ProjectCreate() {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const canNext = validateStep(step, form);

  const goNext = () => {
    if (canNext && step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else navigate('/projects');
  };

  const addMilestone = () => {
    update({ milestones: [...form.milestones, { name: '', date: '' }] });
  };

  const updateMilestone = (index, field, value) => {
    const milestones = form.milestones.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    update({ milestones });
  };

  const removeMilestone = (index) => {
    if (form.milestones.length <= 1) {
      update({ milestones: [{ name: '', date: '' }] });
      return;
    }
    update({ milestones: form.milestones.filter((_, i) => i !== index) });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const project = addProject({
      ...form,
      budget: formatBudget(form.budgetAmount),
    });
    setSubmitting(false);
    navigate(`/projects/${project.id}`, { replace: true });
  };

  const filledMilestones = form.milestones.filter((m) => m.name.trim());

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate('/projects')}
          className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">新建项目</h2>
          <p className="text-sm text-text-secondary mt-0.5">分步填写项目信息，完成后将加入项目列表</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.title} className="flex flex-col items-center flex-1 relative">
                {i > 0 && (
                  <div
                    className={`absolute right-1/2 top-4 w-full h-0.5 -translate-y-1/2 ${
                      done || active ? 'bg-accent' : 'bg-border-subtle'
                    }`}
                    style={{ width: 'calc(100% - 2rem)', right: '50%' }}
                  />
                )}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    done
                      ? 'bg-accent text-white'
                      : active
                        ? 'bg-accent text-white ring-4 ring-accent/20'
                        : 'bg-surface border border-border-subtle text-text-muted'
                  }`}
                >
                  {done ? <Check size={16} /> : <Icon size={14} />}
                </div>
                <p className={`text-xs mt-2 font-medium hidden sm:block ${active ? 'text-accent' : 'text-text-muted'}`}>
                  {s.title}
                </p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-text-secondary">
          步骤 {step + 1}/{STEPS.length}：{STEPS[step].subtitle}
        </p>
      </div>

      {/* Form card */}
      <div className="bg-canvas rounded-xl border border-border-subtle p-6 shadow-sm">
        {step === 0 && (
          <div className="space-y-5">
            <Field label="项目名称" required>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="例如：代号·星辰 开放世界MMO"
              />
            </Field>
            <Field label="项目描述" hint="可选，便于团队了解项目背景">
              <textarea
                className={`${inputClass} min-h-[100px] resize-y`}
                value={form.desc}
                onChange={(e) => update({ desc: e.target.value })}
                placeholder="简要描述项目目标与范围..."
              />
            </Field>
            <Field label="所属部门" required>
              <select
                className={inputClass}
                value={form.dept}
                onChange={(e) => update({ dept: e.target.value })}
              >
                <option value="">请选择部门</option>
                {DEPARTMENT_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <Field label="发行制作人 (PM)" required>
              <input
                className={inputClass}
                value={form.pm}
                onChange={(e) => update({ pm: e.target.value })}
                placeholder="负责人姓名"
              />
            </Field>
            <Field label="项目发起人" hint="可选">
              <input
                className={inputClass}
                value={form.sponsor}
                onChange={(e) => update({ sponsor: e.target.value })}
                placeholder="例如：CTO 赵志强"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="项目状态">
                <select
                  className={inputClass}
                  value={form.status}
                  onChange={(e) => update({ status: e.target.value })}
                >
                  <option value="计划中">计划中</option>
                  <option value="进行中">进行中</option>
                  <option value="暂停">暂停</option>
                </select>
              </Field>
              <Field label="优先级">
                <select
                  className={inputClass}
                  value={form.priority}
                  onChange={(e) => update({ priority: e.target.value })}
                >
                  <option value="高">高</option>
                  <option value="中">中</option>
                  <option value="低">低</option>
                </select>
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="开始日期" required>
                <input
                  type="date"
                  className={inputClass}
                  value={form.startDate}
                  onChange={(e) => update({ startDate: e.target.value })}
                />
              </Field>
              <Field label="结束日期" required>
                <input
                  type="date"
                  className={inputClass}
                  value={form.endDate}
                  min={form.startDate || undefined}
                  onChange={(e) => update({ endDate: e.target.value })}
                />
              </Field>
            </div>
            {form.startDate && form.endDate && form.endDate < form.startDate && (
              <p className="text-xs text-danger">结束日期不能早于开始日期</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Field label="预算（万元）" required hint="将显示为「X万」格式">
                <input
                  type="number"
                  min="1"
                  className={inputClass}
                  value={form.budgetAmount}
                  onChange={(e) => update({ budgetAmount: e.target.value })}
                  placeholder="例如：1200"
                />
              </Field>
              <Field label="团队人数" required>
                <input
                  type="number"
                  min="1"
                  className={inputClass}
                  value={form.members}
                  onChange={(e) => update({ members: e.target.value })}
                  placeholder="例如：16"
                />
              </Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              添加关键里程碑节点（可选，可跳过直接进入确认）
            </p>
            {form.milestones.map((m, i) => (
              <div key={i} className="flex gap-3 items-start p-4 rounded-lg bg-surface/80 border border-border-subtle">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    className={inputClass}
                    value={m.name}
                    onChange={(e) => updateMilestone(i, 'name', e.target.value)}
                    placeholder="里程碑名称"
                  />
                  <input
                    type="date"
                    className={inputClass}
                    value={m.date}
                    onChange={(e) => updateMilestone(i, 'date', e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeMilestone(i)}
                  className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMilestone}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent-dark transition-colors"
            >
              <Plus size={16} />
              添加里程碑
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary mb-2">请确认以下信息无误后创建项目</p>
            <dl className="divide-y divide-border-subtle rounded-lg border border-border-subtle overflow-hidden">
              {[
                ['项目名称', form.name],
                ['所属部门', form.dept],
                ['发行制作人', form.pm],
                ['发起人', form.sponsor || '—'],
                ['状态 / 优先级', `${form.status} · ${form.priority}`],
                ['计划周期', `${form.startDate} 至 ${form.endDate}`],
                ['预算', formatBudget(form.budgetAmount) || '—'],
                ['团队人数', form.members ? `${form.members} 人` : '—'],
                ['里程碑', filledMilestones.length ? `${filledMilestones.length} 个节点` : '未设置'],
              ].map(([k, v]) => (
                <div key={k} className="flex px-4 py-3 bg-surface/30">
                  <dt className="w-28 shrink-0 text-sm text-text-muted">{k}</dt>
                  <dd className="text-sm text-text-primary font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            {form.desc && (
              <div className="p-4 rounded-lg bg-surface/50 border border-border-subtle">
                <p className="text-xs text-text-muted mb-1">项目描述</p>
                <p className="text-sm text-text-secondary">{form.desc}</p>
              </div>
            )}
            {filledMilestones.length > 0 && (
              <ul className="space-y-2 pl-4">
                {filledMilestones.map((m, i) => (
                  <li key={i} className="text-sm text-text-secondary list-disc">
                    {m.name} — {m.date || '日期待定'}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface transition-colors"
        >
          <ArrowLeft size={16} />
          {step === 0 ? '取消' : '上一步'}
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-sidebar text-white rounded-lg text-sm font-medium hover:bg-sidebar-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            下一步
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-60"
          >
            <Check size={16} />
            {submitting ? '创建中...' : '创建项目'}
          </button>
        )}
      </div>
    </div>
  );
}
