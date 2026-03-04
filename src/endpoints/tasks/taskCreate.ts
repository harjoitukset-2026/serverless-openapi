import { TaskModel } from "./base";

export class TaskCreate {
	_meta = {
		model: TaskModel,
		fields: TaskModel.schema.pick({
			// this is purposely missing the id, because users shouldn't be able to define it
			name: true,
			slug: true,
			description: true,
			completed: true,
			due_date: true,
		}),
	};
}
