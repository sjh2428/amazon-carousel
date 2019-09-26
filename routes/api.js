const express = require("express");
const router = express.Router();
const { getHomeData } = require("../controllers/api_controller");

router.get("/getItem", async(req, res) => {
    res.json(await getHomeData());
});

module.exports = router;