const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function seedDatabase() {
  try {
    const events = [
      {
        start: new Date(),
        title: "Reunião de Projeto",
        allDay: false,
        description: "Discussão sobre os próximos passos do projeto",
        userId: 1,
        end: new Date(new Date().getTime() + 3600000),
      },
      {
        start: new Date(),
        title: "Lançamento de Produto",
        allDay: false,
        description: "Evento de lançamento do novo produto",
        userId: 2,
        end: new Date(new Date().getTime() + 7200000),
      },
      {
        start: new Date("2024-01-23T09:00:00"),
        title: "Reunião de Planejamento",
        allDay: false,
        description: "Discussão sobre os próximos projetos e metas.",
        userId: 1,
        end: new Date("2024-01-23T11:00:00"),
      },
      {
        start: new Date("2024-01-24T14:00:00"),
        title: "Entrega de Projeto",
        allDay: false,
        description: "Entregar o projeto ao cliente.",
        userId: 2,
        end: new Date("2024-01-24T17:00:00"),
      },
      {
        start: new Date("2024-01-25T10:30:00"),
        title: "Entrevista de Emprego",
        allDay: false,
        description: "Entrevista para a posição de desenvolvedor frontend.",
        userId: 3,
        end: new Date("2024-01-25T12:00:00"),
      },
      {
        start: new Date("2024-01-26T08:00:00"),
        title: "Treinamento Interno",
        allDay: true,
        description: "Dia inteiro de treinamento para a equipe.",
        userId: 1,
      },
      {
        start: new Date("2024-01-27T15:30:00"),
        title: "Lançamento do Produto",
        allDay: false,
        description: "Evento de lançamento do novo produto.",
        userId: 2,
        end: new Date("2024-01-27T18:00:00"),
      },
    ];

    for (const event of events) {
      await prisma.event.create({
        data: event,
      });
    }

    console.log("Dados de exemplo adicionados com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar dados de exemplo:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
