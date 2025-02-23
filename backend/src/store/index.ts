import crypto from 'crypto';
import { Assignment } from '../entities/Assignment';
import { User } from '../entities/User';
import { Grade } from '../entities/Grade';
import { Role, Subject } from '../entities/enums';


export class Store {
  private users: User[] = [];
  private assignments: Assignment[] = [];
  private grades: Grade[] = [];

  // Helper to generate UUID
  private generateId(): string {
    return crypto.randomUUID();
  }

  // User methods
  createUser(name: string, email: string, role: Role): User {
    const user: User = {
      id: this.generateId(),
      name,
      email,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  // Assignment methods
  createAssignment(subject: Subject, title: string, content: string, studentId: string): Assignment {
    const assignment: Assignment = {
      id: this.generateId(),
      subject,
      title,
      content,
      studentId,
      isGraded: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.assignments.push(assignment);
    return assignment;
  }

  findAssignmentById(id: string): Assignment | undefined {
    return this.assignments.find(assignment => assignment.id === id);
  }

  findAssignmentsBySubject(subject?: Subject): Assignment[] {
    if (!subject) return this.assignments;
    return this.assignments.filter(assignment => assignment.subject === subject);
  }

  // Grade methods
  createGrade(grade: string, feedback: string, teacherId: string, assignmentId: string): Grade {
    const newGrade: Grade = {
      id: this.generateId(),
      grade,
      feedback,
      teacherId,
      assignmentId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.grades.push(newGrade);
    return newGrade;
  }

  findGradesByStudentId(studentId: string): Grade[] {
    const studentAssignments = this.assignments.filter(a => a.studentId === studentId);
    return this.grades.filter(g => 
      studentAssignments.some(a => a.id === g.assignmentId)
    );
  }

  updateAssignment(id: string, assignment: Assignment): Promise<Assignment> {
    const index = this.assignments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.assignments[index] = { ...this.assignments[index], ...assignment, updatedAt: new Date() };
      return Promise.resolve(this.assignments[index]);
    }
    return Promise.reject(new Error('Assignment not found'));
  }

  findGradeByAssignmentId(assignmentId: string): Grade | undefined {
    return this.grades.find(grade => grade.assignmentId === assignmentId);
  }
}

export const store = new Store(); 