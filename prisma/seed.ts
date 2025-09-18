import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker"
import { length, optional } from "zod";

const prisma = new PrismaClient()

async function seed () {

  for (let i = 0; i < 100000; i++) {
    const result = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: `${faker.internet.username() + i}@email.com`,
        phone: faker.phone.number()
      }
    })

    const cout = Math.floor(Math.random() * 10)

    for (let j = 0; j < cout; j++) {
      await prisma.product.create({
        data: {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price({ min: 10, max: 5000, symbol: 'R$ ' }),
          fkUser: result.id
        }
      })
    }
  }

  console.log("Concluído!")
}

seed()
.catch((error) => console.log(error))
.finally(async () => { 
  await prisma.$disconnect()
})