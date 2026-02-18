import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { Heart, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      
      login(token, user);

      // Navigate based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'donor':
          navigate('/donor/dashboard');
          break;
        case 'beneficiary':
          navigate('/beneficiary/dashboard');
          break;
        case 'volunteer':
          navigate('/volunteer/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4 shadow-lg">
            <Heart className="h-8 w-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
          <p className="text-neutral-600">Sign in to continue making a difference</p>
        </div>

        {/* Login Form */}
        <div className="card animate-slide-up shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2 animate-scale-in">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center mb-3">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-neutral-50 p-2 rounded">
                <p className="font-medium text-neutral-700">Admin</p>
                <p className="text-neutral-500">admin@demo.com</p>
              </div>
              <div className="bg-neutral-50 p-2 rounded">
                <p className="font-medium text-neutral-700">Donor</p>
                <p className="text-neutral-500">donor@demo.com</p>
              </div>
              <div className="bg-neutral-50 p-2 rounded">
                <p className="font-medium text-neutral-700">Beneficiary</p>
                <p className="text-neutral-500">beneficiary@demo.com</p>
              </div>
              <div className="bg-neutral-50 p-2 rounded">
                <p className="font-medium text-neutral-700">Volunteer</p>
                <p className="text-neutral-500">volunteer@demo.com</p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 text-center mt-2">Password: demo123</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-600 mt-6">
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;