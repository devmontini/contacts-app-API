const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const postRouter = new Router();
const prisma = new PrismaClient();

postRouter.get("/", async (req, res) => {
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

postRouter.post("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const data = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: id } },
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

postRouter.put("/:id", async (req, res) => {
  try {
    const { title, content, id } = req.body;
    const data = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        content,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.post.delete({
      where: { id: id },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});
