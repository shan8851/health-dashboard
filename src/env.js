import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // ✅ Add these two:
    GITHUB_USERNAME: z.string(),
    GITHUB_TOKEN: z.string(),
  },

  client: {
    // leave blank unless you need client-accessible envs
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    // ✅ Add runtimeEnv keys too:
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
