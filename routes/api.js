const express = require("express");
const router = express.Router();
const { getHomeData } = require("../controllers/api_controller");
const miniCarouselData = require("../models/carousel_data/mini_carousel.js");

router.get("/main-carousel", async(req, res) => {
    console.log(JSON.stringify(await getHomeData(), null, 4));
    res.json(await getHomeData());
});

router.get("/mini-carousel", (req, res) => {
    res.json(miniCarouselData);
});

module.exports = router;