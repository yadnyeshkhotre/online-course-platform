
export enum UserRole {
  GUEST = 'guest',
  STUDENT = 'student',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enrolledCourseIds: string[];
  avatar?: string;
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  content: string;
  isPreview?: boolean;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  thumbnail: string;
  instructor: string;
  category: string;
  rating: number;
  studentsCount: number;
  modules: Module[];
}

export interface AppState {
  user: User | null;
  courses: Course[];
  isLoading: boolean;
}
