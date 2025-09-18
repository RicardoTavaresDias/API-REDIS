import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function seed () {
  await prisma.user.createMany({
    data: Array.from({ length: 100000 }, () => {
      return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number()
      }
    }),
    skipDuplicates: true,
  })

  console.log("Concluído!")
}

seed()
.catch((error) => console.log(error))
.finally(async () => { 
  await prisma.$disconnect()
})