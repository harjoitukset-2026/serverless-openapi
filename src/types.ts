import type { Context } from "hono";

export type Task = {
  id: string
  name: string
  description: string
  completed: boolean
}

export interface Env {
  USERS_NOTIFICATION_CONFIG: KVNamespace;
}

export type AppContext = Context<{ Bindings: Env }>;
export type HandleArgs = [AppContext];