const dotenv = require("dotenv");
const sqlQuery = require("../models/sql_query");
dotenv.config();

module.exports = {
    async getHomeData() {
        const { ENDPOINT, BUCKET_NAME } = process.env;
        const URL = `${ENDPOINT}/${BUCKET_NAME}/`;
        const result = { card: {}, carousel: {} };
        const carousel = await sqlQuery("select * from item");
        const card = await sqlQuery("select * from card");
        for (const cdData of card) {
            const { category, gradient, image } = cdData;
            result.card[category] = { gradient, image: URL + image };
        }
        
        for (const crsData of carousel) {
            const { category, id, image, title, head, body, tail, link, created_by } = crsData;
            if (!result.carousel[category]) result.carousel[category] = [];
            result.carousel[category].push({ id, image: URL + image, title, head, body, tail, link, created_by });
        }
        return result;
    }
}