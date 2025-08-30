import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, MapPin, Users, Eye, EyeOff, Upload } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);

  // Track form completion progress
  const handleInput = () => {
    const inputs = document.querySelectorAll("input, textarea, select");
    let filled = 0;
    inputs.forEach((inp) => {
      if (inp.value.trim() !== "") filled++;
    });
    setProgress(Math.round((filled / inputs.length) * 100));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl p-8 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl relative"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create Your Account</h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div className="h-2 bg-indigo-600 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onInput={handleInput}>
          {/* Profile Picture Upload */}
          <div className="md:col-span-2 flex flex-col items-center">
            <label className="cursor-pointer flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-300 hover:bg-indigo-100">
              <Upload className="w-5 h-5 text-indigo-600" />
              <span>Upload Profile Picture</span>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" className="w-full pl-10 mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter full name" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="email" className="w-full pl-10 mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter email" />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type={showPassword ? "text" : "password"} className="w-full pl-10 mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 pr-10" placeholder="Create password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="password" className="w-full pl-10 mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Confirm password" />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" className="w-full pl-10 mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter phone number" />
            </div>
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium">OTP</label>
            <input type="text" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter OTP" />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input type="date" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" className="w-full pl-10 mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter location" />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-sm font-medium">Emergency Contact</label>
            <input type="text" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter emergency contact" />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400">
              <option>User</option>
              <option>Volunteer</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Family Details */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Family Details</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea className="w-full pl-10 mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter family details (Name, Age, Relation, Health Info)"></textarea>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="md:col-span-2 flex items-center">
            <input type="checkbox" className="mr-2" /> I agree to the <span className="text-indigo-600 font-medium ml-1">Terms & Conditions</span>
          </div>

          {/* Social Sign Up */}
          <div className="md:col-span-2 flex gap-4 justify-center">
            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>
            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-5 h-5" />
              Sign up with Facebook
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="md:col-span-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg shadow-md hover:opacity-90 transition-all"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
