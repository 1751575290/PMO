import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Brand */}
      <div className="hidden lg:flex w-1/2 bg-sidebar relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple rounded-full blur-3xl" />
        </div>
        <div className="relative text-center max-w-md px-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent/30">
            <LayoutDashboard size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">PMO Suite</h1>
          <p className="text-lg text-white/50 leading-relaxed">
            企业级项目信息管理系统<br />
            战略执行 · 资源优化 · 决策驱动
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-white/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-white/60">180+</div>
              <div className="text-xs mt-1">活跃项目</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white/60">94.7%</div>
              <div className="text-xs mt-1">准时交付</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white/60">320+</div>
              <div className="text-xs mt-1">团队成员</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center bg-surface px-6">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-text-primary">欢迎回来</h2>
            <p className="text-text-secondary mt-1">登录你的账户以继续</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">邮箱</label>
              <input
                type="email"
                defaultValue="admin@pmo.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-canvas text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                placeholder="请输入邮箱"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">密码</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  defaultValue="password"
                  className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-canvas text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all pr-10"
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border-subtle text-accent focus:ring-accent/20" />
                记住我
              </label>
              <a href="#" className="text-sm text-accent hover:text-accent-dark transition-colors">忘记密码？</a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-sidebar hover:bg-sidebar-hover text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-sidebar/10"
            >
              登录
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-subtle text-center">
            <p className="text-xs text-text-muted">
              支持 SSO 单点登录 · LDAP · SAML 2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
