import { env } from 'cloudflare:workers';
// KV namespace on injektoitu työn ympäristöön

async function readAll() {
  try {
    const data = await env.TASKS_KV.get('tasks');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    // If KV isn't found
    return [];
  }
}

async function writeAll(tasks: any[]) {
  //await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

export async function getTask(id: number) {
  const tasks = await readAll();
  return tasks.find((t: { id: number; }) => t.id === id);
}

export async function addTask(task: any) {
  const tasks = await readAll();
  tasks.push(task);
  await env.TASKS_KV.put('tasks', JSON.stringify(tasks));
}

export async function updateTask(id: number, updatedTask: any) {
  const tasks = await readAll();
  const index = tasks.findIndex((t: { id: number; }) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    await env.TASKS_KV.put('tasks', JSON.stringify(tasks));
  }
}

export async function deleteTask(id: number) {
  let tasks = await readAll();
  tasks = tasks.filter((t: { id: number; }) => t.id !== id);
  await env.TASKS_KV.put('tasks', JSON.stringify(tasks));
}
