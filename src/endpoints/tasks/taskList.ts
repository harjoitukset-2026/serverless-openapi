import { OpenAPIRoute } from 'chanfana';
import { z } from "zod";
import { AppContext } from '../../types';

export class TaskList extends OpenAPIRoute {
  schema = {
    summary: 'Get all tasks',
    responses: {
      200: {
        description: 'List of tasks',
        content: {
          'application/json': {
            schema: z.array(z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
              completed: z.boolean(),
              due_date: z.string().datetime()
            })),
            example: [
              {
                id: 1,
                name: 'Implement taskCreate',
                description: 'Implement taskCreate and test it',
                completed: false,
                due_date: '2026-04-01T12:00:00Z'
              },
              {
                id: 2,
                name: 'Review code',
                description: 'Review the updated code',
                completed: true,
                due_date: '2026-04-02T12:00:00Z'
              }
            ]
          }
        }
      }
    }
  };

  async handle(c: AppContext) {
    // Mock list of tasks (replace with real data fetching logic)
    const tasks = [
      {
        id: 1,
        name: 'Implement taskCreate',
        description: 'Implement taskCreate and test it',
        completed: false,
        due_date: '2026-04-01T12:00:00Z'
      },
      {
        id: 2,
        name: 'Review code',
        description: 'Review the updated code',
        completed: true,
        due_date: '2026-04-02T12:00:00Z'
      }
    ];

    return c.json({
      success: true,
      result: tasks
    });
  }
}
