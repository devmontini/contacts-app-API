const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const contactRouter = new Router();
const prisma = new PrismaClient();

contactRouter.get("/", async (req, res) => {
  try {
    const data = await prisma.contact.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

contactRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.contact.findUnique({
      where: { id: id },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

contactRouter.post("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { auth } = req.body;

    const dataName = await prisma.user.findUnique({
      where: { auth: auth },
    });

    const names = dataName.name;

    const data = await prisma.contact.create({
      data: {
        auth: auth,
        name: names,
        author: { connect: { id: id } },
      },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

contactRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.body;
    const data = await prisma.contact.delete({
      where: { id: id },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = contactRouter;
