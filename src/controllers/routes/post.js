const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const { jwtCheck } = require("../authz/check-jwt");
const postRouter = new Router();
const prisma = new PrismaClient();

postRouter.get("/", async (req, res) => {
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

postRouter.get("/:id", jwtCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await prisma.user.findMany({
      where: { auth: id },
      include: {
        contact: {
          select: {
            auth: true,
          },
        },
      },
    });

    const data1 = data[0].contact;
    const data2 = data1.map((el) => el.auth);
    const dataArr = new Set(data2);
    const postIDs = [...dataArr];

    const contacts = await prisma.user.findMany({
      where: { auth: { in: postIDs } },
      include: {
        post: {
          select: {
            id: true,
            nameUser: true,
            title: true,
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const items = [];
    for (let i = 0; i < contacts.length; i++) {
      const asd = contacts[i].post;
      for (let i = 0; i < asd.length; i++) {
        items.push(asd[i]);
      }
    }

    const orderPost = items.sort(function (a, b) {
      return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
    });
    res.json(orderPost);
  } catch (error) {
    console.error(error);
  }
});

postRouter.post("/:id", jwtCheck, async (req, res) => {
  try {
    const id = req.params.id;

    const dataName = await prisma.user.findUnique({
      where: { auth: id },
    });
    const name = dataName.name;
    const ids = dataName.id;

    const { title, content } = req.body;
    const data = await prisma.post.create({
      data: {
        nameUser: name,
        title,
        content,
        author: { connect: { id: ids } },
      },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

postRouter.put("/:id", jwtCheck, async (req, res) => {
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

postRouter.delete("/:id", jwtCheck, async (req, res) => {
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

module.exports = postRouter;
