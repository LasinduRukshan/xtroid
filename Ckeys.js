/* X-Script  */


const { Sequelize } = require('sequelize');
const fs = require('fs');
if (fs.existsSync('Ckeys.env')) require('dotenv').Ckeys({ path: './Ckeys.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
DATABASE_URL = process.env.DATABASE_URL === undefined ? './x.db' : process.env.DATABASE_URL;
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);
module.exports = {

    DEVELOPER_TAG: process.env.DEVELOPE_TAG === undefined ? 'XTroid-X' : process.env.DEVELOPE_TAG,
WA_CONNECTION: process.env.WA_CONNECTION === undefined ? '94702102324,0' : process.env.WA_CONNECTION,

    HEROKU: {
        HEROKU: process.env.HEROKU === undefined ? false : convertToBool(process.env.HEROKU),
        API_KEY: process.env.HEROKU_API_KEY === undefined ? '' : process.env.HEROKU_API_KEY,
        APP_NAME: process.env.HEROKU_APP_NAME === undefined ? '' : process.env.HEROKU_APP_NAME      
  
    },
    DATABASE_URL: DATABASE_URL,
    DATABASE: DATABASE_URL === './x.db' ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: DEBUG }) : new Sequelize(DATABASE_URL, { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: DEBUG }),
    SUPPORT3: "905511384572-1621015274"
};
