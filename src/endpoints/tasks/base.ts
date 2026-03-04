import { z } from "zod";

export const task = z.object({
	id: z.number().int(),
	name: z.string().min(1).openapi({ example: "Task doit" }),
	slug: z.string().openapi({ example: "123" }),
	description: z.string().openapi({ example: "Task doit" }),
	completed: z.boolean(),
	due_date: z.string().datetime(),
});

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
