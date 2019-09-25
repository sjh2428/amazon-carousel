const express = require('express');
const router = express.Router();
const { onlyAdmin } = require("../auth");
const adminController = require("../controllers/admin_controller");

router.get("/", onlyAdmin, (req, res) => {
    res.render("admin/admin", { user: req.user });
});

router.get("/users", onlyAdmin, async(req, res) => {
    const userData = await adminController.getUsers(req.user.user_id);
    for (user of userData) user.birth = new Date(user.birth).toLocaleDateString("ko-KR");
    res.render("admin/users", { user: req.user, userData});
});

router.get("/dealUser/:id", onlyAdmin, async(req, res) => {
    const { params: { id }, query: { to } } = req;
    await adminController.authControl(id, to);
    res.redirect("/admin/users");
});

router.get("/item/upload", onlyAdmin, (req, res) => {

});

router.post("/item/upload", onlyAdmin, (req, res) => {

});

module.exports = router;