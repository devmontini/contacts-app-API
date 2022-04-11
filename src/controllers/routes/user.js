const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const userRouter = new Router();
const prisma = new PrismaClient();

userRouter.get("/", async (req, res) => {
  try {
    const { auth, id } = req.body;
    console.log(auth, id);
    const data = await prisma.user.findUnique({
      where: { auth: auth, id: Int },
      include: {
        contact: {
          select: {
            auth: true,
            followed: true,
          },
        },
      },
    });
    const map = data.contact;
    const data2 = map.filter((el) => el.auth === id);

    res.json(data2);
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
