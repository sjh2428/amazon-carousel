const sqlQuery = require("./sql_query");
const data = require("../routes/data/main_carousel");
const uuidv1 = require("uuid/v1");

module.exports = async() => {
    console.log("database initializing");
    const getCards = (cardData) => {
        let query = "";
        for (const key of Object.keys(cardData)) {
            query += `insert into card values("${key}", "${cardData[key].gradient}", "${cardData[key].imgSrc}");`;
        }
        return query;
    }

    const getItems = (itemData) => {
        let query = "";
        for (const category of Object.keys(itemData)) {
            for (const itemObject of itemData[category]) {
                query += `insert into item(id, category, image_name, title, head, body, tail, link, created_by) values("${uuidv1()}", "${category}", "${itemObject.image}", "${itemObject.title}", "${itemObject.head}", "${itemObject.body}", "${itemObject.tail}", "${itemObject.link}", "admin");`;
            }
        }
        return query;
    }
    
    await sqlQuery("create database if not exists amazon_db");
    await sqlQuery(`create table if not exists user(
        user_id varchar(20) PRIMARY KEY,
        user_password varchar(16) NOT NULL,
        name varchar(20),
        birth date,
        admin boolean DEFAULT false
    );`);
    await sqlQuery(`create table if not exists card(
        category varchar(20) PRIMARY KEY,
        gradient varchar(255),
        imgSrc varchar(255)
    );`);
    await sqlQuery(`create table if not exists item(
        id varchar(50) PRIMARY KEY,
        category varchar(20),
        image_name varchar(255),
        title varchar(50),
        head varchar(100),
        body TEXT,
        tail varchar(50),
        link varchar(255),
        created_by varchar(20),
        foreign key (created_by) references user (user_id),
        foreign key (category) references card (category)
    );`);
    const [ userCnt ] = await sqlQuery("select count(user_id) from user");
    if (userCnt["count(user_id)"] === 0) {
        await sqlQuery("insert into user(user_id, user_password, name, birth, admin) values('admin', '123123', 'Administrator', '2000-01-01', true)");
    }
    const [ cardCnt ] = await sqlQuery("select count(category) from card");
    if (cardCnt["count(category)"] === 0) {
        await sqlQuery(getCards(data["card"]));
    }
    const [ itemCnt ] = await sqlQuery("select count(id) from item");
    if (itemCnt["count(id)"] === 0) {
        await sqlQuery(getItems(data["carousel"]));
    }
    console.log("data init done");
}