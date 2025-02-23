import React from 'react';
import { Assignment } from '../types';
import { AssignmentGradeCard } from './AssignmentGradeCard';

interface TeacherDashboardProps {
  assignments: Assignment[];
  onGradeSubmit: (assignmentId: string, grade: number, feedback: string) => Promise<void>;
}

export function TeacherDashboard({ assignments, onGradeSubmit }: TeacherDashboardProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">
        Assignments to Grade
      </h2>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <AssignmentGradeCard 
            key={assignment.id} 
            assignment={assignment}
            onGradeSubmit={(grade, feedback) => onGradeSubmit(assignment.id, grade, feedback)}
          />
        ))}
      </div>
    </div>
  );
} 