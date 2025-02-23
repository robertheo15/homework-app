import { Request, Response } from 'express';
import { GradeService } from '../services/GradeService';
import { UserService } from '../services/UserService';
import { AssignmentService } from '../services/AssignmentService';

export class GradeController {
  private gradeService: GradeService;
  private userService: UserService;
  private assignmentService: AssignmentService;

  constructor() {
    this.gradeService = new GradeService();
    this.userService = new UserService();
    this.assignmentService = new AssignmentService();
  }

  async createGrade(req: Request, res: Response): Promise<void> {
    try {
      const { grade, feedback, teacherId, assignmentId } = req.body;

      if (!grade || !feedback || !teacherId || !assignmentId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const teacher = await this.userService.findById(teacherId);
      if (!teacher) {
        res.status(404).json({ error: 'Teacher not found' });
        return;
      }

      if (teacher.role !== 'teacher') {
        res.status(403).json({ error: 'Only teachers can grade assignments' });
        return;
      }

      const assignment = await this.assignmentService.findById(assignmentId);
      if (!assignment) {
        res.status(404).json({ error: 'Assignment not found' });
        return;
      }

      const newGrade = await this.gradeService.createGrade(
        grade,
        feedback,
        teacher.id,
        assignment.id
      );

      res.status(201).json(newGrade);
    } catch (error) {
      console.error('Error creating grade:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getGrades(req: Request, res: Response): Promise<void> {
    try {
      const { studentId } = req.params;
      const grades = await this.gradeService.findByStudentId(studentId);
      res.json(grades);
    } catch (error) {
      console.error('Error fetching grades:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}