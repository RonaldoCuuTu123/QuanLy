import React, { useState, useEffect } from 'react';
import {
  Users, Home, CreditCard, BarChart3, Menu, X, FileText, LogIn, LogOut
} from 'lucide-react';
import { AppView, Household, Resident, FeeCampaign, Payment } from '@/types';
import { api } from '@/services/api';
import HouseholdManager from '@/components/HouseholdManager';
import ResidentManager from '@/components/ResidentManager';
import FeeManager from '@/components/FeeManager';
import Statistics from '@/components/Statistics';
import Dashboard from '@/components/Dashboard';

// Định nghĩa kiểu Role
type UserRole = 'Tổ trưởng' | 'Cán bộ hành chính' | 'Thủ quỹ' | null;

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // App State
  const [view, setView] = useState<AppView>('DASHBOARD');
  const [households, setHouseholds] = useState<Household[]>([]);
  const [fees, setFees] = useState<FeeCampaign[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // Kiểm tra đăng nhập khi mở App
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') as UserRole;
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      fetchData(); // Tải dữ liệu ngay nếu đã login
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const data = await api.login(username, password);
      // Lưu thông tin
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); // Role trả về từ BE: 'Tổ trưởng', 'Thủ quỹ', etc.
      localStorage.setItem('userId', data.id);

      setIsAuthenticated(true);
      setUserRole(data.role);
      setUsername('');
      setPassword('');
      fetchData();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Đăng nhập thất bại. Kiểm tra lại tài khoản/mật khẩu.';
      setLoginError(errorMessage);
      console.error('Login error details:', err);
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername('');
    setPassword('');
    setHouseholds([]);
    setFees([]);
    setPayments([]);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [householdsData, feesData, paymentsData] = await Promise.all([
        api.getHouseholds(),
        api.getFeeCampaigns(),
        api.getPayments()
      ]);
      setHouseholds(householdsData);
      setFees(feesData);
      setPayments(paymentsData);
      setDataError(null);
    } catch (err) {
      console.error('Lỗi tải dữ liệu:', err);
      setDataError('Không thể tải dữ liệu từ server. Hãy đảm bảo Backend đang chạy ở port 3001.');
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIC PHÂN QUYỀN MENU ---
  // Tổ trưởng (admin): Full quyền
  // Cán bộ hành chính (canbo): Quản lý hộ khẩu, nhân khẩu, thống kê
  // Thủ quỹ (ketoan): Quản lý thu phí, thống kê
  const getNavItems = () => {
    const allItems = [
      { id: 'DASHBOARD', icon: Home, label: 'Bảng điều khiển' },
      { id: 'HOUSEHOLDS', icon: FileText, label: 'Quản lý Hộ khẩu' },
      { id: 'RESIDENTS', icon: Users, label: 'Quản lý Nhân khẩu' },
      { id: 'FEES', icon: CreditCard, label: 'Thu phí & Đóng góp' },
      { id: 'STATS', icon: BarChart3, label: 'Thống kê báo cáo' },
    ];

    if (userRole === 'Tổ trưởng') return allItems;

    if (userRole === 'Cán bộ hành chính') {
      return allItems.filter(item => ['DASHBOARD', 'HOUSEHOLDS', 'RESIDENTS', 'STATS'].includes(item.id));
    }

    if (userRole === 'Thủ quỹ') {
      return allItems.filter(item => ['DASHBOARD', 'FEES', 'STATS'].includes(item.id));
    }

    return []; // Không có quyền
  };

  const navItems = getNavItems();

  // --- MÀN HÌNH ĐĂNG NHẬP ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Quản Lý Tổ Dân Phố</h1>
            <p className="text-slate-500">Đăng nhập để tiếp tục</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="admin, canbo, ketoan..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="••••••"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Đăng nhập
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-slate-400">
            <p>Mặc định: admin/123, canbo/123, ketoan/123</p>
          </div>
        </div>
      </div>
    );
  }

  // --- MÀN HÌNH LOADING ---
  if (loading && households.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN CHÍNH ---
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col z-50`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && (
            <div>
              <h1 className="font-bold text-white text-lg tracking-tight">TDP 7 La Khê</h1>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-200">{userRole}</span>
            </div>
          )}
        </div>

        <nav className="flex-1 mt-6 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as AppView)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 mb-2 ${view === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'hover:bg-slate-800 hover:text-white'
                }`}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-red-900/30 hover:text-red-400 text-slate-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium">Đăng xuất</span>}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-slate-800 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            {isSidebarOpen && <span className="font-medium">Thu gọn</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {navItems.find(i => i.id === view)?.label || 'Trang chủ'}
            </h2>
            <p className="text-sm text-slate-500">Xin chào, {userRole}</p>
          </div>
          {/* ... giữ nguyên phần avatar user ... */}
        </header>

        {dataError && (
          <div className="p-8 pb-0">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <p className="font-semibold">Lỗi kết nối Server</p>
              <p className="text-sm">{dataError}</p>
            </div>
          </div>
        )}

        <div className="p-8">
          {view === 'DASHBOARD' && (
            <Dashboard households={households} payments={payments} setView={setView} />
          )}

          {/* Chỉ render nếu có quyền */}
          {view === 'HOUSEHOLDS' && (userRole === 'Tổ trưởng' || userRole === 'Cán bộ hành chính') && (
            <HouseholdManager households={households} setHouseholds={setHouseholds} />
          )}

          {view === 'RESIDENTS' && (userRole === 'Tổ trưởng' || userRole === 'Cán bộ hành chính') && (
            <ResidentManager households={households} setHouseholds={setHouseholds} />
          )}

          {view === 'FEES' && (userRole === 'Tổ trưởng' || userRole === 'Thủ quỹ') && (
            <FeeManager households={households} fees={fees} payments={payments} setPayments={setPayments} setFees={setFees} />
          )}

          {view === 'STATS' && (
            <Statistics households={households} payments={payments} fees={fees} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;