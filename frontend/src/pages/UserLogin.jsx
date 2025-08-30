

export default function UserLogin() {
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Login</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter your email" />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Enter your password" />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember Me
          </label>
          <a href="/" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all">
          Login
        </button>
      </form>
    </div>
  );
}
