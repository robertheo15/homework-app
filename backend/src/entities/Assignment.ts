import { Subject } from "./enums";
import { User } from "./User";
export interface Assignment {
  id: string;
  subject: Subject;
  title: string;
  content: string;
  student: User;
  grade?: number;
  isGraded: boolean;
  createdAt: Date;
  updatedAt: Date;
}