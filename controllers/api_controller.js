const dotenv = require("dotenv");
const sqlQuery = require("../models/sql_query");
dotenv.config();

module.exports = {
    async getHomeData() {
        const { ENDPOINT, BUCKET_NAME } = process.env;
        const result = { card: {}, carousel: {} };
        const URL = `${ENDPOINT}/${BUCKET_NAME}/`;
        const carousel = await sqlQuery("select * from item");
        const card = await sqlQuery("select * from card");
        for (const cdData of card) {
            result.card[cdData.category] = {
                gradient: cdData.gradient,
                image: URL + cdData.image
            }
            result.carousel[cdData.category] = [];
        }
        for (const crsData of carousel) {
            const { category, id, image, title, head, body, tail, link, created_by } = crsData;
            result.carousel[category].push({ id, image: URL + image, title, head, body, tail, link, created_by });
        }
        return result;
    }
}