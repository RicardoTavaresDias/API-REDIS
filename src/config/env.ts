import { z } from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  PASSWORD_REDIS: z.string(),
  PORT_REDIS: z.coerce.number(),
  HOST_REDIS: z.string()
})

const env = envSchema.parse(process.env)

export { env }