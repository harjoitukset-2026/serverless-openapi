import { TaskModel } from "./base";

export class TaskList {
	_meta = {
		model: TaskModel,
	};

	searchFields = ["name", "slug", "description"];
	defaultOrderBy = "id DESC";
}
