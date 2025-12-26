
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../App';
import { getCourseAssistant } from '../services/geminiService';

const LessonViewPage = () => {
  const { courseId, lessonId } = useParams();
  const { state } = useApp();
  
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const course = state.courses.find(c => c.id === courseId);
  const currentLesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);

  if (!course || !currentLesson) return <div className="p-20 text-center">Lesson not found.</div>;

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsAsking(true);
    const answer = await getCourseAssistant(course.title, aiQuestion);
    setAiAnswer(answer || "Error processing request.");
    setIsAsking(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-900">
      {/* Sidebar - Course Structure */}
      <div className="w-80 border-r border-slate-800 hidden lg:flex flex-col bg-slate-900 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <Link to="/dashboard" className="text-slate-500 text-sm hover:text-white transition-colors mb-4 inline-block">
            <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard
          </Link>
          <h2 className="font-bold text-white line-clamp-2">{course.title}</h2>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {course.modules.map(module => (
            <div key={module.id} className="mb-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">{module.title}</h3>
              <div className="space-y-1">
                {module.lessons.map(lesson => (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${course.id}/${lesson.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${
                      lesson.id === lessonId 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <i className={`fas ${lesson.id === lessonId ? 'fa-play-circle' : 'fa-circle-play text-slate-600'} text-lg`}></i>
                    <span className="text-sm font-medium line-clamp-1">{lesson.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
        {/* Video Player */}
        <div className="aspect-video bg-black w-full relative">
          <video 
            controls 
            src={currentLesson.videoUrl} 
            className="w-full h-full"
            autoPlay
          ></video>
        </div>

        {/* Info & AI Assistant */}
        <div className="max-w-4xl mx-auto w-full p-8">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{currentLesson.title}</h1>
              <p className="text-slate-500">Duration: {currentLesson.duration} • Part of Module</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all">
              <i className="fas fa-download"></i> Resources
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Lesson Notes</h3>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                {currentLesson.content}
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
              </div>
            </div>

            {/* AI Assistant Sidebar */}
            <div>
              <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 sticky top-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                    <i className="fas fa-robot text-sm"></i>
                  </div>
                  <h3 className="font-bold">AI Tutor</h3>
                </div>
                <p className="text-xs text-indigo-100 mb-4">Stuck on something? Ask the AI about this lesson.</p>
                <form onSubmit={handleAiAsk} className="space-y-3">
                  <textarea 
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="E.g. Explain JSX again..."
                    className="w-full bg-indigo-700 border-none rounded-xl p-3 text-xs placeholder-indigo-300 focus:ring-1 focus:ring-white h-20 resize-none"
                  ></textarea>
                  <button 
                    disabled={isAsking}
                    className="w-full py-2.5 bg-white text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-all"
                  >
                    {isAsking ? 'Thinking...' : 'Ask AI Assistant'}
                  </button>
                </form>

                {aiAnswer && (
                  <div className="mt-6 p-4 bg-indigo-700/50 rounded-xl border border-white/10 max-h-60 overflow-y-auto text-xs leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                    <p className="font-bold mb-2">Gemini says:</p>
                    {aiAnswer}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewPage;
