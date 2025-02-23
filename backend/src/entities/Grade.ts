import { User } from '../types';

export interface Grade {
  id: string;
  grade: string;
  feedback: string;
  teacherId: string;
  assignmentId: string;
  createdAt: Date;
  updatedAt: Date;
}