const express = require("express");
const router = express.Router();
const carouselData = require("../data/carousel.js");

router.get("/carousel", (req, res) => {
    res.json(carouselData);
});

module.exports = router;