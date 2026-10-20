import type { Context } from "hono";

export type Task = {
  id: number
  name: string
  description: string
  completed: boolean
  due_date: string
}

export type AppContext = Context<{ Bindings: Env }>;
export type HandleArgs = [AppContext];
