import { OpenAPIRoute } from 'chanfana';
import { z } from "zod";

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

  async handle(c: any) {
    // Safety check for request context  
    if (!c.req) {
      return c.status(400).json({
        success: false,
        errors: [{ code: 7000, message: 'Invalid request context' }]
      });
    }

    let body;
    try {
      body = await c.req.json();

    } catch (error) {
      return c.status(400).json({
        success: false,
        errors: [{ code: 7002, message: 'Invalid JSON in request body' }]
      });
    }

    // Minimal required validation (can be moved to schema middleware)
    for (const key of ['name', 'description', 'completed', 'due_date']) {
      if (body[key] === undefined) {
        return c.json({
          success: false,
          errors: [{ code: 7001, message: `Missing ${key}`, path: ['body', key] }]
        });
      }
    }

    const createdTask = {
      id: 123, // Or real persistence ID
      name: body.name,
      description: body.description,
      completed: body.completed,
      due_date: body.due_date
    };

    return c.json({
      success: true,
      result: createdTask
    });
  }
}
