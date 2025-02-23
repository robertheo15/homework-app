import { Assignment, Grade, User } from '@/types';
import axios from 'axios';
// import { Assignment, Grade, Subject, User } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setUserId = (userId: string) => {
  api.defaults.headers.common['user-id'] = userId;
};

export const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const response = await api.post<User>('/api/users', data);
  return response.data;
};

export const submitAssignment = async (data: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) => {
  const response = await api.post<Assignment>('/api/assignments', data);
  return response.data;
};

export const getAssignments = async () => {
  const response = await api.get<(Assignment & {
    student?: User;
    grade?: Grade;
  })[]>('/api/assignments');
  return response.data;
};

export const submitGrade = async (data: Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>) => {
  const response = await api.post<Grade>('/api/grades', data);
  return response.data;
};

export const getGrades = async (studentId: string) => {
  const response = await api.get<Grade[]>(`/api/grades/${studentId}`);
  return response.data;
};