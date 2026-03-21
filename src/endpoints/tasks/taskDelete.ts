import { TaskModel } from "./base";

export async function taskDelete(c) {
	//const c = new JSON();
	
	return c.json({
		success: true,
	}, 201);
}
