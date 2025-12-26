
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';

const CourseListingPage = () => {
  const { state } = useApp();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(state.courses.map(c => c.category))];
  const filteredCourses = filter === 'All' 
    ? state.courses 
    : state.courses.filter(c => c.category === filter);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Master Your Craft</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Browse our curated collection of expert-led courses designed to take you from beginner to professional.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              filter === cat 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <Link 
            key={course.id} 
            to={`/course/${course.id}`} 
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all flex flex-col"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 uppercase tracking-wider">
                {course.category}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400 text-xs">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className="text-xs font-bold text-slate-400">({course.rating})</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {course.title}
              </h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={`https://i.pravatar.cc/150?u=${course.instructor}`} alt="" className="w-8 h-8 rounded-full" />
                  <span className="text-xs font-medium text-slate-600">{course.instructor}</span>
                </div>
                <span className="text-xl font-black text-slate-900">${course.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseListingPage;
