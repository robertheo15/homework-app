import express from 'express';
import { UserController } from '../controllers/UserController';
import { AssignmentController } from '../controllers/AssignmentController';
import { GradeController } from '../controllers/GradeController';
import { store } from '../store';
import { User } from '../entities/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  } 
}

const router = express.Router();

const userController = new UserController();
const assignmentController = new AssignmentController();
const gradeController = new GradeController();

const authorize = (roles: string[]) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = req.headers['user-id'] as string;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = store.findUserById(userId);

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.post('/users', (req, res) => userController.createUser(req, res));

router.post('/assignments', authorize(['student']), (req, res) =>
  assignmentController.createAssignment(req, res)
);

router.get('/assignments', authorize(['teacher']), (req, res) =>
  assignmentController.getAssignments(req, res)
);

router.post('/grades', authorize(['teacher']), (req, res) =>
  gradeController.createGrade(req, res)
);

router.get('/grades/:studentId', authorize(['student']), (req, res) =>
  gradeController.getGrades(req, res)
);

export default router; 