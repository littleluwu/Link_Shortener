const express = require("express");
const shortid = require("shortid");
const { PrismaClient } = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    let urlCode;

    console.log("[Shortener] - Shortening URL - ", url);

    const shortened = await prisma.link.findFirst({
      where: {
        url: url,
      },
    });

    if (!shortened) {
      urlCode = shortid.generate();
      await prisma.link.create({
        data: {
          url: url,
          shortened: urlCode,
        },
      });
    } else {
      urlCode = shortened.shortened;
    }

    const shortUrl = `${process.env.BASE_URL}/r/${urlCode}`;

    console.log("[Shortener] - Shortened URL - ", shortUrl);

    return res.status(201).json({ shortUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error Shortening URL");
  }
});

module.exports = router;
