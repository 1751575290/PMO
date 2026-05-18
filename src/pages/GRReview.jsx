import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import {
  ArrowLeft, Upload, FileText, Brain, Sparkles, AlertTriangle, CheckCircle2, Clock,
  ShieldAlert, FileCheck, X, Loader2, Search, Users, TrendingUp, Star, Target,
  BarChart3, Crosshair, Zap, Eye, Compass, Shield, Swords, TrendingDown,
  Radio, Cpu
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar as RechartsRadar, ResponsiveContainer, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, PieChart, Pie, LineChart, Line
} from 'recharts';

const grStages = [
  { id: 'GR0', name: '概念评审', reviewer: 'CTO 赵志强' },
  { id: 'GR1', name: '方案评审', reviewer: 'CTO 赵志强' },
  { id: 'GR2', name: '原型评审', reviewer: 'VP 产品 陈志远' },
  { id: 'GR3', name: '集成评审', reviewer: 'VP 产品 陈志远' },
  { id: 'GR4', name: '验收评审', reviewer: 'CEO 王一鸣' },
  { id: 'GR5', name: '量产发布', reviewer: 'CEO 王一鸣' },
];

const requiredChecklist = [
  { id: 1, name: '项目阶段总结报告', required: true },
  { id: 2, name: '技术方案文档', required: true },
  { id: 3, name: '测试报告 / 性能基准', required: true },
  { id: 4, name: '风险评估表', required: true },
  { id: 5, name: '资源使用与工时统计', required: false },
  { id: 6, name: 'UI/UX 走查报告', required: false },
  { id: 7, name: '安全审计报告', required: true },
  { id: 8, name: '下阶段计划书', required: true },
];

const mockFiles = [
  { name: 'GR2_项目阶段总结_V2.1.pdf', size: '2.3 MB', status: 'uploaded' },
  { name: 'GR2_技术方案V3.0_完整版.pdf', size: '5.1 MB', status: 'uploaded' },
  { name: 'GR2_性能基准测试报告.pdf', size: '3.8 MB', status: 'uploaded' },
  { name: 'GR2_安全审计报告.pdf', size: '1.2 MB', status: 'uploaded' },
];

// ── Scoring data ──

const dimensions = [
  { key: 'profitForecast', name: '成本收益预测', icon: TrendingUp, weight: 20 },
  { key: 'teamFit',       name: '团队匹配度',     icon: Target,     weight: 20 },
  { key: 'marketProspect',name: '市场前景',       icon: BarChart3,  weight: 15 },
  { key: 'milestonePlan', name: '里程碑合理性',   icon: ShieldAlert,weight: 15 },
  { key: 'techFeasibility',name: '技术可行性',    icon: Brain,      weight: 15 },
  { key: 'overallRisk',   name: '综合风险',       icon: Star,       weight: 15 },
];

// ── 问卷选项分布数据（高分绿色在上，低分红色在下）──
const questionDistribution = [
  {
    question: '您认为项目盈利预测是否合理？',
    data: [
      { name: '5分·保守可信 | 预测低于行业均值50%以上，拆解详实，敏感性分析完整', value: 0, color: '#22c55e' },
      { name: '4分·基本合理 | 预测与行业均值基本持平(<20%)，关键参数有竞品数据支撑', value: 1, color: '#34d399' },
      { name: '3分·偏乐观(低) | 高于均值20-50%，个别假设偏激进但整体逻辑自洽', value: 2, color: '#fbbf24' },
      { name: '2分·偏乐观(高) | 高于均值50-100%，核心假设缺乏充分数据或逻辑支撑', value: 3, color: '#f59e0b' },
      { name: '1分·不可信 | 高于均值100%以上或成本超收入，存在明显数据造假嫌疑', value: 2, color: '#ef4444' },
    ]
  },
  {
    question: '您认为团队实力及匹配度如何？',
    data: [
      { name: '5分·卓越 | 曾主导S级产品全周期，团队稳定且经验高度匹配', value: 1, color: '#22c55e' },
      { name: '4分·优秀 | 曾制作过A级或参与过S级产品核心岗位，有上线经验', value: 3, color: '#34d399' },
      { name: '3分·一般 | 有1-2个核心岗位有相关经验，团队基本到位', value: 3, color: '#fbbf24' },
      { name: '2分·勉强 | 有少量相关经验但非核心岗位，团队组建未完成', value: 1, color: '#f59e0b' },
      { name: '1分·不匹配 | 无相关品类经验，核心岗位空缺或临时兼任', value: 0, color: '#ef4444' },
    ]
  },
  {
    question: '您认为该项目市场机会与前景如何？',
    data: [
      { name: '5分·非常乐观 | 蓝海市场年增速>50%，先发优势明显，市场空间大', value: 1, color: '#22c55e' },
      { name: '4分·乐观 | 市场年增速>30%，有明确的差异化切入点和竞争窗口', value: 2, color: '#34d399' },
      { name: '3分·中性 | 市场增长稳健但竞争格局尚未定型，需观望', value: 2, color: '#fbbf24' },
      { name: '2分·偏悲观 | 市场增长缓慢，已有强竞品占据主导地位，进入难度大', value: 2, color: '#f59e0b' },
      { name: '1分·悲观 | 市场萎缩或天花板低，竞争壁垒高不可逾越', value: 1, color: '#ef4444' },
    ]
  },
  {
    question: '您认为里程碑时间计划合理吗？',
    data: [
      { name: '5分·非常合理 | 详尽甘特图+资源计划+风险缓冲充沛，可执行性强', value: 0, color: '#22c55e' },
      { name: '4分·基本合理 | 时间分配与资源匹配合理，有缓冲机制保障', value: 2, color: '#34d399' },
      { name: '3分·部分合理 | 主干时间合理但缓冲不足，个别节点风险较高', value: 3, color: '#fbbf24' },
      { name: '2分·偏差较大 | 多个节点缺乏明确依据，资源匹配明显不足', value: 2, color: '#f59e0b' },
      { name: '1分·不合理 | 时间线明显不可行，关键人才缺口未考虑，无法执行', value: 1, color: '#ef4444' },
    ]
  },
  {
    question: '您认为该项目综合评级怎样？',
    data: [
      { name: 'A级·强力推荐 | 强烈推荐投资，风险可控且回报确定，建议全力投入', value: 0, color: '#22c55e' },
      { name: 'B+级·推荐 | 建议投入并列为重点项目，整体风险收益比良好', value: 1, color: '#34d399' },
      { name: 'B级·可投 | 承担合理风险可投入，但需动态监控关键指标', value: 2, color: '#fbbf24' },
      { name: 'B-级·观望 | 可小规模试水但风险较高，建议观望等待更明确信号', value: 3, color: '#f59e0b' },
      { name: 'C级·慎投 | 不推荐当前投资，风险收益比严重失衡', value: 2, color: '#ef4444' },
    ]
  },
  {
    question: '作为投资者，您愿意向该项目投资多少？',
    data: [
      { name: '>100万 | 全额投资，对该项目前景充满信心', value: 0, color: '#22c55e' },
      { name: '80-100万 | 较高额度投资，基本面认可但保留部分仓位', value: 1, color: '#34d399' },
      { name: '50-80万 | 中等额度投资，愿意配置但需要更多验证', value: 2, color: '#fbbf24' },
      { name: '30-50万 | 较低额度投资，试探性参与观察', value: 2, color: '#f59e0b' },
      { name: '≤30万·不投 | 极低额度或不投，对该项目持保守态度', value: 3, color: '#ef4444' },
    ]
  },
];

