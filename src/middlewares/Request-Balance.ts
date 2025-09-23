import { redisGet, redisSet } from "@/cache"
import { Request, Response, NextFunction } from "express"

// Redis
function RequestBalance (resource: string, limit: number) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const ip = request.headers["x-forwarded-for"] || request.socket.remoteAddress
    const key = `rate-limit-${resource}-${ip}`

    const requestCount = Number((await redisGet(key)) || 0) + 1
    await redisSet(key, requestCount, 30)

    if (requestCount > limit) {
      return response.status(400).json({ error: "rate-limit" })
    }

    next()
  }
}

const cache = new Map()

// Nodejs
function RequestBalandeNodejs (resource: string, limit: number) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const ip = request.headers["x-forwarded-for"] || request.socket.remoteAddress
    const key = `rate-limit-${resource}-${ip}`

    const requestCount = Number((await cache.get(key)) || 0) + 1
    cache.set(key, requestCount)
    setTimeout(() => cache.delete(key), 0.3 * 60 * 1000)

    if (requestCount > limit) {
      return response.status(400).json({ error: "rate-limit" })
    }

    next()
  }
}

export { RequestBalance, RequestBalandeNodejs }