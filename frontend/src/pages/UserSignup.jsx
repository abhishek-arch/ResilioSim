import React from "react";

export default function Signup() {
  return (
    <div className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Sign Up</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input type="text" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter full name" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter email" />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Create password" />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input type="password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Confirm password" />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input type="text" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter phone number" />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input type="text" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter location" />
        </div>

        <div>
          <label className="block text-sm font-medium">Emergency Contact</label>
          <input type="text" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter emergency contact" />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400">
            <option>User</option>
            <option>Volunteer</option>
            <option>Admin</option>
          </select>
        </div>

        {/* Family Details Section */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Family Details</label>
          <textarea className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter family details (Name, Age, Relation, Health Info)"></textarea>
        </div>

        <div className="md:col-span-2 flex items-center">
          <input type="checkbox" className="mr-2" /> I agree to the Terms & Conditions
        </div>

        <button type="submit" className="md:col-span-2 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all">
          Sign Up
        </button>
      </form>
    </div>
  );
}
