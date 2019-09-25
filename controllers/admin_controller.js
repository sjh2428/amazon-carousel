const sqlQuery = require("../models/sql_query");
const upload2ncloud = require("../upload2ncloud");
const uuidv1 = require("uuid/v1");

module.exports = {
    async getUsers(user_id) {
        const users = await sqlQuery(`select * from user where user_id not in ('admin', '${user_id}')`);
        return users;
    },
    async authControl(id, to) {
        await sqlQuery(`update user set admin='${to}' where user_id='${id}'`);
    },
    async uploadAndInsertDB(req) {
        const { originalname, buffer } = req.file;
        const { Category, Title, Head, Body, Tail, Link } = req.body;
        await upload2ncloud(originalname, buffer);
        await sqlQuery(
            `insert into item values(
                '${uuidv1()}', '${Category}', '${originalname}', '${Title}', '${Head}', 
                '${Body}', '${Tail}', '${Link}', '${req.user.user_id}')`);
    }
}