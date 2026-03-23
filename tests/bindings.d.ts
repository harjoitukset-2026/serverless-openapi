/// <reference types="@cloudflare/vitest-pool-workers/types" />
import "cloudflare:test";

declare module "cloudflare:test" {
	interface ProvidedEnv extends Env { }
}
