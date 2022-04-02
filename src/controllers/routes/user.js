const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const userRouter = new Router();
const prisma = new PrismaClient();

userRouter.get("/", async (req, res) => {
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

userRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.user.findUnique({
      where: { id: id },
      include: {
        posts: {
          select: {
            name: true,
            email: true,
            phone: true,
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

userRouter.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const data = await prisma.user.create({
      data: { name, email, phone },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, phone } = req.body;
    const data = await prisma.user.update({
      where: { id: id },
      data: { name, email, phone },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

userRouter.delete("/:id", async (req, res) => {
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

module.exports = userRouter;
