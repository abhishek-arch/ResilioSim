import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Moon, Sun, Link as LinkIcon } from "lucide-react";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [useOtp, setUseOtp] = useState(false);

  const checkStrength = (pwd) => {
    if (pwd.length < 4) return "Weak";
    if (pwd.length < 8) return "Medium";
    return "Strong";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(checkStrength(pwd));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useOtp) {
      console.log("OTP Login with:", email, "OTP:", otp);
    } else {
      console.log("Email:", email, "Password:", password);
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 min-h-screen flex items-center justify-center"
          : "bg-gray-100 min-h-screen flex items-center justify-center"
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl relative overflow-hidden shadow-2xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Animated Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-20 blur-3xl"></div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 relative">
          {useOtp ? "OTP Login" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email / Phone</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 ${
                darkMode ? "bg-gray-700 border-gray-600" : "bg-white"
              }`}
              placeholder="Enter your email or phone"
              required
            />
          </div>

          {/* Conditional: Password or OTP */}
          {!useOtp ? (
            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 pr-10 ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white"
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && (
                <p
                  className={`text-sm mt-1 ${
                    strength === "Weak"
                      ? "text-red-500"
                      : strength === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  Password Strength: {strength}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 ${
                  darkMode ? "bg-gray-700 border-gray-600" : "bg-white"
                }`}
                placeholder="Enter OTP"
                required
              />
              <button
                type="button"
                className="mt-2 text-sm text-indigo-500 hover:underline"
              >
                Send OTP
              </button>
            </div>
          )}

          {/* Remember + Switch Mode */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <button
              type="button"
              onClick={() => setUseOtp(!useOtp)}
              className="text-sm text-indigo-600 hover:underline"
            >
              {useOtp ? "Use Password Instead" : "Login with OTP"}
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            {useOtp ? "Verify OTP" : "Login"}
          </motion.button>
        </form>

        {/* Social Logins */}
        <div className="mt-6 space-y-3">
          <p className="text-center text-gray-500 dark:text-gray-400">
            or continue with
          </p>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <Mail size={18} /> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <LinkIcon size={18} /> Magic Link
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

