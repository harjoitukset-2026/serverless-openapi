async function readAll() {
}

export async function listTasks() {
  return readAll();
}

export async function getTask(id: number) {
  const tasks = await readAll();
}


