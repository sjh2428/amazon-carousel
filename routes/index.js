const passport = require("passport");
const express = require('express');
const router = express.Router();
const auth = require("../auth");

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', req.user ? { user: req.user } : { user: undefined });
});

router.get("/login", (req, res, next) => {
    const flashMsg = req.flash().error;
    res.render("login", { message: flashMsg ? flashMsg : undefined });
});

router.post("/login", 
    passport.authenticate("local", { 
        successRedirect: "/",
        failureRedirect: "/login", 
        failureFlash: true 
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.redirect("/");
    })
});

module.exports = router;
