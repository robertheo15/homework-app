import React from 'react';
import { Button } from './ui/button';
import { GraduationCap } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { createUser, setUserId } from '../lib/api';

export function Login() {
  const { users, login, deleteUser } = useAuthStore();

  const handleLogin = async (role: 'student' | 'teacher') => {
    if (users[role]) {
      login(users[role]!);
      setUserId(users[role]!.id);
      return;
    }

    const mockUser = await createUser({
      name: role === 'teacher' ? 'Teacher' : 'Student',
      email: `${role}@example.com`,
      role,
    });
    
    login(mockUser);
    setUserId(mockUser.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-center mb-8">
              <GraduationCap className="h-12 w-12 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 ml-3">
                Teacher Grading Platform
              </h1>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  onClick={() => handleLogin('teacher')}
                  disabled={false}
                >
                  {users.teacher ? 'Login as Existing Teacher' : 'Create & Login as Teacher'}
                </Button>
                {users.teacher && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => deleteUser('teacher')}
                  >
                    Delete Teacher Account
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleLogin('student')}
                >
                  {users.student ? 'Login as Existing Student' : 'Create & Login as Student'}
                </Button>
                {users.student && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => deleteUser('student')}
                  >
                    Delete Student Account
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 