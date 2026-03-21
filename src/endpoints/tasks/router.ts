import { Hono } from "hono";
import { fromHono } from "chanfana";
import { taskList } from "./taskList";
import { taskCreate } from "./taskCreate";
import { taskRead } from "./taskRead";
import { taskUpdate } from "./taskUpdate";
import { taskDelete } from "./taskDelete";

export const tasksRouter = fromHono(new Hono());

tasksRouter.get("/", taskList);
tasksRouter.post("/", taskCreate);
tasksRouter.get("/:id", taskRead);
tasksRouter.put("/:id", taskUpdate);
tasksRouter.delete("/:id", taskDelete);
