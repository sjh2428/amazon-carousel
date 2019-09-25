const express = require('express');
const router = express.Router();
const auth = require("../auth");
const sqlQuery = require("../models/sql_query");

router.get("/", auth.onlyAdmin, (req, res) => {
    res.render("admin/admin", { user: req.user });
});

router.get("/users", auth.onlyAdmin, (req, res) => {

});

router.get("/item", auth.onlyAdmin, (req, res) => {

});

router.get("/item/upload", auth.onlyAdmin, (req, res) => {

});

router.post("/item/upload", auth.onlyAdmin, (req, res) => {

});

module.exports = router;