// ── 各维度打分明细（详情模式用）──
// 6个AI模型: ChatGPT / DouBao / KIMI / DeepSeek / 元宝 / Gemini
const aiModels = [
  { key: 'chatgpt',  name: 'ChatGPT',  abbr: 'C', color: '#74AA9C' },
  { key: 'doubao',   name: 'DouBao',   abbr: 'D', color: '#F53B3B' },
  { key: 'kimi',     name: 'KIMI',     abbr: 'K', color: '#6366f1' },
  { key: 'deepseek', name: 'DeepSeek', abbr: 'S', color: '#0ea5e9' },
  { key: 'yuanbao',  name: '元宝',     abbr: 'Y', color: '#f59e0b' },
  { key: 'gemini',   name: 'Gemini',   abbr: 'G', color: '#8b5cf6' },
];

const dimensionDetailData = [
  {
    dimension: '成本收益预测', weight: 20,
    options: [
      { score: 1, label: '不可信', summary: '预测高于行业均值100%以上；成本>收入；存在明显数据造假' },
      { score: 2, label: '偏乐观·高', summary: '预测高于行业均值50-100%；核心假设缺乏支撑' },
      { score: 3, label: '偏乐观·低', summary: '预测高于行业均值20-50%；关键假设激进（如留存比竞品高30%）' },
      { score: 4, label: '基本合理', summary: '预测与行业均值持平或略高（<20%）；关键参数有竞品数据支撑' },
      { score: 5, label: '保守可信', summary: '预测低于行业均值50%以上；详细数据拆解；敏感性分析完整' },
    ],
    models: { chatgpt:3, doubao:4, kimi:4, deepseek:3, yuanbao:5, gemini:4 },
    humanDist: [2, 3, 2, 1, 0],
  },
  {
    dimension: '团队匹配度', weight: 20,
    options: [
      { score: 1, label: '不匹配', summary: '无相关品类经验；核心岗位空缺或临时兼任' },
      { score: 2, label: '勉强', summary: '有少量相关经验但非核心岗位；团队组建未完成' },
      { score: 3, label: '一般', summary: '有1-2个核心岗位有相关经验；团队基本到位' },
      { score: 4, label: '优秀', summary: '曾制作过A级产品或参与过S级产品核心岗位；有上线经验' },
      { score: 5, label: '卓越', summary: '曾主导S级产品全周期；团队稳定且经验高度匹配' },
    ],
    models: { chatgpt:4, doubao:4, kimi:5, deepseek:4, yuanbao:5, gemini:4 },
    humanDist: [0, 1, 3, 3, 1],
  },
  {
    dimension: '市场前景', weight: 15,
    options: [
      { score: 1, label: '悲观', summary: '市场萎缩/天花板低；竞争壁垒高不可逾越' },
      { score: 2, label: '偏悲观', summary: '市场增长缓慢；有强竞品占据主导地位' },
      { score: 3, label: '中性', summary: '市场增长稳健；竞争格局尚未定型' },
      { score: 4, label: '乐观', summary: '市场年增速>30%；有明确的差异化切入点' },
      { score: 5, label: '非常乐观', summary: '蓝海市场年增速>50%；先发优势明显' },
    ],
    models: { chatgpt:5, doubao:4, kimi:5, deepseek:4, yuanbao:5, gemini:4 },
    humanDist: [1, 2, 2, 2, 1],
  },
  {
    dimension: '里程碑合理性', weight: 15,
    options: [
      { score: 1, label: '不合理', summary: '时间线明显不可行；关键人才缺口未考虑' },
      { score: 2, label: '偏差大', summary: '多个节点缺乏依据；资源匹配明显不足' },
      { score: 3, label: '部分合理', summary: '主干时间合理但缓冲不足；个别节点风险高' },
      { score: 4, label: '基本合理', summary: '时间分配与资源匹配合理；有缓冲机制' },
      { score: 5, label: '非常合理', summary: '详尽甘特图+资源计划+风险Buffer充沛' },
    ],
    models: { chatgpt:4, doubao:3, kimi:3, deepseek:4, yuanbao:4, gemini:3 },
    humanDist: [1, 2, 3, 2, 0],
  },
  {
    dimension: '技术可行性', weight: 15,
    options: [
      { score: 1, label: '不可行', summary: '关键技术无解；依赖未成熟的第三方能力' },
      { score: 2, label: '高难度', summary: '需要大额研发投入且不确定结果' },
      { score: 3, label: '有挑战', summary: '有技术路线但需要攻克1-2个关键难点' },
      { score: 4, label: '可行', summary: '技术方案成熟；核心模块已完成POC' },
      { score: 5, label: '成熟可靠', summary: '复用已有技术栈；已有量产级验证' },
    ],
    models: { chatgpt:4, doubao:3, kimi:4, deepseek:3, yuanbao:4, gemini:4 },
    humanDist: [1, 2, 3, 2, 0],
  },
  {
    dimension: '综合风险', weight: 15,
    options: [
      { score: 1, label: '慎投·C', summary: '不推荐投资；风险收益比严重失衡' },
      { score: 2, label: '观望·B-', summary: '可小规模试水但风险较高' },
      { score: 3, label: '可投·B', summary: '承担合理风险可投入但需动态监控' },
      { score: 4, label: '推荐·B+', summary: '建议投入并列为重点项目' },
      { score: 5, label: '强力推荐·A', summary: '强烈推荐投资；风险可控、回报确定' },
    ],
    models: { chatgpt:3, doubao:3, kimi:2, deepseek:4, yuanbao:3, gemini:3 },
    humanDist: [2, 3, 2, 1, 0],
  },
];

