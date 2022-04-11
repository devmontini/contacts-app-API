const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const followRouter = new Router();
const prisma = new PrismaClient();

followRouter.get("/:id/:auth", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const auth = parseInt(req.params.auth);
    const data = await prisma.user.findUnique({
      where: { id: auth },
      include: {
        contact: {
          select: {
            id: true,
            auth: true,
            followed: true,
          },
        },
      },
    });

    const data2 = await prisma.user.findUnique({
      where: { id: id },
    });

    const dataContacts = data.contact;

    const data3 = dataContacts.filter((el) => el.auth === data2.auth);

    res.json(data3);
  } catch (error) {
    console.error(error);
  }
});

module.exports = followRouter;
