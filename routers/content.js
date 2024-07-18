const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

router.get("/posts", async (req, res) => {
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: { id: "desc" },
      take: 20,
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.deleteMany({
      where: { postId: Number(id) },
    });
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = { contentRouter: router };
