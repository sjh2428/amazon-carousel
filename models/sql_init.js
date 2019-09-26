const sqlQuery = require("./sql_query");

module.exports = async() => {
    await sqlQuery("create database if not exists amazon_db");
    await sqlQuery(`create table if not exists user(
        user_id varchar(20) PRIMARY KEY,
        user_password varchar(16) NOT NULL,
        name varchar(20),
        birth date,
        admin boolean DEFAULT false
    )`);
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
        foreign key (created_by) references user (user_id)
    )`);
    await sqlQuery(`insert into user`);
}