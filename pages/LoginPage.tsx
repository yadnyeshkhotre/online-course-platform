
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { UserRole } from '../types';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent, role: UserRole = UserRole.STUDENT) => {
    e.preventDefault();
    login(role);
    navigate(role === UserRole.ADMIN ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                <span className="text-slate-500">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 font-bold hover:underline">Forgot password?</a>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-center text-sm text-slate-500 mb-6">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={(e) => handleLogin(e, UserRole.STUDENT)}
                className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
              >
                Login as Student
              </button>
              <button 
                onClick={(e) => handleLogin(e, UserRole.ADMIN)}
                className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
              >
                Login as Instructor
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-slate-500">
            Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
