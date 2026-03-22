import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';

export class TaskDelete extends OpenAPIRoute {
  schema = {
    summary: 'Delete Task',
    description: 'Delete Task based on ID parameter',

    request: {
      params: z.object({
        id: z
          .string()
          .regex(/^\d+$/, 'ID must be an integer')
          .transform(Number)
      })
    },

    responses: {
      200: {
        description: 'Task deleted',
        content: {
          'application/json': {
            schema: z.object({
              name: z.string(),
              description: z.string(),
              completed: z.boolean(),
              due_date: z.string().datetime()  // Assuming ISO date-time format
            })
          }
        }
      },

      404: {
        description: 'Task not found',
        content: {
          'application/json': {
            schema: z.object({
              error: z.string()
            }),
            example: {
              error: 'Task not found'
            }
          }
        }
      }
    }
  }

  async handle(c: any) {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid ID' }, 400);
    }
    
    const deletedTask = 
      {
        id: id,
        name: 'Implement taskCreate',
        description: 'Implement taskCreate and test it',
        completed: false,
        due_date: '2026-04-01T12:00:00Z'
      };

    return c.json(deletedTask);
  }
}
