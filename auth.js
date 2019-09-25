module.exports = {
    onlyPublic(req, res, next) {
        if (req.user) res.redirect("/");
        else next();
    },
    onlyPrivate(req, res, next) {
        if (req.user) next();
        else res.redirect("/login");
    },
    onlyAdmin(req, res) {
        if (req.user.admin) next();
        else res.redirect("/");
    }
}