const express = require('express');
const router = express.Router();
const sql = require("../models/userModel");

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get("/login", (req, res, next) => {
    res.render("login");
});

router.post("/login", async(req, res, next) => {
    console.log(await sql("select * from user"));
    res.redirect("/");
});

module.exports = router;
