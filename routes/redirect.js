const express = require("express");
const { PrismaClient } = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/:shortened", async (req, res) => {
  try {
    console.log("[Redirect] - Redirecting to URL - ", req.params.shortened);

    const link = await prisma.link.findFirst({
      where: {
        shortened: req.params.shortened,
      },
    });

    if (link) {
      await prisma.link.update({
        where: { shortened: req.params.shortened },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
      return res.redirect(link.url);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
