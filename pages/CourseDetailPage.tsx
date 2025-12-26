
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { UserRole } from '../types';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, enroll } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const course = state.courses.find(c => c.id === id);
  const isEnrolled = state.user?.enrolledCourseIds.includes(id || '');

  if (!course) return <div className="p-20 text-center">Course not found.</div>;

  const handleEnroll = () => {
    if (!state.user) {
      navigate('/login');
      return;
    }
    
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      enroll(course.id);
      setIsProcessing(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Info */}
      <div className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <nav className="flex gap-2 text-sm text-indigo-400 mb-6">
              <span>Courses</span>
              <span>/</span>
              <span>{course.category}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-xl">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500">
                  <img src={`https://i.pravatar.cc/150?u=${course.instructor}`} alt="" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Created by</p>
                  <p className="font-bold">{course.instructor}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400">Last updated</p>
                <p className="font-bold">Oct 2024</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Enrolled</p>
                <p className="font-bold">{course.studentsCount} Students</p>
              </div>
            </div>
          </div>
          
          <div className="lg:block hidden">
             <div className="bg-white rounded-3xl p-4 shadow-2xl shadow-indigo-500/10">
                <img src={course.thumbnail} className="rounded-2xl w-full" alt="" />
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-slate-50 rounded-3xl border border-slate-100">
              {[
                'Master industrial-grade workflows',
                'Build a portfolio of real projects',
                'Learn from industry veterans',
                'Get lifetime access to updates',
                'Exclusive community access',
                'Personalized feedback loops'
              ].map(item => (
                <div key={item} className="flex gap-3 items-start">
                  <i className="fas fa-check text-indigo-600 mt-1"></i>
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Course Content</h2>
            <div className="space-y-4">
              {course.modules.map(module => (
                <div key={module.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                  <div className="bg-slate-50 p-5 flex justify-between items-center cursor-pointer">
                    <span className="font-bold text-slate-800">{module.title}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-widest">{module.lessons.length} Lessons</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {module.lessons.map(lesson => (
                      <div key={lesson.id} className="flex items-center justify-between text-sm py-2 px-3 hover:bg-slate-50 rounded-lg transition-colors group">
                        <div className="flex items-center gap-3">
                          <i className={`fas ${lesson.isPreview ? 'fa-play-circle text-indigo-500' : 'fa-lock text-slate-300'} text-lg`}></i>
                          <span className="text-slate-700 font-medium">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          {lesson.isPreview && (
                            <span className="text-xs font-bold text-indigo-600 uppercase">Preview</span>
                          )}
                          <span className="text-slate-400">{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Checkout Card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl shadow-slate-200/50">
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">${course.price}</span>
              <span className="text-slate-400 line-through ml-3 text-lg">$199.99</span>
              <p className="text-red-500 text-sm font-bold mt-2">50% Off - Ending soon!</p>
            </div>

            {isEnrolled ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-all mb-4 flex items-center justify-center gap-2"
              >
                <i className="fas fa-play"></i> Continue Learning
              </button>
            ) : (
              <button 
                onClick={handleEnroll}
                disabled={isProcessing}
                className={`w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all mb-4 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-3">
                    <i className="fas fa-spinner animate-spin"></i> Processing...
                  </span>
                ) : 'Enroll Now'}
              </button>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <i className="fas fa-infinity text-indigo-500"></i>
                <span>Full lifetime access</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <i className="fas fa-mobile-alt text-indigo-500"></i>
                <span>Access on mobile and TV</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <i className="fas fa-certificate text-indigo-500"></i>
                <span>Certificate of completion</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Secure Checkout</p>
              <div className="flex justify-center gap-4 text-2xl text-slate-300">
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-paypal"></i>
                <i className="fab fa-cc-apple-pay"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
