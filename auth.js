module.exports = {
    onlyPrivate(req, res, next) {
        if (req.user) next();
        else res.redirect("/login");
    },
    onlyAdmin(req, res) {
        if (req.user.admin) next();
        else res.redirect("/");
    }
}