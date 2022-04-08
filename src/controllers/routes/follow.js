const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const followRouter = new Router();
const prisma = new PrismaClient();

followRouter.get("/", async (req, res) => {
  try {
    const { auth, id } = req.body;
    const data = await prisma.user.findUnique({
      where: { auth: auth },
      include: {
        contact: {
          select: {
            name: true,
            id: true,
            auth: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    });
    const contacts = data.contact;
    const filteredeContact = [];
    if (contacts.length !== 0) {
      const findContact = contacts.filter((el) => el.auth === id);
      return filteredeContact.push(findContact);
    }
    res.json(filteredeContact);
  } catch (error) {
    console.error(error);
  }
});

module.exports = followRouter;
