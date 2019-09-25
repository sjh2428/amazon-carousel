const express = require('express');
const router = express.Router();
const auth = require("../auth");
const adminController = require("../controllers/admin_controller");

router.get("/", auth.onlyAdmin, (req, res) => {
    res.render("admin/admin", { user: req.user });
});

router.get("/users", auth.onlyAdmin, async(req, res) => {
    const userData = await adminController.getUsers(req.user.user_id);
    for (user of userData) user.birth = new Date(user.birth).toLocaleDateString("ko-KR");
    res.render("admin/users", { user: req.user, userData});
});

router.get("/item", auth.onlyAdmin, (req, res) => {

});

router.get("/item/upload", auth.onlyAdmin, (req, res) => {

});

router.post("/item/upload", auth.onlyAdmin, (req, res) => {

});

module.exports = router;