import { useState } from 'react';
import { Assignment, Grade, User } from '@/types';
import { Button } from './ui/button';

interface AssignmentGradeCardProps {
  assignment: Assignment & {
    student?: User;
    grade?: Grade;
  };
  onGradeSubmit: (grade: string, feedback: string) => Promise<void>;
}

export function AssignmentGradeCard({ assignment, onGradeSubmit }: AssignmentGradeCardProps) {
  const [formState, setFormState] = useState({
    grade: assignment.grade?.grade || '',
    feedback: assignment.grade?.feedback || '',
    isSubmitting: false
  });

  const handleSubmit = async () => {
    const { grade, feedback } = formState;
    
    if (!grade || !feedback) {
      alert('Please provide both grade and feedback');
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));
    try {
      await onGradeSubmit(grade, feedback);
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    } catch (error) {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{assignment.title}</h3>
        <div className="text-sm text-gray-500">
          <p>Subject: {assignment.subject}</p>
          <p>Student: {assignment.student?.name} ({assignment.student?.email})</p>
        </div>
        <p className="mt-2 text-gray-700">{assignment.content}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <input
            type="text"
            placeholder="Enter grade"
            value={formState.grade}
            onChange={(e) => setFormState(prev => ({ ...prev, grade: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Feedback
          </label>
          <textarea
            placeholder="Enter feedback"
            value={formState.feedback}
            onChange={(e) => setFormState(prev => ({ ...prev, feedback: e.target.value }))}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={formState.isSubmitting}
          className="w-full"
        >
          {formState.isSubmitting ? 'Submitting...' : (assignment.grade ? 'Update Grade' : 'Submit Grade')}
        </Button>

        {assignment.grade && (
          <p className="text-sm text-gray-500 italic">
            Last graded on: {new Date(assignment.grade.createdAt!).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
} 