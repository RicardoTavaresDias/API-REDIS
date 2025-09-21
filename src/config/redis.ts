import { createClient } from "redis"

const redisClient = createClient({
  url: "redis://:redis@localhost:6379"
})

redisClient.on("error", (err) => console.error("Redis Client Error", err))
redisClient.on("connect", () => console.log("Redis conectado!"))
redisClient.on("ready", () => console.log("Redis pronto para uso!"))

async function connectRedis() {
  await redisClient.connect()
  console.log("Redis conectado com sucesso!")
}

export { redisClient, connectRedis }