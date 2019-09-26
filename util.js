module.exports = {
    iteration(f, iter) {
        for(const a of iter) f(a);
    },
    map(f, iter) {
        const res = [];
        for(const a of iter) res.push(f(a));
        return res;
    }
}