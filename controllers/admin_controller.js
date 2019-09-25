const sqlQuery = require("../models/sql_query");

module.exports = {
    async getUsers(user_id) {
        const users = await sqlQuery(`select * from user where user_id not in ('admin', '${user_id}')`);
        return users;
    }
}