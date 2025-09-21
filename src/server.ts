import { app } from "./app";
import { env } from "./config/env";
import { connectRedis } from "./config/redis";

app.listen(env.PORT, () => {
  connectRedis()
  console.log(`Server in running port ${env.PORT}`) 
})