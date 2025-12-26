
import { Course, User, UserRole } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Full-Stack Web Development Mastery',
    description: 'Learn React, Node.js, and MongoDB from scratch to build scalable apps.',
    longDescription: 'Dive deep into modern web development. This comprehensive course covers frontend engineering with React, backend architecture with Node.js and Express, and database management with MongoDB. You will build real-world projects, including a social media platform and a real-time chat application.',
    price: 99.99,
    thumbnail: 'https://picsum.photos/seed/webdev/800/450',
    instructor: 'Alex Rivera',
    category: 'Development',
    rating: 4.8,
    studentsCount: 1540,
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Modern Web',
        order: 1,
        lessons: [
          { id: 'l1', title: 'Course Overview', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '5:30', content: 'Welcome to the course!', isPreview: true },
          { id: 'l2', title: 'Setting Up Your Environment', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '12:45', content: 'Install VS Code, Node, and more.' }
        ]
      },
      {
        id: 'm2',
        title: 'React Fundamentals',
        order: 2,
        lessons: [
          { id: 'l3', title: 'JSX & Components', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '15:20', content: 'Understanding the building blocks of React.' },
          { id: 'l4', title: 'State & Props', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '18:10', content: 'Managing data flow.' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced UI/UX Design Principles',
    description: 'Master Figma and design user-centric interfaces that convert.',
    longDescription: 'Great software starts with great design. Learn the psychological principles behind user behavior, master the tools of the trade like Figma, and build a high-converting portfolio. We cover accessibility, typography, color theory, and advanced prototyping.',
    price: 79.99,
    thumbnail: 'https://picsum.photos/seed/design/800/450',
    instructor: 'Sarah Jenkins',
    category: 'Design',
    rating: 4.9,
    studentsCount: 890,
    modules: [
      {
        id: 'm3',
        title: 'Design Foundations',
        order: 1,
        lessons: [
          { id: 'l5', title: 'Why Design Matters', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '8:15', content: 'Introduction to UI/UX.', isPreview: true },
          { id: 'l6', title: 'The Design Thinking Process', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '14:30', content: 'Empathize, Define, Ideate.' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Python for Data Science & AI',
    description: 'A complete guide to Pandas, NumPy, and Machine Learning algorithms.',
    longDescription: 'Unlock the power of data. Python is the language of AI. In this course, we master data manipulation with Pandas, numerical computing with NumPy, and predictive modeling with Scikit-Learn. Perfect for career switchers or developers looking to upskill.',
    price: 129.99,
    thumbnail: 'https://picsum.photos/seed/data/800/450',
    instructor: 'Dr. Michael Chen',
    category: 'Data Science',
    rating: 4.7,
    studentsCount: 2100,
    modules: [
      {
        id: 'm4',
        title: 'Python Basics Recap',
        order: 1,
        lessons: [
          { id: 'l7', title: 'Advanced List Comprehensions', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '10:00', content: 'Write cleaner Python code.' }
        ]
      }
    ]
  }
];

export const MOCK_ADMIN: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@edustream.com',
  role: UserRole.ADMIN,
  enrolledCourseIds: [],
  avatar: 'https://i.pravatar.cc/150?u=admin'
};

export const MOCK_STUDENT: User = {
  id: 'student-1',
  name: 'John Doe',
  email: 'john@example.com',
  role: UserRole.STUDENT,
  enrolledCourseIds: ['1'],
  avatar: 'https://i.pravatar.cc/150?u=john'
};
