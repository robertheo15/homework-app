import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/auth-store';
import { Button } from './components/ui/button';
import { GraduationCap } from 'lucide-react';
import { Assignment, Grade, Subject } from './types';
import { getAssignments, getGrades, submitAssignment, submitGrade } from './lib/api';
import { Login } from './components/Login';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';

function App() {
  const { currentUser, logout } = useAuthStore();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        if (currentUser.role === 'teacher') {
          const data = await getAssignments();
          setAssignments(data);
        } else {
          const data = await getGrades(currentUser.id);
          setGrades(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  if (!currentUser) {
    return <Login />;
  }

  const handleSubmitAssignment = async (subject: Subject, title: string, content: string) => {
    if (!currentUser) return;

    try {
      await submitAssignment({
        subject,
        title,
        content,
        studentId: currentUser.id,
      });
      alert('Assignment submitted successfully!');
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert('Failed to submit assignment');
    }
  };

  const handleGradeSubmit = async (assignmentId: string, grade: number, feedback: string) => {
    if (!currentUser) return;

    try {
      await submitGrade({
        grade,
        feedback,
        teacherId: currentUser.id,
        assignmentId,
      });
      const updatedAssignments = await getAssignments();
      setAssignments(updatedAssignments);
      alert('Grade submitted successfully!');
    } catch (error) {
      console.error('Error submitting grade:', error);
      alert('Failed to submit grade');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900 ml-3">
                Teacher Grading Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, {currentUser.name}
              </span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="py-6">
          <div className="bg-white rounded-lg shadow p-6">
            {currentUser.role === 'student' ? (
              <StudentDashboard
                grades={grades}
                assignments={assignments}
                onSubmitAssignment={handleSubmitAssignment}
              />
            ) : (
              <TeacherDashboard
                assignments={assignments}
                onGradeSubmit={handleGradeSubmit}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;