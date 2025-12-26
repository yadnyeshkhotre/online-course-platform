
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { User, UserRole, Course, AppState } from './types';
import { MOCK_COURSES, MOCK_STUDENT, MOCK_ADMIN } from './constants';

// Context
interface AppContextType {
  state: AppState;
  login: (role: UserRole) => void;
  logout: () => void;
  enroll: (courseId: string) => void;
  updateCourses: (courses: Course[]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// Layout Components
const Navbar = () => {
  const { state, logout } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-indigo-700 transition-colors">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">EduStream <span className="text-indigo-600">Pro</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/courses" className="text-slate-600 hover:text-indigo-600 transition-colors">Browse Courses</Link>
          {state.user?.role === UserRole.STUDENT && (
            <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 transition-colors">My Learning</Link>
          )}
          {state.user?.role === UserRole.ADMIN && (
            <Link to="/admin" className="text-slate-600 hover:text-indigo-600 transition-colors">Admin Console</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {state.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src={state.user.avatar} alt="User" className="w-8 h-8 rounded-full border border-slate-200" />
                <span className="hidden sm:inline font-medium text-sm">{state.user.name}</span>
              </div>
              <button 
                onClick={() => { logout(); navigate('/'); }} 
                className="text-slate-500 hover:text-red-500 px-3 py-1 text-sm border border-slate-200 rounded-md hover:border-red-200 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-4 py-2">Log In</Link>
              <Link to="/signup" className="text-sm font-medium bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-all shadow-md">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Pages
import LandingPage from './pages/LandingPage';
import CourseListingPage from './pages/CourseListingPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import LessonViewPage from './pages/LessonViewPage';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const [state, setState] = useState<AppState>({
    user: null,
    courses: MOCK_COURSES,
    isLoading: false
  });

  const login = (role: UserRole) => {
    setState(prev => ({ ...prev, user: role === UserRole.ADMIN ? MOCK_ADMIN : MOCK_STUDENT }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null }));
  };

  const enroll = (courseId: string) => {
    if (!state.user) return;
    const updatedUser = { 
      ...state.user, 
      enrolledCourseIds: [...new Set([...state.user.enrolledCourseIds, courseId])] 
    };
    setState(prev => ({ ...prev, user: updatedUser }));
  };

  const updateCourses = (newCourses: Course[]) => {
    setState(prev => ({ ...prev, courses: newCourses }));
  };

  return (
    <AppContext.Provider value={{ state, login, logout, enroll, updateCourses }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col pt-16">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/courses" element={<CourseListingPage />} />
              <Route path="/course/:id" element={<CourseDetailPage />} />
              <Route path="/login" element={!state.user ? <LoginPage /> : <Navigate to="/" />} />
              <Route path="/signup" element={!state.user ? <SignupPage /> : <Navigate to="/" />} />

              {/* Protected Student Routes */}
              <Route 
                path="/dashboard" 
                element={state.user?.role === UserRole.STUDENT ? <StudentDashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/lesson/:courseId/:lessonId" 
                element={state.user ? <LessonViewPage /> : <Navigate to="/login" />} 
              />

              {/* Protected Admin Routes */}
              <Route 
                path="/admin/*" 
                element={state.user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} 
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <span className="font-bold text-xl text-white">EduStream <span className="text-indigo-400">Pro</span></span>
                </div>
                <p className="text-sm leading-relaxed">
                  The world's most advanced learning platform. Empowering students and teachers everywhere.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/courses" className="hover:text-indigo-400 transition-colors">Courses</Link></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                <p className="text-xs mb-4">Get the latest course updates and educational insights.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full focus:ring-1 focus:ring-indigo-500" />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <p>&copy; 2024 EduStream Pro. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
