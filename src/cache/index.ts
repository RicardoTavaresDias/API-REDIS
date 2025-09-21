import { redisClient } from "@/config/redis"

async function redisSet <T> (key: string, data: T): Promise<void> {
  // Setando valor
  await redisClient.set(key, JSON.stringify(data), { "EX": 120 })
}

async function redisGet <T> (key: string): Promise<T | null> {
  // Pegando valor
  const usuario = await redisClient.get(key)
  if (!usuario) {
    return null
  }

  console.log("Usuário do Redis:", JSON.parse(usuario))
  return JSON.parse(usuario) as T
}

export { 
  redisGet, 
  redisSet
}