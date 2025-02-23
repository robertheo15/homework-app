import { Request, Response } from 'express';
import { AssignmentService } from '../services/AssignmentService';
import { UserService } from '../services/UserService';
import { Subject } from '../entities/enums';

export class AssignmentController {
  private assignmentService: AssignmentService;
  private userService: UserService;

  constructor() {
    this.assignmentService = new AssignmentService();
    this.userService = new UserService();
  }

  async createAssignment(req: Request, res: Response): Promise<void> {
    try {
      const { subject, title, content, studentId } = req.body;

      if (!subject || !title || !content || !studentId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const student = await this.userService.findById(studentId);
      if (!student) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }

      if (student.role !== 'student') {
        res.status(403).json({ error: 'Only students can submit assignments' });
        return;
      }

      const assignment = await this.assignmentService.createAssignment(
        subject as Subject,
        title,
        content,
        student.id
      );

      res.status(201).json(assignment);
    } catch (error) {
      console.error('Error creating assignment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAssignments(req: Request, res: Response): Promise<void> {
    try {
      const subject = req.query.subject as Subject | undefined;
      const assignments = await this.assignmentService.findBySubject(subject);
      res.json(assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}