// routes/links.js
const router = require("express").Router();
const { User} = require("../models/user");
const Link = require("../models/link");

router.post("/", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortUrl = generateShortUrl();
    const expirationDate = new Date(Date.now() + 48 * 60 * 60 * 1000); // 24 hours

    const link = new Link({
      originalUrl,
      shortUrl,
      expirationDate,
      
    });

    await link.save();

    res.status(201).send({ shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

function generateShortUrl() {

  return Math.random().toString(36).substring(2, 8);
}

module.exports = router;
