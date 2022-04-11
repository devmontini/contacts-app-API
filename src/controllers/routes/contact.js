const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const contactRouter = new Router();
const prisma = new PrismaClient();

contactRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await prisma.user.findUnique({
      where: { auth: id },
      include: {
        contact: {
          select: {
            auth: true,
            name: true,
            id: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    const data1 = data.contact;
    const data2 = data1.map((el) => el.auth);
    const dataArr = new Set(data2);
    const postIDs = [...dataArr];

    const contacts = await prisma.user.findMany({
      where: { auth: { in: postIDs } },
    });

    res.json(contacts);
  } catch (error) {
    console.error(error);
  }
});

contactRouter.post("/:id/:auth", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const auth = parseInt(req.params.auth);

    const dataName = await prisma.user.findUnique({
      where: { id: id },
    });

    const data = await prisma.contact.create({
      data: {
        auth: dataName.auth,
        name: dataName.name,
        author: { connect: { id: auth } },
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
