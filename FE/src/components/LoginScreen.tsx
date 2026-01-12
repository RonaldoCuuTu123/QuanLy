import React, { useState } from 'react';
import { LogIn, AlertCircle, Loader } from 'lucide-react';
import { api } from '@/services/api';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin1234');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.login(username, password);

      if (response.token) {
        onLoginSuccess();
      } else {
        setError('Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } catch (err: any) {
      console.error('Lỗi đăng nhập:', err);
      const errorMessage = err.response?.data?.message ||
        err.message ||
        'Lỗi kết nối đến server. Vui lòng kiểm tra Backend.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white rounded-full p-3">
                <LogIn className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">
              Hệ thống Quản lý Tổ Dân Phố
            </h1>
            <p className="text-blue-100 text-center text-sm mt-2">
              La Khê - Hà Đông
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-6 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium text-sm">Lỗi đăng nhập</p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Username Field */}
            <div className="mb-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Đăng nhập
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-gray-600 text-xs text-center">
              <strong>Tài khoản demo:</strong>
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              Tên đăng nhập: <code className="bg-gray-100 px-2 py-1 rounded">admin1234</code>
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              Mật khẩu: <code className="bg-gray-100 px-2 py-1 rounded">1234</code>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            Liên hệ quản trị viên nếu bạn quên mật khẩu hoặc cần hỗ trợ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
