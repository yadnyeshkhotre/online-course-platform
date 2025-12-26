
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { UserRole } from '../types';

const SignupPage = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    login(UserRole.STUDENT);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2">Join the Community</h1>
            <p className="text-slate-500">Start learning with world-class experts today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" required />
              <p className="text-xs text-slate-500 leading-normal">
                I agree to the <a href="#" className="text-indigo-600 font-bold">Terms of Service</a> and <a href="#" className="text-indigo-600 font-bold">Privacy Policy</a>.
              </p>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
