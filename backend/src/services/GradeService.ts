import { Grade } from '../types';
import { store } from '../store';

export class GradeService {
  async createGrade(
    grade: string,
    feedback: string,
    teacherId: string,
    assignmentId: string
  ): Promise<Grade> {
    return store.createGrade(grade, feedback, teacherId, assignmentId);
  }

  async findByStudentId(studentId: string): Promise<Grade[]> {
    return store.findGradesByStudentId(studentId);
  }
}