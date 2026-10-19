/// <reference types="@cloudflare/vitest-pool-workers/types" />
import "cloudflare:test";
import { Env } from "hono";

declare module "cloudflare:test" {
	interface ProvidedEnv extends Env { }
}
