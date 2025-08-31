import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ important

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // ✅ use lowercase

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
         credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        navigate('/userdashboard'); // ✅ fixed
      } else {
        setErrors({ general: data.message || 'Login failed' });
        toast.error(data.message || "Login failed", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong", { // ✅ fixed
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }

    setIsSubmitting(false);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    alert('Forgot password functionality would be implemented here');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-white/70">Sign in to your account</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center mt-2 text-red-300 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full pl-11 pr-11 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </div>
                  </div>
                  {errors.password && (
                    <div className="flex items-center mt-2 text-red-300 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className="flex items-center cursor-pointer"
                  >
                    <div className={`w-5 h-5 rounded border-2 border-white/20 flex items-center justify-center transition-all duration-300 ${rememberMe ? 'bg-indigo-500 border-indigo-500' : 'bg-white/10'}`}>
                      {rememberMe && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-2 text-sm text-white/70">Remember me</span>
                  </div>
                </div>
                <div
                  onClick={handleForgotPassword}
                  className="text-sm text-indigo-300 hover:text-indigo-200 cursor-pointer transition-colors"
                >
                  Forgot password?
                </div>
              </div>

              {/* Sign In Button */}
              <div
                onClick={handleSubmit}
                className={`w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 text-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/70">or continue with</span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-white/70">
                Don't have an account?{' '}
                <Link to="/usersignup" className="text-indigo-300 hover:text-indigo-200 font-semibold transition-colors cursor-pointer">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Additional Options */}
            <div className="text-center mt-6">
              <div className="flex justify-center space-x-6 text-sm text-white/50">
                <span className="hover:text-white/70 cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white/70 cursor-pointer transition-colors">Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* ✅ keep only one, no extra options unless needed */}
    </>
  );
}
