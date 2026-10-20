import { Task } from "../../types";

async function nextId(env: Env) {
  const previous = parseInt(await env.TASKS_KV.get('lastId') ?? '0');
  const next = previous + 1;
  await env.TASKS_KV.put('lastId', `${next}`);

  return next;
}

async function readAll(env: Env) {
  try {
    const data = await env.TASKS_KV.get('tasks');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    // If KV isn't found
    return [];
  }
}

async function writeAll(env: Env, tasks: Task[]) {
  await env.TASKS_KV.put('tasks', JSON.stringify(tasks));
}

export async function getTask(env: Env, id: number): Promise<Task | undefined> {
  const tasks = await readAll(env);
  return tasks.find((t: { id: number; }) => t.id === id);
}

export async function addTask(env: Env, task: Task) {
  task.id = await nextId(env);
  const tasks = (await readAll(env)).concat(task);
  await writeAll(env, tasks);
  return task.id;
}

export async function updateTask(env: Env, updatedTask: any) {
  const tasks = await readAll(env);
  const index = tasks.findIndex((t: Task) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    await writeAll(env, tasks);
  }
}

export async function deleteTask(env: Env, id: number) {
  let tasks = await readAll(env);
  tasks = tasks.filter((t: Task) => t.id !== id);
  await writeAll(env, tasks);
}
