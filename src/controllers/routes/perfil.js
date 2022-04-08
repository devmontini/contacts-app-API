const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const perfilRouter = new Router();
const prisma = new PrismaClient();

perfilRouter.get("/", async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

perfilRouter.get("/:id", async (req, res) => {
  try {
    const auth = req.params.id;
    const data = await prisma.user.findUnique({
      where: { auth: auth },
      include: {
        post: {
          select: {
            id: true,
            nameUser: true,
            title: true,
            content: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        contact: {
          select: {
            name: true,
            auth: true,
            id: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

perfilRouter.post("/", async (req, res) => {
  try {
    const { auth, name, description } = req.body;
    const data = await prisma.user.create({
      data: { auth, name, description },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

perfilRouter.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    const data = await prisma.user.update({
      where: { id: id },
      data: { name, description },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

perfilRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.user.delete({
      where: { id: id },
    });
    res.json(post);
  } catch (error) {
    console.error(error);
  }
});

module.exports = perfilRouter;
