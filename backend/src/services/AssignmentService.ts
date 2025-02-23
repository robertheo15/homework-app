import { Assignment, AssignmentWithUser, Subject } from '../types';
import { store } from '../store';
import { UserService } from './UserService';

export class AssignmentService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createAssignment(
    subject: Subject,
    title: string,
    content: string,
    studentId: string
  ): Promise<Assignment> {
    return store.createAssignment(subject, title, content, studentId);
  }

  async findById(id: string): Promise<Assignment | null> {
    return store.findAssignmentById(id) || null;
  }

  async findBySubject(subject?: Subject): Promise<AssignmentWithUser[]> {
    const assignments = await store.findAssignmentsBySubject(subject);
    
    // Map assignments to include user information and grade
    const assignmentsWithUsers = await Promise.all(
      assignments.map(async (assignment) => {
        const student = await this.userService.findById(assignment.studentId);
        const grade = await store.findGradeByAssignmentId(assignment.id);
        
        return {
          ...assignment,
          student: student!,
          grade: grade?.grade || undefined,
          isGraded: !!grade
        };
      })
    );

    return assignmentsWithUsers;
  }

  async gradeAssignment(id: string, grade: number): Promise<Assignment> {
    const assignment = await this.findById(id);
    if (!assignment) {
      throw new Error('Assignment not found');
    }
    
    // Update the assignment with grade and set isGraded to true
    const updatedAssignment = {
      ...assignment,
      grade,
      isGraded: true
    };
    
    return store.updateAssignment(id, updatedAssignment);
  }
}