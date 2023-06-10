const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const { articles } = require("../data/data.json");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Головна сторінка" });
});

router.get("/contact", (req, res, next) => {
  res.render("contact", { title: "Звʼязок зі мною" });
});

router.post("/contact", async (req, res, next) => {
  await fs.writeFile(
    path.join(__dirname, "..", "data", "message.json"),
    JSON.stringify(req.body, null, 2)
  );
  
  res.redirect("/");
});

router.get("/blog", (req, res, next) => {
  res.render("blog", { title: "Про мене", articles });
});

module.exports = router;
 