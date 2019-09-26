const express = require("express");
const router = express.Router();
const mainCarouselData = require("../models/carousel_data/main_carousel.js");
const miniCarouselData = require("../models/carousel_data/mini_carousel.js");

router.get("/main-carousel", (req, res) => {
    res.json(mainCarouselData);
});

router.get("/mini-carousel", (req, res) => {
    res.json(miniCarouselData);
});

module.exports = router;