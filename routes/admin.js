const express = require('express');
const router = express.Router();
const { onlyAdmin } = require("../auth");
const { getUsers, authControl, uploadAndInsertDB } = require("../controllers/admin_controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", onlyAdmin, (req, res) => {
    res.render("admin/admin", { user: req.user });
});

router.get("/users", onlyAdmin, async(req, res) => {
    const userData = await getUsers(req.user.user_id);
    for (const user of userData) user.birth = new Date(user.birth).toLocaleDateString("ko-KR");
    res.render("admin/users", { user: req.user, userData});
});

router.get("/dealUser/:id", onlyAdmin, async(req, res) => {
    const { params: { id }, query: { to } } = req;
    await authControl(id, to);
    res.redirect("/admin/users");
});

router.get("/item/upload", onlyAdmin, (req, res) => {
    res.render("admin/items", { user: req.user });
});

router.post("/item/upload", onlyAdmin, upload.single("img"), async(req, res) => {
    await uploadAndInsertDB(req);
    res.redirect("/admin");
});

module.exports = router;