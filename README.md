### Docker PostgreSQL e Redis:

docker-compose.yml

````ts
services:
  postgres:
    image: bitnami/postgresql:latest
    container_name: api-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    volumes:
      - postgres_data:/bitnami/postgresql

  redis:
    image: redis:latest
    container_name: api-redis
    ports:
      - "6379:6379"
    environment:
      REDIS_PASSWORD: "minha_senha_segura" 
    command: ["redis-server", "--requirepass", "minha_senha_segura"]
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
````

🔹Rodando o Redis

````
docker-compose up -d
````

🔹Testando no redis-cli

````
docker exec -it api-redis redis-cli
````

---


### 1️⃣ Instalar dependências

redis → cliente oficial para Redis.

````
npm install redis
````

pg → cliente para PostgreSQL.

````
npm install pg
````
----

### 2️⃣ Conexão com Redis

config/redis.ts

````ts
// redisClient.ts
import { createClient } from "redis"

const redisClient = createClient({
  url: "redis://:password@localhost:6379"
})

redisClient.on("error", (err) => console.error("Redis Client Error", err))
redisClient.on("connect", () => console.log("Redis conectado!"))
redisClient.on("ready", () => console.log("Redis pronto para uso!"))

async function connectRedis() {
  await redisClient.connect()
}

export { redisClient, connectRedis }
````

Nota: o formato da URL é redis://:SENHA@HOST:PORT.

----

### 3️⃣ Exemplo de uso do Redis

server.ts

````ts
app.listen(env.PORT, () => {
  connectRedis()
  console.log(`Server in running port ${env.PORT}`) 
})
````

cache/index.ts

````ts
import { redisClient } from "@/config/redis"

connectRedis()

async function redisSet("chave", "valor") {
  // Setando valor
  await redisClient.set("chave", JSON.stringify("valor"), { "EX": 500 })
}

async function redisGet("chave") {
  // Pegando valor
  const response = await redisClient.get("chave")
  if (!response) {
    return null
  }

  console.log("Usuário do Redis:", JSON.parse(response))
  return JSON.parse(response)
}

export { 
  redisGet, 
  redisSet
}
````

----

### 4️⃣ Conexão com PostgreSQL (opcional, para comparação)

````ts
// pgClient.ts
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres_user",
  host: "localhost",
  database: "my_database",
  password: "postgres_pass",
  port: 5432
});

export default pool;
````

Exemplo de query

````ts
import pool from "./pgClient";

async function getUsers() {
  const res = await pool.query("SELECT * FROM users");
  console.log(res.rows);
}

getUsers();
````

----
<br>

✅ Com isso você consegue usar Redis como cache ou armazenamento rápido, e PostgreSQL como banco relacional tradicional, tudo em Node.js.
