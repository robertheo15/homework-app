import React, { useState } from 'react';
import { Assignment, Grade, Subject } from '../types';

interface StudentDashboardProps {
  grades: Grade[];
  assignments: Assignment[];
  onSubmitAssignment: (subject: Subject, title: string, content: string) => Promise<void>;
}

export function StudentDashboard({ grades, assignments, onSubmitAssignment }: StudentDashboardProps) {
  const [subject, setSubject] = useState<Subject>('English');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitAssignment(subject, title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">
        Submit New Assignment
      </h2>
      <form onSubmit={handleSubmit}>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="English">English</option>
          <option value="Math">Math</option>
        </select>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button type="submit" className="mt-4 w-full">
          Submit Assignment
        </button>
      </form>
      <h2 className="text-lg font-medium text-gray-900 mt-8">
        My Grades
      </h2>
      <div className="space-y-4">
        {grades.map((grade) => (
          <div
            key={grade.id}
            className="border rounded-lg p-4"
          >
            <h3 className="text-lg font-medium">
              {assignments.find(a => a.id === grade.assignmentId)?.title || `Assignment ${grade.assignmentId}`}
            </h3>
            <p className="text-sm text-gray-500">
              Grade: {grade.grade}
            </p>
            <p className="mt-2">{grade.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 