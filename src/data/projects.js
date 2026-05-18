export const INITIAL_PROJECTS = [
  { id: 'P2026-001', name: '代号·星辰 开放世界MMO', dept: '策划工作室', pm: '林晨', progress: 78, status: '进行中', priority: '高', budget: '2,800万', members: 24, startDate: '2026-01-15', endDate: '2026-09-30' },
  { id: 'P2026-002', name: '代号·破晓 战术竞技', dept: '发行运营中心', pm: '苏婉', progress: 92, status: '进行中', priority: '高', budget: '1,200万', members: 18, startDate: '2025-11-01', endDate: '2026-06-30' },
  { id: 'P2026-003', name: '代号·幻塔 二次元卡牌', dept: '数据分析中心', pm: '赵翼', progress: 45, status: '进行中', priority: '中', budget: '1,500万', members: 16, startDate: '2026-03-01', endDate: '2026-12-31' },
  { id: 'P2026-004', name: '代号·龙魂 国风动作RPG', dept: '财务法务中心', pm: '韩冰', progress: 100, status: '已完成', priority: '高', budget: '900万', members: 12, startDate: '2025-06-01', endDate: '2026-04-15' },
  { id: 'P2026-005', name: '代号·暗潮 赛博朋克FPS', dept: '技术中台', pm: '周恒', progress: 65, status: '进行中', priority: '中', budget: '600万', members: 14, startDate: '2026-02-01', endDate: '2026-08-31' },
  { id: 'P2026-006', name: '代号·山海 休闲放置', dept: '产品创新部', pm: '唐菲', progress: 30, status: '进行中', priority: '高', budget: '1,800万', members: 22, startDate: '2026-04-01', endDate: '2027-03-31' },
  { id: 'P2026-007', name: '代号·极光 三消养成', dept: '合规安全部', pm: '陆骁', progress: 88, status: '进行中', priority: '高', budget: '750万', members: 10, startDate: '2026-01-01', endDate: '2026-07-31' },
  { id: 'P2026-008', name: '代号·永恒 策略SLG', dept: '策划工作室', pm: '沈韵', progress: 55, status: '进行中', priority: '中', budget: '1,100万', members: 20, startDate: '2026-03-15', endDate: '2026-11-30' },
];

export const DEPARTMENT_OPTIONS = [...new Set(INITIAL_PROJECTS.map((p) => p.dept))].sort();

export function generateProjectId(projects) {
  const nums = projects
    .map((p) => parseInt(p.id.replace('P2026-', ''), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `P2026-${String(next).padStart(3, '0')}`;
}

export function formatBudget(amount) {
  const n = Number(amount);
  if (Number.isNaN(n) || n <= 0) return '';
  return `${n.toLocaleString('zh-CN')}万`;
}
