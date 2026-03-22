import { z } from "zod";


export const task = z.object({
	id: z.number().int(),
	name: z.string().min(1).openapi({ example: "Task do it" }),
	description: z.string().openapi({ example: "Task do it" }),
	completed: z.boolean(),
	due_date: z.string().datetime()
});

export class Task {
    _meta = {
        model: TaskModel,
        fields: TaskModel.schema.pick({
            // this is purposely missing the id, because users shouldn't be able to define it
            name: true,
            description: true,
            completed: true,
            due_date: true,
        }),
    };
}

export const TaskModel = {
	tableName: "tasks",
	primaryKeys: ["id"],
	schema: task,
	serializer: (obj: Record<string, string | number | boolean>) => {
		return {
			...obj,
			completed: Boolean(obj.completed),
		};
	},
	serializerObject: task,
};

export const createTask = task.omit({ id: true }).openapi({
  example: {
    name: "Write example",
    description: "Implement taskCreate and test it",
    completed: false,
    due_date: "2026-04-01T12:00:00Z"
  }
});
