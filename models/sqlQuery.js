const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.REMOTE_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB
});

const query = async (sql) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {
			const [rows] = await connection.query(sql);
			return rows;
		} catch(err) {
			console.log('Query Error');
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};

module.exports = query;