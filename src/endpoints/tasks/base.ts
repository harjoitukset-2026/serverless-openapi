import { z } from "zod";


export const task = z.object({
	id: z.number().int(),
	name: z.string().min(1).openapi({ example: "Task do it" }),
	description: z.string().openapi({ example: "Task do it" }),
	completed: z.boolean(),
	due_date: z.string().datetime()
});

export interface Env {
  TASKS_KV: KVNamespace;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    try {
      await env.TASKS_KV.put("user_2", "disabled");
      const value = await env.TASKS_KV.get("user_2");
      if (value === null) {
        return new Response("Value not found", { status: 404 });
      }
      return new Response(value);
    } catch (err) {
      console.error(`KV returned error:`, err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unknown error occurred when accessing KV storage";
      return new Response(errorMessage, {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
} satisfies ExportedHandler<Env>;

export const createTask = task.omit({ id: true }).openapi({
  example: {
    name: "Write example",
    description: "Implement taskCreate and test it",
    completed: false,
    due_date: "2026-04-01T12:00:00Z"
  }
});
