const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const userRouter = new Router();
const prisma = new PrismaClient();

userRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.user.findUnique({
      where: { id: id },
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
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = userRouter;
