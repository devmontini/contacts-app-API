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
    const { name, phone, email } = req.body;
    const data = await prisma.contact.create({
      data: {
        name,
        phone,
        email,
        author: { connect: { id: id } },
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

contactRouter.put("/", async (req, res) => {
  try {
    const { name, phone, email, id } = req.body;
    const data = await prisma.contact.update({
      where: { id: id },
      data: {
        name,
        phone,
        email,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

contactRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.contact.delete({
      where: { id: id },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = contactRouter;
