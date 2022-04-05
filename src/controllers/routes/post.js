const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

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

postRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.user.findMany({
      where: { id: id },
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
    const post = [...dataArr];

    for (let i = 0; i < post.length; i++) {
      console.log(i);
    }

    // const daton = prisma.user.findUnique({
    //   where: { auth: el },
    //   include: {
    //     post: {
    //       select: {
    //         title: true,
    //         content: true,
    //       },
    //     },
    //   },
    // });

    res.json(post);
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

module.exports = postRouter;
