const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const { jwtCheck } = require("../authz/check-jwt");
const followRouter = new Router();
const prisma = new PrismaClient();

followRouter.get("/:id/:auth", jwtCheck, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const auth = req.params.auth;
    const data = await prisma.user.findUnique({
      where: { auth: auth },
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
