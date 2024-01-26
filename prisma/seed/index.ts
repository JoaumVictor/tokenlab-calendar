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
        name: "João",
        email: "joao@gmail.com",
        password: "123456",
      },
      {
        name: "Baianor",
        email: "baianor@gmail.com",
        password: "123456",
      },
      {
        name: "Vitim",
        email: "vitinho@gmail.com",
        password: "bololohaha",
      },
    ];

    for (const user of users) {
      await prisma.user.create({
        data: user,
      });
    }
    console.log("3 Usuários de exemplo adicionados com sucesso.");

    const createdUsers = await prisma.user.findMany();

    const events = [
      {
        start: new Date(),
        title: "Reunião de Projeto",
        allDay: false,
        description: "Discussão sobre os próximos passos do projeto",
        creatorId: createdUsers[0].id,
        end: new Date(new Date().getTime() + 3600000),
      },
      {
        start: new Date(),
        title: "Lançamento de Produto",
        allDay: false,
        description: "Evento de lançamento do novo produto",
        creatorId: createdUsers[1].id,
        end: new Date(new Date().getTime() + 7200000),
      },
      {
        start: new Date("2024-01-23T09:00:00"),
        title: "Reunião de Planejamento",
        allDay: false,
        description: "Discussão sobre os próximos projetos e metas.",
        creatorId: createdUsers[0].id,
        end: new Date("2024-01-23T11:00:00"),
      },
      {
        start: new Date("2024-01-24T14:00:00"),
        title: "Entrega de Projeto",
        allDay: false,
        description: "Entregar o projeto ao cliente.",
        creatorId: createdUsers[1].id,
        end: new Date("2024-01-24T17:00:00"),
      },
      {
        start: new Date("2024-01-25T10:30:00"),
        title: "Entrevista de Emprego",
        allDay: false,
        description: "Entrevista para a posição de desenvolvedor frontend.",
        creatorId: createdUsers[2].id,
        end: new Date("2024-01-25T12:00:00"),
      },
      {
        start: new Date("2024-01-26T08:00:00"),
        title: "Treinamento Interno",
        allDay: true,
        description: "Dia inteiro de treinamento para a equipe.",
        creatorId: createdUsers[0].id,
      },
      {
        start: new Date("2024-01-27T15:30:00"),
        title: "Lançamento do Produto",
        allDay: false,
        description: "Evento de lançamento do novo produto.",
        creatorId: createdUsers[1].id,
        end: new Date("2024-01-27T18:00:00"),
      },
    ];
    for (const event of events) {
      await prisma.event.create({
        data: event,
      });
    }
    console.log("Eventos de exemplo adicionados com sucesso.");

    const getAllEvents = await prisma.event.findMany();
    const eventsIds = getAllEvents.map((event: any) => event.id);

    const participantsOnEvents = [
      {
        userId: createdUsers[1].id,
        eventId: eventsIds[0],
      },
      {
        userId: createdUsers[2].id,
        eventId: eventsIds[0],
      },
      {
        userId: createdUsers[0].id,
        eventId: eventsIds[1],
      },
      {
        userId: createdUsers[2].id,
        eventId: eventsIds[1],
      },
      {
        userId: createdUsers[0].id,
        eventId: eventsIds[2],
      },
    ];
    for (const participant of participantsOnEvents) {
      await prisma.participantsOnEvents.create({
        data: participant,
      });
    }
    console.log("Participantes de exemplo adicionados com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar dados de exemplo:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
