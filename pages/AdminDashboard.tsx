
import React, { useState } from 'react';
import { useApp } from '../App';
import { Course, Module, Lesson } from '../types';
import { generateCourseOutline } from '../services/geminiService';

const AdminDashboard = () => {
  const { state, updateCourses } = useApp();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  
  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updated = state.courses.filter(c => c.id !== id);
      updateCourses(updated);
    }
  };

  const handleAISuggestOutline = async () => {
    if (!newCourseTitle) return alert('Enter a title first');
    setIsGenerating(true);
    const outline = await generateCourseOutline(newCourseTitle);
    alert('AI Suggested Outline:\n\n' + outline);
    setIsGenerating(false);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      title: newCourseTitle || 'Untitled Course',
      description: 'New course created by admin.',
      longDescription: 'Extended description...',
      price: 49.99,
      thumbnail: `https://picsum.photos/seed/${Math.random()}/800/450`,
      instructor: state.user?.name || 'Admin',
      category: 'General',
      rating: 0,
      studentsCount: 0,
      modules: []
    };
    updateCourses([...state.courses, newCourse]);
    setIsAddingCourse(false);
    setNewCourseTitle('');
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Instructor Console</h1>
            <p className="text-slate-500">Manage your academy and track student metrics.</p>
          </div>
          <button 
            onClick={() => setIsAddingCourse(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <i className="fas fa-plus"></i> Create New Course
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '$24,500', icon: 'fa-dollar-sign', color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Active Students', value: '1,240', icon: 'fa-users', color: 'text-indigo-600 bg-indigo-50' },
            { label: 'Course Completion', value: '68%', icon: 'fa-graduation-cap', color: 'text-amber-600 bg-amber-50' },
            { label: 'Student Rating', value: '4.8', icon: 'fa-star', color: 'text-rose-600 bg-rose-50' },
          ].map(stat => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-6">
              <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-xl`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Your Courses</h2>
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input type="text" placeholder="Search courses..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.courses.map(course => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={course.thumbnail} className="w-16 h-10 object-cover rounded-lg" alt="" />
                        <div>
                          <p className="font-bold text-slate-800">{course.title}</p>
                          <p className="text-xs text-slate-400">{course.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">{course.studentsCount}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">${course.price}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">Published</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-all"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for adding course */}
      {isAddingCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddingCourse(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Course</h2>
            <form onSubmit={handleAddCourse} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    placeholder="E.g. Advanced Typography Mastery"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                    required 
                  />
                  <button 
                    type="button"
                    onClick={handleAISuggestOutline}
                    disabled={isGenerating}
                    className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
                    title="Get AI suggested outline"
                  >
                    <i className={`fas ${isGenerating ? 'fa-spinner animate-spin' : 'fa-wand-magic-sparkles'}`}></i>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>Development</option>
                    <option>Design</option>
                    <option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                  <input type="number" defaultValue="49.99" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddingCourse(false)}
                  className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-xl font-bold hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
