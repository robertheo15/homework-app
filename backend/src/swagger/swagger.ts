import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'School Management API',
    version: '1.0.0',
    description: 'API documentation for School Management System',
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string', enum: ['student', 'teacher'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Assignment: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          subject: { type: 'string', enum: ['English', 'Math'] },
          title: { type: 'string' },
          content: { type: 'string' },
          studentId: { type: 'string' },
          grade: { type: 'string', nullable: true },
          isGraded: { type: 'boolean' },
          student: { $ref: '#/components/schemas/User' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Grade: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          grade: { type: 'string' },
          feedback: { type: 'string' },
          teacherId: { type: 'string' },
          assignmentId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
    securitySchemes: {
      userId: {
        type: 'apiKey',
        in: 'header',
        name: 'user-id',
        description: 'User ID for authentication',
      },
    },
  },
  paths: {
    '/api/users': {
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'role'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  role: { type: 'string', enum: ['student', 'teacher'] },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          400: { description: 'Bad request' },
          500: { description: 'Internal server error' },
        },
      },
    },
    '/api/assignments': {
      post: {
        tags: ['Assignments'],
        summary: 'Create a new assignment',
        security: [{ userId: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['subject', 'title', 'content', 'studentId'],
                properties: {
                  subject: { type: 'string', enum: ['English', 'Math'] },
                  title: { type: 'string' },
                  content: { type: 'string' },
                  studentId: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Assignment created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Assignment' },
              },
            },
          },
          400: { description: 'Bad request' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          500: { description: 'Internal server error' },
        },
      },
      get: {
        tags: ['Assignments'],
        summary: 'Get all assignments',
        security: [{ userId: [] }],
        parameters: [
          {
            in: 'query',
            name: 'subject',
            schema: {
              type: 'string',
              enum: ['English', 'Math'],
            },
            required: false,
            description: 'Filter assignments by subject',
          },
        ],
        responses: {
          200: {
            description: 'List of assignments',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Assignment' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          500: { description: 'Internal server error' },
        },
      },
    },
    '/api/grades': {
      post: {
        tags: ['Grades'],
        summary: 'Create a new grade',
        security: [{ userId: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['grade', 'feedback', 'teacherId', 'assignmentId'],
                properties: {
                  grade: { type: 'string' },
                  feedback: { type: 'string' },
                  teacherId: { type: 'string' },
                  assignmentId: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Grade created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Grade' },
              },
            },
          },
          400: { description: 'Bad request' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          500: { description: 'Internal server error' },
        },
      },
    },
    '/api/grades/{studentId}': {
      get: {
        tags: ['Grades'],
        summary: 'Get grades by student ID',
        security: [{ userId: [] }],
        parameters: [
          {
            in: 'path',
            name: 'studentId',
            required: true,
            schema: { type: 'string' },
            description: 'ID of the student',
          },
        ],
        responses: {
          200: {
            description: 'List of grades',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Grade' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          500: { description: 'Internal server error' },
        },
      },
    },
  },
}; 