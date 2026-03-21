import { TaskModel } from "./base";

export class TaskUpdate {
	_meta = {
		model: TaskModel,
		fields: TaskModel.schema.pick({
			name: true,
			description: true,
			completed: true,
			due_date: true,
		}),
	};
}

export async function taskUpdate(c) {
	//const c = new JSON();
	
	return c.json({
		success: true,
	}, 201);
}