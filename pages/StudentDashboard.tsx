
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';

const StudentDashboard = () => {
  const { state } = useApp();
  
  const enrolledCourses = state.courses.filter(c => 
    state.user?.enrolledCourseIds.includes(c.id)
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {state.user?.name}!</h1>
            <p className="text-slate-500">You have {enrolledCourses.length} active courses in your library.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <i className="fas fa-fire"></i>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Daily Streak</p>
                <p className="font-bold text-slate-800">12 Days</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Hours Learned</p>
                <p className="font-bold text-slate-800">45.5h</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="relative aspect-video">
                  <img src={course.thumbnail} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      to={`/lesson/${course.id}/${course.modules[0].lessons[0].id}`}
                      className="w-16 h-16 bg-white text-indigo-600 rounded-full flex items-center justify-center text-xl shadow-2xl transform scale-75 group-hover:scale-100 transition-transform"
                    >
                      <i className="fas fa-play ml-1"></i>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-800 mb-4 line-clamp-1">{course.title}</h3>
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
                      <span>Course Progress</span>
                      <span>{Math.floor(Math.random() * 80 + 10)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <Link 
                    to={`/lesson/${course.id}/${course.modules[0].lessons[0].id}`}
                    className="block w-full text-center py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                  >
                    Resume Lesson
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 text-3xl">
                <i className="fas fa-book-open"></i>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">No courses enrolled yet</h2>
              <p className="text-slate-500 mb-8">Start your learning journey today by exploring our catalog.</p>
              <Link to="/courses" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                Browse Courses
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
