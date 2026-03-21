import { task } from "./base";
import { z } from "zod";

const tasks: z.infer<typeof task>[] = [];

const createTaskSchema = task.omit({ id: true });
type CreateTaskBody = z.infer<typeof createTaskSchema>; // static typed attributes

export async function taskCreate(c) {
  let body: CreateTaskBody;

  try {
    body = (await c.req.json()) as CreateTaskBody;
  } catch {
    return c.json({ success: false, error: "Invalid or missing JSON body" }, 400);
  }

  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.format() }, 400);
  }

  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask = { id: nextId, ...parsed.data };
  tasks.push(newTask);

  return c.json({ success: true, result: newTask }, 201);
}
