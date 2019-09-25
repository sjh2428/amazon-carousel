const passport = require("passport");
const express = require('express');
const router = express.Router();
const sqlQuery = require("../models/sql_query");
const { onlyPublic } = require("../auth");

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', req.user ? { user: req.user } : { user: undefined });
});

router.get("/login", onlyPublic, (req, res, next) => {
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

router.get("/sign-up", (req, res) => {
    const flashMsg = req.flash("signup_err");
    res.render("sign_up", { message: flashMsg.length > 0 ? flashMsg : undefined });
});

router.post("/sign-up", async(req, res) => {
    const { user_id, user_password, user_name, user_birth } = req.body;
    const sqlResult = await sqlQuery(`insert into user(user_id, user_password, name, birth) 
                                        values('${user_id}', '${user_password}', '${user_name}', '${user_birth}')`);
    console.log(sqlResult);
    if (!sqlResult) {
        req.flash("signup_err", "회원가입 실패!\n아이디 중복 또는 생일 오류");
        res.redirect("/sign_up");
    } else {
        res.redirect("/login");
    }
});

module.exports = router;
