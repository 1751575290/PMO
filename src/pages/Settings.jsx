import { Save, UserPlus, Shield, Database, BellRing, Globe, Palette, Zap } from 'lucide-react';

const settingSections = [
  {
    icon: UserPlus,
    title: '用户与权限',
    desc: '管理用户账号、角色权限和部门组织架构',
    items: ['角色管理', '权限模板', '部门管理', '账号审批']
  },
  {
    icon: Shield,
    title: '安全策略',
    desc: '配置密码策略、SSO、IP白名单等安全设置',
    items: ['密码策略', 'SSO配置', 'IP白名单', '审计日志']
  },
  {
    icon: Database,
    title: '项目管理',
    desc: '自定义项目流程、字段、模板和审批规则',
    items: ['工作流配置', '自定义字段', '项目模板', '审批规则']
  },
  {
    icon: BellRing,
    title: '通知提醒',
    desc: '配置消息通知规则、渠道和提醒策略',
    items: ['通知规则', '邮件模板', '企微/钉钉集成', '预警规则']
  },
  {
    icon: Palette,
    title: '界面与品牌',
    desc: '自定义系统界面主题、Logo和品牌元素',
    items: ['主题配色', 'Logo设置', '登录页配置', '菜单定制']
  },
  {
    icon: Zap,
    title: '集成与API',
    desc: '管理系统集成、API密钥和第三方应用连接',
    items: ['API管理', 'Webhook', '第三方集成', '数据导入导出']
  },
];

export default function Settings() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">系统设置</h2>
          <p className="text-sm text-text-secondary mt-0.5">PMO Suite Enterprise v3.2.1</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-sidebar text-white rounded-lg text-sm font-medium hover:bg-sidebar-hover transition-colors">
          <Save size={16} />
          保存设置
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingSections.map((section, i) => (
          <div key={i} className="bg-canvas rounded-xl border border-border-subtle p-5 hover:shadow-sm transition-shadow cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <section.icon size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">{section.title}</h3>
                <p className="text-xs text-text-muted mt-0.5">{section.desc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {section.items.map((item, j) => (
                <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-surface text-text-secondary border border-border-subtle">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* System Info */}
      <div className="bg-canvas rounded-xl border border-border-subtle p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">系统信息</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '版本号', value: 'v3.2.1 Enterprise' },
            { label: '许可到期', value: '2027-06-30' },
            { label: '用户席位', value: '500/500 (已满)' },
            { label: '存储使用', value: '286GB / 1TB' },
          ].map((info, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface">
              <div className="text-xs text-text-muted mb-1">{info.label}</div>
              <div className="text-sm font-medium text-text-primary">{info.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-canvas rounded-xl border border-red-200 p-5">
        <h3 className="text-sm font-semibold text-danger mb-3">危险区域</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-primary">重置所有数据</p>
            <p className="text-xs text-text-muted mt-0.5">此操作不可撤销，将清除所有项目数据和配置</p>
          </div>
          <button className="px-4 py-2 border border-red-200 text-danger text-sm rounded-lg hover:bg-red-50 transition-colors">
            重置数据
          </button>
        </div>
      </div>
    </div>
  );
}
