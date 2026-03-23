import { OpenAPIRoute } from 'chanfana';
import { task } from './base';
import { z } from 'zod';
import { AppContext } from '../../types';

const updateTaskSchema = task.omit({ id: true }); // All fields optional for partial update

export class TaskUpdate extends OpenAPIRoute {
  schema = {
    summary: 'Update Task',
    description: 'Update Task based on ID parameter',

    request: {
      params: z.object({
        id: z
          .string()
          .regex(/^\d+$/, 'ID must be an integer')
          .transform(Number)
      }),
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
      200: {
        description: 'Task Updated',
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

  async handle(c: AppContext) {
    const id = parseInt(c.req.param('id')!);
    if (isNaN(id)) {
      return c.json({ error: 'Invalid ID' }, 400);
    }

    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }

    const parsed = updateTaskSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.format() }, 400);
    }
    const updatedTask = {
      id,
      ...parsed.data
    }    

    return c.json(updatedTask);  // Return the updated task object
  }
}