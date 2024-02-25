const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function seedDatabase() {
  try {
    await prisma.event.deleteMany();
    await prisma.participantsOnEvents.deleteMany();
    await prisma.user.deleteMany();
    console.log("Dados antigos removidos com sucesso.");

    const users = [
      {
        name: "João Victor Fausto Souza",
        email: "joao@gmail.com",
        password: "123asdF",
      },
      {
        name: "Baianor",
        email: "baianor@gmail.com",
        password: "123asdF",
      },
      {
        name: "Vitinho Da Silva",
        email: "vitinho@gmail.com",
        password: "123asdF",
      },
    ];

    for (const user of users) {
      await prisma.user.create({
        data: user,
      });
    }
    console.log("3 Usuários de exemplo adicionados com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar dados de exemplo:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
