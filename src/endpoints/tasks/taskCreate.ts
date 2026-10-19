import { OpenAPIRoute } from 'chanfana';
import { z } from "zod";
import { AppContext } from '../../types';
import { addTask } from './storage';

export class TaskCreate extends OpenAPIRoute {
  schema = {
    summary: 'Create Task',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              name: z.string(),
              description: z.string(),
              completed: z.boolean(),
              due_date: z.string().datetime()  // Assuming ISO date-time format
            }),
            example: {
              name: 'Create schema JSON file',
              description: 'Implement schema JSON file and test it',
              completed: false,
              due_date: '2026-04-01T12:00:00Z'
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Task created',
        content: {
          'application/json': {
            schema: z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
              completed: z.boolean(),
              due_date: z.string().datetime()
            }),
            example: {
              id: 123,
              name: 'Implement taskCreate',
              description: 'Implement taskCreate and test it',
              completed: false,
              due_date: '2026-04-03T12:00:00Z'
            }
          }
        }
      },
      400: {
        description: 'Bad Request'
      }
    }
  }

  async handle(c: AppContext) {
    // Safety check for request context  
    if (!c.req) {
      return c.json({
        success: false,
        errors: [{ code: 7000, message: 'Invalid request context' }]
      }, 400);
    }

    let body;
    try {
      body = await c.req.json();

    } catch (error) {
      return c.json({
        success: false,
        errors: [{ code: 7002, message: 'Invalid JSON in request body' }]
      }, 400);
    }

    // Minimal required validation (can be moved to schema middleware)
    for (const key of ['name', 'description', 'completed', 'due_date']) {
      if (body[key] === undefined) {
        return c.json({
          success: false,
          errors: [{ code: 7001, message: `Missing ${key}`, path: ['body', key] }]
        }, 400);
      }
    }

    /*
    const createdTask = {
      id: 123, // Or real persistence ID
      name: body.name,
      description: body.description,
      completed: body.completed,
      due_date: body.due_date
    };*/
    await addTask(c.env, body);

    return c.json({
      success: true,
      result: body
    }, 201);
  }
}
