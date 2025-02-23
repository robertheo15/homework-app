export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  createdAt?: string;
  updatedAt?: string;
}

export interface Assignment {
  id: string;
  subject: Subject;
  title: string;
  content: string;
  studentId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Grade {
  id: string;
  grade: string;
  feedback: string;
  teacherId: string;
  assignmentId: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Subject = 'English' | 'Math'; 