
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';

const LandingPage = () => {
  const { state } = useApp();

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-60 transform -translate-x-1/2 translate-y-1/2"></div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-8 animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            New Courses Available Now
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600">Full Potential</span><br />
            With Expert-Led Courses
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 100,000+ students learning the most in-demand skills from industry leaders. Start your career transition today with hands-on projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/courses" 
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1"
            >
              Explore All Courses
            </Link>
            {!state.user && (
              <Link 
                to="/signup" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all hover:-translate-y-1"
              >
                Sign Up for Free
              </Link>
            )}
          </div>

          <div className="mt-20 relative max-w-5xl mx-auto">
            <img 
              src="https://picsum.photos/seed/learn/1200/600" 
              alt="Platform Preview" 
              className="rounded-3xl shadow-2xl border-4 border-white"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <i className="fas fa-check-circle text-2xl"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Job Guaranteed</p>
                  <p className="text-xs text-slate-500">98% Success Rate</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <i className="fas fa-users text-2xl"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Active Community</p>
                  <p className="text-xs text-slate-500">12k+ Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Categories</h2>
              <p className="text-slate-500">Discover paths tailored for your professional growth.</p>
            </div>
            <Link to="/courses" className="text-indigo-600 font-semibold hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Development', icon: 'fa-code', color: 'bg-blue-50 text-blue-600' },
              { name: 'Design', icon: 'fa-pen-nib', color: 'bg-purple-50 text-purple-600' },
              { name: 'Business', icon: 'fa-chart-line', color: 'bg-green-50 text-green-600' },
              { name: 'Marketing', icon: 'fa-bullhorn', color: 'bg-orange-50 text-orange-600' },
            ].map(cat => (
              <div key={cat.name} className="p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all text-center cursor-pointer group">
                <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${cat.icon}`}></i>
                </div>
                <h3 className="font-bold text-slate-800">{cat.name}</h3>
                <p className="text-sm text-slate-400 mt-2">120+ Courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