// 从6个模型计算AI均值
function aiAvg(models) {
  const vals = Object.values(models);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

const scores = [
  { dimension: '成本收益预测',   ai: aiAvg(dimensionDetailData[0].models), human: 2.3, comment: 'AI均值' + aiAvg(dimensionDetailData[0].models).toFixed(1) + '，人为更审慎' },
  { dimension: '团队匹配度',     ai: aiAvg(dimensionDetailData[1].models), human: 3.4, comment: 'AI均值' + aiAvg(dimensionDetailData[1].models).toFixed(1) + '，人为保守' + (aiAvg(dimensionDetailData[1].models) - 3.4).toFixed(1) + '分' },
  { dimension: '市场前景',       ai: aiAvg(dimensionDetailData[2].models), human: 3.2, comment: 'AI均值' + aiAvg(dimensionDetailData[2].models).toFixed(1) + '，人为担忧竞争加剧' },
  { dimension: '里程碑合理性',   ai: aiAvg(dimensionDetailData[3].models), human: 2.8, comment: 'AI均值' + aiAvg(dimensionDetailData[3].models).toFixed(1) + '，人为认为缓冲不足' },
  { dimension: '技术可行性',     ai: aiAvg(dimensionDetailData[4].models), human: 2.5, comment: 'AI均值' + aiAvg(dimensionDetailData[4].models).toFixed(1) + '，人为对攻关更悲观' },
  { dimension: '综合风险',       ai: aiAvg(dimensionDetailData[5].models), human: 2.1, comment: 'AI均值' + aiAvg(dimensionDetailData[5].models).toFixed(1) + '，人为最悲观差值最大' },
];

const fullMark = 5;

const aiTotal = parseFloat(weighted('ai'));
const humanTotal = parseFloat(weighted('human'));
const passThreshold = 3.5;
const passDimensions = scores.filter(s => (s.ai + s.human) / 2 >= passThreshold);
const failDimensions = scores.filter(s => (s.ai + s.human) / 2 < passThreshold);

const radarData = scores.map((s) => ({
  dimension: s.dimension,
  'AI 评分': parseFloat(s.ai.toFixed(1)),
  '人为评分': parseFloat(s.human.toFixed(1)),
  满分: fullMark,
}));

const comparisonData = scores.map((s) => ({
  name: s.dimension,
  'AI 评分': parseFloat(s.ai.toFixed(1)),
  '人为评分': parseFloat(s.human.toFixed(1)),
}));

const humanRespondents = 8;
const humanNote = '数据来自飞书Base评审问卷 · 8位评委匿名评分均值';

function weighted(scoresKey) {
  return (scores.reduce((sum, s, i) => sum + s[scoresKey] * dimensions[i].weight, 0) / 100).toFixed(1);
}

const detailScores = [
  { name: '成本收益预测', 'AI·数据支撑': 4.0, 'AI·逻辑自洽': 4.2, 'AI·敏感性分析': 3.8, '人·数据支撑': 2.0, '人·逻辑自洽': 2.5, '人·敏感性分析': 2.4 },
  { name: '团队匹配度',   'AI·人才质量': 4.8, 'AI·品类经验': 4.5, 'AI·团队稳定': 4.2, '人·人才质量': 3.5, '人·品类经验': 3.2, '人·团队稳定': 3.5 },
  { name: '市场前景',     'AI·市场空间': 4.8, 'AI·竞争格局': 4.5, 'AI·增长趋势': 4.8, '人·市场空间': 3.5, '人·竞争格局': 2.8, '人·增长趋势': 3.3 },
  { name: '里程碑合理性', 'AI·时间分配': 4.0, 'AI·资源匹配': 3.8, 'AI·缓冲机制': 3.9, '人·时间分配': 3.0, '人·资源匹配': 2.5, '人·缓冲机制': 2.9 },
  { name: '技术可行性',   'AI·方案成熟度': 4.5, 'AI·攻关路径': 4.0, 'AI·技术风险': 4.1, '人·方案成熟度': 2.8, '人·攻关路径': 2.2, '人·技术风险': 2.5 },
  { name: '综合风险',     'AI·投资回报': 3.8, 'AI·退出机制': 3.5, 'AI·整体把控': 4.1, '人·投资回报': 2.0, '人·退出机制': 1.8, '人·整体把控': 2.5 },
];

export default function GRReview() {
  const { projectId, grId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('review'); // review | scoring
  const [scoringMode, setScoringMode] = useState('overview'); // overview | detail
  const [distributionOpen, setDistributionOpen] = useState(false);

  const [files, setFiles] = useState(mockFiles);
  const [aiChecking, setAiChecking] = useState(false);
  const [aiChecked, setAiChecked] = useState(false);
  const [aiEvaluating, setAiEvaluating] = useState(false);
  const [aiEvaluated, setAiEvaluated] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const stage = grStages.find((s) => s.id === grId) || grStages[2];
  const projectName = '代号·星辰 开放世界MMO';

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); setFiles([...files, { name: '新上传文件.pdf', size: '4.2 MB', status: 'uploaded' }]); };
  const removeFile = (i) => { setFiles(files.filter((_, idx) => idx !== i)); };
  const runAiCheck = () => { setAiChecking(true); setTimeout(() => { setAiChecking(false); setAiChecked(true); }, 2000); };
  const runAiEval = () => { setAiEvaluating(true); setTimeout(() => { setAiEvaluating(false); setAiEvaluated(true); }, 2500); };

  const checkStatus = requiredChecklist.map((item) => ({
    ...item,
    matched: files.some((f) => f.name.toLowerCase().includes(item.name.slice(0, 3).toLowerCase())),
  }));
  const missingRequired = checkStatus.filter((c) => c.required && !c.matched);
  const allRequiredDone = missingRequired.length === 0;

  return (
    <div className="p-6 space-y-5 max-w-5xl mx-auto">
      <button onClick={() => navigate(`/projects/${projectId}`)} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
        <ArrowLeft size={16} /> 返回项目详情
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-text-primary">{stage.id} {stage.name}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-accent/10 text-accent">待过会</span>
          </div>
          <p className="text-sm text-text-secondary">
            关联项目: <span className="text-accent">{projectName}</span> · 评审人: {stage.reviewer}
          </p>
        </div>
        {tab === 'review' && (
          <div className="flex items-center gap-2">
            <button onClick={() => { runAiCheck(); runAiEval(); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors">
              <Brain size={16} /> AI 一键审查
            </button>
            <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors">
              提交过会申请
            </button>
          </div>
        )}
      </div>

      {/* ─── Tabs ─── */}
      <div className="flex rounded-lg border border-border-subtle bg-surface overflow-hidden w-fit">
        <button
          onClick={() => setTab('review')}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            tab === 'review' ? 'bg-sidebar text-white' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <FileText size={15} className="inline mr-1.5 -mt-0.5" />
          材料审查
        </button>
        <button
          onClick={() => setTab('analysis')}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            tab === 'analysis' ? 'bg-sidebar text-white' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Brain size={15} className="inline mr-1.5 -mt-0.5" />
          AI 解析
        </button>
        <button
          onClick={() => setTab('scoring')}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            tab === 'scoring' ? 'bg-sidebar text-white' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <BarChart3 size={15} className="inline mr-1.5 -mt-0.5" />
          评分结果
        </button>
      </div>

      {/* ═══════════ TAB 1: 材料审查 ═══════════ */}
      {tab === 'review' && (
        <div className="space-y-5">
          {/* Upload */}
          <div className="bg-canvas rounded-xl border border-border-subtle p-6">
            <div className="flex items-center justify-between mb-4">
              <div><h3 className="text-sm font-semibold text-text-primary">GR 评审材料</h3><p className="text-xs text-text-muted mt-0.5">上传该阶段所需的全部评审材料</p></div>
              <span className="text-xs text-text-muted">{files.length} 个文件</span>
            </div>
            <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragOver ? 'border-accent bg-accent/5' : 'border-border-subtle hover:border-gray-300'}`}>
              <Upload size={32} className="mx-auto text-text-muted mb-3" />
              <div className="text-sm font-medium text-text-primary">拖拽文件到此处上传</div>
              <div className="text-xs text-text-muted mt-1">支持 PDF、PPT、Word、Excel，单文件最大 50MB</div>
              <button className="mt-3 px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-dark transition-colors">选择文件</button>
            </div>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border-subtle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><FileText size={16} className="text-blue-600" /></div>
                      <div><div className="text-sm font-medium text-text-primary">{f.name}</div><div className="text-xs text-text-muted">{f.size}</div></div>
                    </div>
                    <button onClick={() => removeFile(i)} className="p-1.5 rounded-lg hover:bg-gray-100 text-text-muted hover:text-danger transition-colors"><X size={16} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Missing Items Check */}
          <div className={`bg-canvas rounded-xl border p-6 transition-all ${aiChecked ? 'border-amber-200' : 'border-border-subtle'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Search size={18} className={aiChecked ? 'text-amber-500' : 'text-text-muted'} />
              <h3 className="text-sm font-semibold text-text-primary">AI 材料初审 — 查缺补漏</h3>
              {aiChecking && <Loader2 size={16} className="text-accent animate-spin" />}
            </div>
            {!aiChecked ? (
              <div className="text-center py-6">
                <p className="text-sm text-text-muted">点击上方「AI 一键审查」由 AI 检查材料是否齐全</p>
                <button onClick={runAiCheck} disabled={aiChecking} className="mt-3 px-4 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-1.5 mx-auto disabled:opacity-60">
                  {aiChecking ? <Loader2 size={14} className="animate-spin" /> : <Brain size={14} />}
                  {aiChecking ? 'AI 检查中...' : '开始 AI 查缺'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {allRequiredDone ? (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100"><CheckCircle2 size={18} className="text-emerald-600 mt-0.5" /><div><div className="text-sm font-semibold text-emerald-800">材料齐全</div><p className="text-xs text-emerald-600 mt-0.5">全部必要材料已提交，可进入评审</p></div></div>
                ) : (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100 mb-4"><AlertTriangle size={18} className="text-amber-600 mt-0.5" /><div><div className="text-sm font-semibold text-amber-800">材料缺失 · {missingRequired.length} 项</div><p className="text-xs text-amber-600 mt-0.5">以下必要材料尚未上传</p></div></div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {checkStatus.map((item) => (
                    <div key={item.id} className={`flex items-center gap-2.5 p-2.5 rounded-lg text-sm ${item.matched ? 'bg-emerald-50/50' : item.required ? 'bg-amber-50/50' : 'bg-gray-50'}`}>
                      {item.matched ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> : item.required ? <AlertTriangle size={16} className="text-amber-500 shrink-0" /> : <Clock size={16} className="text-text-muted shrink-0" />}
                      <span className={item.matched ? 'text-emerald-700' : item.required ? 'text-amber-700' : 'text-text-muted'}>{item.name}</span>
                      {item.matched && <span className="ml-auto text-xs text-emerald-500">✓ 已提交</span>}
                      {!item.matched && item.required && <span className="ml-auto text-xs text-amber-500">需补充</span>}
                      {!item.matched && !item.required && <span className="ml-auto text-xs text-text-muted">建议提交</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Evaluation */}
          <div className={`bg-canvas rounded-xl border p-6 transition-all ${aiEvaluated ? 'border-purple-200' : 'border-border-subtle'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className={aiEvaluated ? 'text-purple-500' : 'text-text-muted'} />
              <h3 className="text-sm font-semibold text-text-primary">AI 材料评估与建议</h3>
              {aiEvaluating && <Loader2 size={16} className="text-purple-500 animate-spin" />}
            </div>
            {!aiEvaluated ? (
              <div className="text-center py-6">
                <p className="text-sm text-text-muted">AI 将基于已上传材料进行内容质量评估并给出改进建议</p>
                <button onClick={runAiEval} disabled={aiEvaluating} className="mt-3 px-4 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-1.5 mx-auto disabled:opacity-60">
                  {aiEvaluating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}{aiEvaluating ? 'AI 评估中...' : '开始 AI 评估'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold">82</div>
                  <div className="flex-1"><div className="text-sm font-semibold text-purple-900">整体质量评分 · 良好</div><p className="text-xs text-purple-600 mt-0.5">材料覆盖度 85% · 文档规范性 80% · 风险覆盖 78%</p></div>
                </div>
                <div className="space-y-3">
                  {files.slice(0, 3).map((f, i) => (
                    <div key={i} className="p-3 rounded-lg bg-surface/50 border border-border-subtle">
                      <div className="flex items-start justify-between mb-2"><div className="flex items-center gap-2"><FileCheck size={14} className="text-purple-500" /><span className="text-sm font-medium text-text-primary">{f.name}</span></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${i===0?'bg-emerald-50 text-emerald-600':i===1?'bg-amber-50 text-amber-600':'bg-blue-50 text-blue-600'}`}>{i===0?'A 级 优秀':i===1?'B 级 良好':'B+ 级 良好'}</span></div>
                      {i===0&&<div className="space-y-1 text-xs text-text-secondary ml-6"><p className="text-emerald-600">✓ 结构清晰，章节组织合理</p><p className="text-emerald-600">✓ 数据翔实，图表标注完整</p><p className="text-amber-600">△ 建议增加风险应对时间节点</p></div>}
                      {i===1&&<div className="space-y-1 text-xs text-text-secondary ml-6"><p className="text-emerald-600">✓ 技术架构图清晰，模块划分合理</p><p className="text-amber-600">△ 性能指标缺少基线对比数据</p><p className="text-amber-600">△ 建议补充第三方依赖风险评估</p></div>}
                      {i===2&&<div className="space-y-1 text-xs text-text-secondary ml-6"><p className="text-emerald-600">✓ 测试场景覆盖全面</p><p className="text-emerald-600">✓ 性能数据与目标对比清晰</p><p className="text-blue-600">→ 建议: 增加长稳测试数据</p></div>}
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                  <div className="flex items-center gap-2 mb-3"><Brain size={16} className="text-accent" /><span className="text-sm font-semibold text-text-primary">AI 综合建议</span></div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2"><span className="text-accent mt-0.5">1.</span><span className="text-text-secondary">技术方案文档缺少第三方依赖的详细风险评估，建议在 2.3 节补充</span></div>
                    <div className="flex items-start gap-2"><span className="text-accent mt-0.5">2.</span><span className="text-text-secondary">性能测试报告中基准对比数据不完整，建议补充业界标准指标的横向对比</span></div>
                    <div className="flex items-start gap-2"><span className="text-accent mt-0.5">3.</span><span className="text-text-secondary">建议在阶段总结报告中增加团队能力评估与下阶段人力规划</span></div>
                  </div>
                  <button onClick={() => setTab('scoring')} className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors w-full justify-center">
                    <BarChart3 size={16} /> 查看评分结果 · AI vs 人为对比
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════ TAB: AI 解析 ═══════════ */}
      {tab === 'analysis' && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
            <Brain size={14} className="text-purple-500" />
            <span>AI 角色：游戏行业资深专家 · 15年从业经验 · 曾主导多款S级项目立项评审</span>
          </div>

          {/* 1. SWOT */}
          <div className="bg-canvas rounded-xl border border-border-subtle p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2"><Crosshair size={16} className="text-accent"/>SWOT 战略分析</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2 mb-2"><Zap size={14} className="text-emerald-600"/><span className="text-xs font-semibold text-emerald-800">S·优势 Strengths</span></div>
                <ul className="space-y-1.5 text-[11px] text-text-secondary">
                  <li>• 核心团队有《原神》级别开放世界开发经验</li>
                  <li>• AI叙事引擎已在外包项目完成POC验证</li>
                  <li>• 美术团队储备充分，已有6个月预研资产</li>
                  <li>• 引擎选型成熟(UE5)，工具链完整</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div className="flex items-center gap-2 mb-2"><TrendingDown size={14} className="text-red-600"/><span className="text-xs font-semibold text-red-800">W·劣势 Weaknesses</span></div>
                <ul className="space-y-1.5 text-[11px] text-text-secondary">
                  <li>• 团队组建未完成，技术主程岗位空缺3个月</li>
                  <li>• 开放世界MMO品类缺乏完整的商业化经验</li>
                  <li>• 发行渠道关系薄弱，现有合作方规模有限</li>
                  <li>• 预估研发周期36个月偏长，存在人员流失风险</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center gap-2 mb-2"><Compass size={14} className="text-blue-600"/><span className="text-xs font-semibold text-blue-800">O·机会 Opportunities</span></div>
                <ul className="space-y-1.5 text-[11px] text-text-secondary">
                  <li>• 国内开放世界MMO赛道尚无TOP3产品，窗口期12-18个月</li>
                  <li>• AI+叙事是当前资本热点，有利于下一轮融资</li>
                  <li>• TikTok渠道买量成本低于传统渠道约30%</li>
                  <li>• 海外东南亚、拉美市场对MMO品类需求旺盛</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                <div className="flex items-center gap-2 mb-2"><Shield size={14} className="text-amber-600"/><span className="text-xs font-semibold text-amber-800">T·威胁 Threats</span></div>
                <ul className="space-y-1.5 text-[11px] text-text-secondary">
                  <li>• 网易、米哈游均传闻有同类开放世界项目在研</li>
                  <li>• 版号审批周期不确定，可能延后上线6-12个月</li>
                  <li>• 《鸣潮》《无限暖暖》等竞品已抢占用户心智</li>
                  <li>• AI监管政策趋严，叙事生成内容合规成本增加</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. 团队评估 */}
          <div className="bg-canvas rounded-xl border border-border-subtle p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2"><Users size={16} className="text-accent"/>团队核心能力评估</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {[
                { role: '制作人·林晨', score: 85, note: '曾主导S级二次元产品，开放世界经验不足但学习能力强', risk: 'low' },
                { role: '主策划·唐菲', score: 72, note: '擅长战斗系统设计，但MMO社交生态把控较弱', risk: 'mid' },
                { role: '技术主程(空缺)', score: 30, note: '核心岗位空缺3个月，亟需具备UE5+MMO架构经验人才', risk: 'high' },
                { role: '美术总监·沈韵', score: 88, note: '行业TOP10水准，风格适配度高，资产管线成熟', risk: 'low' },
                { role: '发行制作人·苏婉', score: 65, note: '有渠道资源但缺乏MMO品类发行经验', risk: 'mid' },
              ].map((item, i) => (
                <div key={i} className={'p-3 rounded-xl border ' + (item.risk==='high'?'bg-red-50 border-red-200':'')}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-text-primary">{item.role}</span>
                    <span className={'text-[11px] font-bold px-2 py-0.5 rounded-full '+(item.score>=80?'bg-emerald-100 text-emerald-700':item.score>=60?'bg-amber-100 text-amber-700':'bg-red-100 text-red-600')}>{item.score}分</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mb-2 overflow-hidden"><div className={'h-full rounded-full '+(item.score>=80?'bg-emerald-500':item.score>=60?'bg-amber-500':'bg-red-500')} style={{width:item.score+'%'}}/></div>
                  <p className="text-[10px] text-text-muted leading-relaxed">{item.note}</p>
                  {item.risk==='high' && <span className="inline-block mt-1.5 text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-medium">⚠ 高风险·建议优先解决</span>}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-purple-50/30 border border-purple-100 text-[11px] text-text-secondary">
              <span className="font-semibold text-purple-700">🧠 AI 专家意见：</span>
              团队整体实力中等偏上，但「技术主程空缺」是最大隐患。建议 PRD 批准前必须确认该岗位候选人，或通过外部技术顾问+UE5引擎工程师组合实现降级方案。策划团队在MMO社交生态方面的经验不足，建议引入社交系统顾问。
            </div>
          </div>

          {/* 3. 赛道竞争 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-canvas rounded-xl border border-border-subtle p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2"><Swords size={16} className="text-accent"/>赛道竞争格局</h3>
              <div className="space-y-3">
                {[
                  { name: '本产品(代号·星辰)', type: '开放世界MMO', advantage: 'T0·先发', color: '#6366f1', rank: 1, note: '目前赛道无直接竞品，先发优势明确' },
                  { name: '米哈游 XY项目(传闻)', type: '开放世界RPG', advantage: 'T1·追赶', color: '#8b5cf6', rank: 2, note: '米哈游品牌+技术积累深厚，但项目尚处概念阶段' },
                  { name: '网易 代号世界(传闻)', type: '开放世界MMO', advantage: 'T1·追赶', color: '#f59e0b', rank: 3, note: '网易MMO研发实力强，但传闻进度落后约12个月' },
                  { name: '腾讯 光子工作室', type: '战术竞技+开放', advantage: 'T2·跟进', color: '#94a3b8', rank: 4, note: '腾讯渠道强势但品类理解不确定' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-surface/50">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{backgroundColor:c.color}}>{c.rank}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-text-primary truncate">{c.name}</div>
                      <div className="text-[10px] text-text-muted">{c.type} · {c.advantage}</div>
                    </div>
                    <span className="text-[10px] text-text-muted shrink-0">{c.note.slice(0,8)}...</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-canvas rounded-xl border border-border-subtle p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2"><Radio size={16} className="text-accent"/>竞争优势与目标排位</h3>
              <div className="space-y-3">
                {[
                  { label: 'AI叙事引擎', level: '领先1-2年', pct: 85, color: '#6366f1' },
                  { label: '美术品质', level: '持平或略优', pct: 75, color: '#22c55e' },
                  { label: '引擎技术', level: '可追赶', pct: 55, color: '#f59e0b' },
                  { label: '发行渠道', level: '显著劣势', pct: 25, color: '#ef4444' },
                  { label: '社区生态', level: '起步阶段', pct: 20, color: '#ef4444' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[11px] text-text-primary w-20 shrink-0">{item.label}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{width:item.pct+'%', backgroundColor:item.color}}/>
                    </div>
                    <span className="text-[10px] text-text-muted w-20 text-right">{item.level}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/10 text-[11px] text-text-secondary">
                <span className="font-semibold">🎯 目标排位建议：</span>优先争取「赛道TOP2」，利用AI叙事+美术品质建立差异化壁垒。发行侧建议与至少1家头部渠道建立战略合作，弥补渠道劣势。
              </div>
            </div>
          </div>

          {/* 4. 用户画像 */}
          <div className="bg-canvas rounded-xl border border-border-subtle p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2"><Eye size={16} className="text-accent"/>用户画像与市场机会</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {[
                { label: '核心用户', desc: '18-28岁男性，二次元+开放世界双栖玩家，日均游戏时长3h+，付费意愿强', size: '3500万', pct: '30%' },
                { label: '次核心用户', desc: '25-35岁泛游戏用户，MMORPG怀旧群体，社交驱动，付费能力中高', size: '5000万', pct: '45%' },
                { label: '泛用户', desc: '15-40岁休闲探索型玩家，被开放世界概念吸引，付费转化需教育', size: '3000万', pct: '25%' },
              ].map((u, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface/50 border border-border-subtle">
                  <div className="text-xs font-semibold text-text-primary mb-2">{u.label}<span className="ml-2 text-[10px] text-accent">{u.pct}</span></div>
                  <p className="text-[10px] text-text-muted leading-relaxed mb-2">{u.desc}</p>
                  <div className="text-[11px] font-medium text-accent">预估TAM {u.size}</div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/30 border border-emerald-100 text-[11px] text-text-secondary">
              <span className="font-semibold text-emerald-700">📊 市场机会判断：</span>
              开放世界+MMO双品类交叉用户基数约1.15亿，3%转化率即有345万DAU。当前品类TOP3产品月流水均超5亿，参考竞品模型预估首年流水12-18亿。但需注意：用户获取成本可能随竞品入局快速攀升，建议前期集中资源打透核心圈层。
            </div>
          </div>

          {/* 5. 数据预测 */}
          <div className="bg-canvas rounded-xl border border-border-subtle p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-accent"/>数据预测模型（基于品类均值+竞品推算）</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: '首年买量成本', value: '2.8亿', note: 'CPA约¥35/安装', color: '#f59e0b' },
                { label: '累计注册用户', value: '1800万', note: '12个月目标', color: '#6366f1' },
                { label: 'DAU(稳态)', value: '120万', note: '上线6个月后', color: '#22c55e' },
                { label: 'MAU(稳态)', value: '650万', note: '上线6个月后', color: '#8b5cf6' },
                { label: '首日留存', value: '42%', note: '品类均值35-45%', color: '#3b82f6' },
                { label: '7日留存', value: '22%', note: '品类均值18-25%', color: '#6366f1' },
                { label: '月留存', value: '9%', note: '品类均值6-10%', color: '#22c55e' },
                { label: '首年流水', value: '14亿', note: '含国内+东南亚', color: '#ef4444' },
                { label: '回本周期', value: '16个月', note: '含买量成本', color: '#f59e0b' },
                { label: '12月ROI', value: '185%', note: 'LTV/CAC倍数', color: '#22c55e' },
                { label: '产品生命周期', value: '5-7年', note: 'MMO品类基准', color: '#8b5cf6' },
                { label: 'ARPPU(月)', value: '¥128', note: '付费用户月均', color: '#3b82f6' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface/60 border border-border-subtle text-center">
                  <div className="text-[10px] text-text-muted mb-1">{item.label}</div>
                  <div className="text-lg font-bold" style={{color:item.color}}>{item.value}</div>
                  <div className="text-[9px] text-text-muted">{item.note}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-text-muted mb-2">月度流水预测（万元）</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={[
                    { 月:'M1', 流水:3500, 成本:4200 }, { 月:'M2', 流水:5200, 成本:3500 },
                    { 月:'M3', 流水:6800, 成本:2800 }, { 月:'M4', 流水:7200, 成本:2200 },
                    { 月:'M5', 流水:7800, 成本:1800 }, { 月:'M6', 流水:8200, 成本:1500 },
                    { 月:'M7', 流水:7500, 成本:1400 }, { 月:'M8', 流水:7000, 成本:1300 },
                    { 月:'M9', 流水:6500, 成本:1200 }, { 月:'M10', 流水:6000, 成本:1100 },
                    { 月:'M11', 流水:5800, 成本:1050 }, { 月:'M12', 流水:5500, 成本:1000 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="月" tick={{fontSize:10,fill:'#94a3b8'}} />
                    <YAxis tick={{fontSize:10,fill:'#94a3b8'}} />
                    <Tooltip contentStyle={{borderRadius:10,border:'1px solid #e5e7eb',fontSize:11}} />
                    <Legend />
                    <Line type="monotone" dataKey="流水" stroke="#6366f1" strokeWidth={2} dot={{r:3}} />
                    <Line type="monotone" dataKey="成本" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5 5" dot={{r:2}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-[11px] text-text-muted mb-2">用户留存曲线预测</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={[
                    { 天:'D1', 留存率:42 }, { 天:'D3', 留存率:30 }, { 天:'D7', 留存率:22 },
                    { 天:'D14', 留存率:15 }, { 天:'D30', 留存率:9 }, { 天:'D60', 留存率:6 },
                    { 天:'D90', 留存率:4.5 }, { 天:'D180', 留存率:3.2 }, { 天:'D365', 留存率:2 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="天" tick={{fontSize:10,fill:'#94a3b8'}} />
                    <YAxis domain={[0,50]} tick={{fontSize:10,fill:'#94a3b8'}} unit="%" />
                    <Tooltip contentStyle={{borderRadius:10,border:'1px solid #e5e7eb',fontSize:11}} formatter={(v)=>{return v+'%';}} />
                    <Line type="monotone" dataKey="留存率" stroke="#22c55e" strokeWidth={2} dot={{r:3}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-amber-50/30 border border-amber-100 text-[11px] text-text-secondary">
              <span className="font-semibold text-amber-700">⚠ 预测局限性：</span>
              以上数据基于品类均值+已上线竞品表现外推，实际偏差±30%。核心变量包括：版号获批时间、竞品入局节奏、买量渠道政策变化。建议每季更新模型。
            </div>
          </div>

          {/* 6. 对标产品 */}
          <div className="bg-canvas rounded-xl border border-border-subtle p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2"><Cpu size={16} className="text-accent"/>对标产品数据与情况分析</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle text-text-muted">
                    <th className="text-left py-2 pr-3">产品</th>
                    <th className="text-left py-2 pr-3">类型</th>
                    <th className="text-right py-2 pr-3">首发月流水</th>
                    <th className="text-right py-2 pr-3">DAU峰值</th>
                    <th className="text-right py-2 pr-3">首月留存</th>
                    <th className="text-right py-2 pr-3">买量CPA</th>
                    <th className="text-right py-2 pr-3">回本周期</th>
                    <th className="text-left py-2 pr-3">关键洞察</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name:'原神', type:'开放世界RPG', revenue:'18亿', dau:'800万', retain:'48%', cpa:'¥42', payback:'8个月', insight:'品类定义者·全球同步发行·内容驱动获客', note:'直接竞品' },
                    { name:'鸣潮', type:'开放世界ARPG', revenue:'8.5亿', dau:'380万', retain:'38%', cpa:'¥35', payback:'14个月', insight:'战斗差异化·UE4引擎·二次元+动作标签', note:'直接竞品' },
                    { name:'无限暖暖', type:'开放世界换装', revenue:'6.2亿', dau:'260万', retain:'35%', cpa:'¥28', payback:'16个月', insight:'女性向差异定位·换装+探索融合·IP加持', note:'品类参考' },
                    { name:'逆水寒手游', type:'MMORPG', revenue:'15亿', dau:'600万', retain:'40%', cpa:'¥38', payback:'10个月', insight:'端转手成功·社交生态成熟·高ARPPU', note:'品类参考' },
                    { name:'幻塔', type:'二次元MMO', revenue:'5.8亿', dau:'220万', retain:'30%', cpa:'¥32', payback:'20个月', insight:'先发但后劲不足·内容迭代慢·UE5引擎', note:'前车之鉴' },
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-border-subtle hover:bg-surface/50 transition-colors">
                      <td className="py-2 pr-3 font-medium text-text-primary">{r.name}</td>
                      <td className="py-2 pr-3 text-text-muted">{r.type}</td>
                      <td className="py-2 pr-3 text-right text-text-primary font-mono">{r.revenue}</td>
                      <td className="py-2 pr-3 text-right text-text-primary">{r.dau}</td>
                      <td className="py-2 pr-3 text-right text-text-primary">{r.retain}</td>
                      <td className="py-2 pr-3 text-right text-text-muted">{r.cpa}</td>
                      <td className="py-2 pr-3 text-right text-text-muted">{r.payback}</td>
                      <td className="py-2 pr-3 text-text-secondary"><span className="text-[10px] text-text-muted">{r.insight}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/10 text-[11px] text-text-secondary">
              <span className="font-semibold">📊 对标结论：</span>
              本产品(代号·星辰)应参考「原神」的内容驱动+「逆水寒手游」的社交体系，避免「幻塔」内容迭代过慢的陷阱。预计首月流水6-8亿，DAU目标300-450万，首月留存需达40%+。买量策略建议首月集中投放¥5000万撬动自然量，后续靠内容+社区驱动降低获客成本。
            </div>
          </div>

          {/* 7. 立项建议 */}
          <div className="bg-gradient-to-r from-purple-500 to-accent rounded-xl p-5 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">📋</div>
              <div className="flex-1">
                <div className="text-base font-bold mb-2">AI 资深专家 · 立项评审意见</div>
                <div className="space-y-1.5 text-sm text-white/80">
                  <p>1. 项目整体评分 <span className="font-bold text-white">B+</span>（赛道机会大，但团队关键岗位存在风险）</p>
                  <p>2. SWOT综合：<span className="font-bold text-white">优势+机会 {'>'} 劣势+威胁</span>，窗口期内立项是合理的</p>
                  <p>3. 建议 <span className="font-bold text-white">有条件通过</span>，但需满足以下前置条件：确认技术主程人选、明确发行合作框架、补充MMO社交系统设计能力</p>
                  <p>4. 关注风险点：技术主程空缺 {'>'} 发行渠道薄弱 {'>'} AI+版号双监管风险</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'scoring' && (
        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex rounded-lg border border-border-subtle bg-surface overflow-hidden">
              <button onClick={() => setScoringMode('overview')}
                className={'px-4 py-2 text-xs font-medium transition-colors ' + (scoringMode === 'overview' ? 'bg-sidebar text-white' : 'text-text-secondary hover:text-text-primary')}>📊 总览</button>
              <button onClick={() => setScoringMode('detail')}
                className={'px-4 py-2 text-xs font-medium transition-colors ' + (scoringMode === 'detail' ? 'bg-sidebar text-white' : 'text-text-secondary hover:text-text-primary')}>📋 详情</button>
            </div>
            <span className="text-[11px] text-text-muted">{scoringMode === 'detail' ? 'AI模型选分 · 人员分布' : '图表可视化总览'}</span>
          </div>

          {/* Dual score banner (shared) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white">
              <div className="text-xs font-medium text-white/60 mb-1"><Brain size={14} className="inline mr-1" />AI 综合评分</div>
              <div className="text-3xl font-bold">{aiTotal}<span className="text-base font-normal text-white/50"> /5.0</span></div>
              <div className="text-xs text-white/40 mt-1">6维加权 · 6款AI模型均值</div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
              <div className="text-xs font-medium text-white/60 mb-1"><Users size={14} className="inline mr-1" />人为综合评分</div>
              <div className="text-3xl font-bold">{humanTotal}<span className="text-base font-normal text-white/50"> /5.0</span></div>
              <div className="text-xs text-white/40 mt-1">{humanRespondents}位评委 · 飞书Base问卷</div>
            </div>
          </div>

          {/* ── 醒目结论 (shared) ── */}
          <div className={'rounded-xl p-6 border-2 ' + (
            (aiTotal + humanTotal) / 2 >= passThreshold
              ? 'bg-emerald-50/60 border-emerald-400 shadow-lg shadow-emerald-100'
              : 'bg-red-50/60 border-red-400 shadow-lg shadow-red-100'
          )}>
            <div className="flex items-start gap-4">
              <div className={'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl ' + (
                (aiTotal + humanTotal) / 2 >= passThreshold ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
              )}>{(aiTotal + humanTotal) / 2 >= passThreshold ? '✓' : '✗'}</div>
              <div className="flex-1">
                <div className={"text-lg font-bold mb-1 " + ((aiTotal + humanTotal) / 2 >= passThreshold ? 'text-emerald-800' : 'text-red-800')}>
                  {(aiTotal + humanTotal) / 2 >= passThreshold
                    ? '✅ 建议通过 — 综合均分 ' + ((aiTotal + humanTotal) / 2).toFixed(1) + ' ≥ 通过线 ' + passThreshold
                    : '❌ 不建议通过 — 综合均分 ' + ((aiTotal + humanTotal) / 2).toFixed(1) + ' < 通过线 ' + passThreshold}
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  {(aiTotal + humanTotal) / 2 >= passThreshold
                    ? 'AI 加权 ' + aiTotal + ' 分，人为加权 ' + humanTotal + ' 分。' + passDimensions.length + '/6 个维度共识均分超过 ' + passThreshold + ' 分通过线。'
                    : 'AI 加权 ' + aiTotal + ' 分，人为加权 ' + humanTotal + ' 分。仅 ' + passDimensions.length + '/6 个维度通过，' + failDimensions.length + ' 个维度未达标。'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {scores.map((s) => { const avg = (s.ai + s.human) / 2; const passed = avg >= passThreshold;
                    return (<span key={s.dimension} className={'text-xs px-2.5 py-1 rounded-full font-medium ' + (passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600')}>{s.dimension} {avg.toFixed(1)}{passed ? ' ✓' : ' ✗'}</span>); })}
                </div>
              </div>
            </div>
          </div>

          {/* ═══ OVERVIEW MODE ═══ */}
          {scoringMode === 'overview' && (<>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-canvas rounded-xl border border-border-subtle p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-2">AI vs 人为 · 雷达图对比</h3>
                <p className="text-[11px] text-text-muted mb-3">紫色=AI · 绿色=人为均值</p>
                <ResponsiveContainer width="100%" height={340}>
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <PolarRadiusAxis angle={90} domain={[0,5]} tick={{ fontSize:10, fill:'#94a3b8' }} tickCount={6} />
                    <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:13 }} />
                    <Legend />
                    <RechartsRadar name="AI 评分" dataKey="AI 评分" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} />
                    <RechartsRadar name="人为评分" dataKey="人为评分" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-canvas rounded-xl border border-border-subtle p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-4">维度得分对比</h3>
                <div className="space-y-2.5">
                  {scores.map((s, i) => (
                    <div key={s.dimension} className="p-2.5 rounded-lg hover:bg-surface transition-colors">
                      <div className="flex items-center gap-2 mb-1.5">
                        {React.createElement(dimensions[i].icon, { size:14, className:'text-purple-500' })}
                        <span className="text-sm font-medium text-text-primary flex-1 truncate">{s.dimension}</span>
                        <span className="text-[11px] text-text-muted">{dimensions[i].weight}%</span>
                      </div>
                      <div className="flex items-center gap-2 mb-0.5"><span className="text-[10px] text-purple-500 w-5 text-right">AI</span><div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-purple-500" style={{width: (s.ai/5*100)+'%'}}/></div><span className="text-[11px] font-bold text-purple-600 w-8 text-right">{s.ai.toFixed(1)}</span></div>
                      <div className="flex items-center gap-2"><span className="text-[10px] text-emerald-500 w-5 text-right">人</span><div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{width: (s.human/5*100)+'%'}}/></div><span className="text-[11px] font-bold text-emerald-600 w-8 text-right">{s.human.toFixed(1)}</span></div>
                    </div>))}
                </div>
              </div>
            </div>

            <div className="bg-canvas rounded-xl border border-border-subtle p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4">AI vs 人为 · 柱状对比</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={comparisonData} layout="vertical" barSize={14} margin={{ left:80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" domain={[0,5]} tick={{ fontSize:12, fill:'#94a3b8' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize:12, fill:'#64748b' }} width={90} />
                  <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:12 }} />
                  <Legend />
                  <Bar dataKey="AI 评分" fill="#8b5cf6" radius={[0,4,4,0]} />
                  <Bar dataKey="人为评分" fill="#22c55e" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>)}

          {/* ═══ DETAIL MODE ═══ */}
          {scoringMode === 'detail' && (
            <div className="space-y-5">
              {dimensionDetailData.map((dim, di) => {
                const totalHuman = dim.humanDist.reduce((a,b)=>a+b,0);
                return (
                  <div key={dim.dimension} className="bg-canvas rounded-xl border border-border-subtle p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                        {React.createElement(dimensions[di].icon, { size:16, className:'text-purple-500' })}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-text-primary">{dim.dimension}</h3>
                        <p className="text-[11px] text-text-muted">权重 {dim.weight}% · 综合评分 {((scores[di].ai + scores[di].human)/2).toFixed(1)}</p>
                      </div>
                    </div>

                    {/* AI model picks — 6 models, 3-column grid */}
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-2 text-text-muted text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"/>各AI模型评分选择
                      </div>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
                        {aiModels.map((m) => {
                          const score = dim.models[m.key];
                          const opt = dim.options[score - 1];
                          return (
                            <div key={m.key} className="p-2 rounded-lg bg-surface/80 border border-border-subtle text-center hover:shadow-sm transition-shadow" title={m.name + ': ' + score + '分·' + opt.label + ' — ' + opt.summary}>
                              <div className="w-5 h-5 rounded mx-auto mb-1 flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: m.color }}>{m.abbr}</div>
                              <div className="text-[10px] text-text-secondary">{m.name}</div>
                              <div className="text-[11px] font-bold text-text-primary mt-0.5">{score}分</div>
                              <div className="text-[9px] text-text-muted truncate max-w-[80px] mx-auto" title={opt.label}>{opt.label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Option reference table */}
                    <div className="mb-3 text-[11px]">
                      <div className="flex items-center gap-1 mb-2 text-text-muted">
                        <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"/>选项参照表（满分 5 分 · 彩色标记=模型选择）
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] border-collapse">
                          <thead>
                            <tr className="border-b border-border-subtle text-text-muted">
                              <th className="text-left py-1.5 pr-2 w-12">分值</th>
                              <th className="text-left py-1.5 pr-2 w-20">标签</th>
                              <th className="text-left py-1.5">选项摘要 · 选择模型</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dim.options.map((opt, oi) => {
                              const pickedBy = aiModels.filter(m => dim.models[m.key] === oi + 1);
                              return (
                                <tr key={oi} className="border-b border-border-subtle last:border-0">
                                  <td className={'py-1.5 pr-2 font-medium ' + (pickedBy.length > 0 ? 'text-purple-600' : 'text-text-muted')}>{opt.score}分</td>
                                  <td className={'py-1.5 pr-2 ' + (pickedBy.length > 0 ? 'font-semibold' : '')}>
                                    <span className={pickedBy.length > 0 ? 'text-text-primary' : 'text-text-secondary'}>{opt.label}</span>
                                  </td>
                                  <td className="py-1.5">
                                    <span className="text-text-muted">{opt.summary}</span>
                                    {pickedBy.length > 0 && (
                                      <span className="ml-2 inline-flex gap-0.5">
                                        {pickedBy.map(m => (
                                          <span key={m.key} className="px-1 py-0.5 rounded text-[8px] text-white font-medium" style={{ backgroundColor: m.color }} title={m.name}>{m.abbr}</span>
                                        ))}
                                      </span>
                                    )}
                                  </td>
                                </tr>);
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Human distribution bar */}
                    <div className="p-3 rounded-lg bg-emerald-50/30 border border-emerald-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={13} className="text-emerald-600" />
                        <span className="text-xs font-medium text-text-primary">人员评分分布（匿名 · {totalHuman}人参与）</span>
                      </div>
                      <div className="space-y-1">
                        {dim.humanDist.map((count, hi) => (
                          <div key={hi} className="flex items-center gap-2 text-[11px]">
                            <span className="w-12 text-right text-text-muted shrink-0">{dim.options[hi].score}分 {dim.options[hi].label}</span>
                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-emerald-500 flex items-center justify-end pr-1.5 text-[9px] text-white font-medium transition-all"
                                style={{ width: 'calc(' + count + '/' + totalHuman + '*100%)' }}>
                                {count >= 2 ? count : ''}
                              </div>
                            </div>
                            <span className="w-8 text-right text-text-secondary">{count}人</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Sub metrics (overview only) */}
          {scoringMode === 'overview' && (
            <div className="bg-canvas rounded-xl border border-border-subtle p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4">各维度子指标拆解 · AI vs 人为</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detailScores.map((d) => {
                  const entries = Object.entries(d).filter(([k]) => k !== 'name');
                  return (<div key={d.name} className="p-3 rounded-lg bg-surface/60 border border-border-subtle">
                    <div className="text-xs font-semibold text-text-primary mb-2">{d.name}</div>
                    <div className="space-y-1">{entries.map(([k, v]) => { const isAi = k.startsWith('AI');
                      return (<div key={k} className="flex items-center gap-2 text-[11px]"><span className={'w-14 shrink-0 '+(isAi?'text-purple-500':'text-emerald-500')}>{k.replace(/^(AI|人)·/,'')}</span><div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden"><div className={'h-full rounded-full '+(isAi?'bg-purple-400':'bg-emerald-400')} style={{width: (v/5*100)+'%'}}/></div><span className={'w-6 text-right font-medium '+(isAi?'text-purple-600':'text-emerald-600')}>{v}</span></div>);})}</div>
                  </div>);
                })}
              </div>
            </div>
          )}

          {/* ── 问卷选项分布图 (可折叠) ── */}
          <div className="bg-canvas rounded-xl border border-border-subtle p-5">
            <button onClick={() => setDistributionOpen(!distributionOpen)} className="flex items-center justify-between w-full text-left">
              <h3 className="text-sm font-semibold text-text-primary">问卷选项分布可视化</h3>
              <span className="text-xs text-text-muted">{distributionOpen ? '收起 ▲' : '展开 ▼'}</span>
            </button>
            {distributionOpen && (
              <div className="mt-5 pt-4 border-t border-border-subtle">
                <p className="text-[11px] text-text-muted mb-4">{humanRespondents}位评委各题选项分布 · 数据源自飞书Base评审问卷</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {questionDistribution.map((q) => (
                  <div key={q.question} className="bg-surface/50 rounded-xl border border-border-subtle p-4">
                    <div className="text-xs font-semibold text-text-primary mb-3 text-center">{q.question}</div>
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={q.data} layout="vertical" barSize={16} margin={{ left: 80, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis type="category" dataKey="name" tick={({ x, y, payload }) => {
                          const full = payload.value;
                          const parts = full.split(' | ');
                          const label = parts[0];
                          const desc = parts[1] || '';
                          const color = q.data.find(e => e.name === full)?.color || '#94a3b8';
                          return (
                            <g transform={`translate(${x},${y})`}>
                              <text x={-6} y={0} dy={4} textAnchor="end" fill={color} fontSize={10}>
                                {label}
                                <title>{full}</title>
                              </text>
                            </g>
                          );
                        }} width={90} />
                        <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 11 }} formatter={(value) => [value + '人', '']} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {q.data.map((entry, idx) => (<Cell key={idx} fill={entry.color} />))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>))}
                </div>
              </div>
            )}
          </div>

          {/* 问卷数据来源 */}
          <div className="bg-emerald-50/30 rounded-xl border border-emerald-100 p-4 flex items-center gap-3">
            <Users size={18} className="text-emerald-500" />
            <div>
              <div className="text-sm font-medium text-text-primary">人为问卷数据来源</div>
              <p className="text-xs text-text-secondary mt-0.5">{humanNote}</p>
              <a href="https://youzu.feishu.cn/base/CyPzbugpAabo80s3yLIc9PWXnAb" target="_blank" rel="noopener" className="text-xs text-accent hover:underline mt-0.5 inline-block">查看飞书 Base 原始问卷 →</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
