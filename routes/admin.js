const express = require('express');
const router = express.Router();
const auth = require("../auth");

router.get("/", auth.onlyAdmin, (req, res) => {
    res.render("admin/admin", { user: req.user });
});

router.get("/users", (req, res) => {

});

router.get("/item", (req, res) => {

});

router.get("/item/upload", (req, res) => {

});

router.post("/item/upload", (req, res) => {

});

module.exports = router;