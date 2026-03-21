import { TaskModel } from "./base";
import { task } from "./base";
import { z } from "zod";

// Mock in-memory storage for now - replace with real DB/KV
const tasks: z.infer<typeof task>[] = [];

export async function taskList(c) {
    return c.json({
        success: true,
        data: tasks,
    }, 200);
}

export async function readAll() {
  const result = z.array(task).safeParse(tasks);
  if (!result.success) throw new Error("Invalid tasks data");
  return result.data;
}