const dbConfig = require("../config_db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.comments = require("./comment.js")(mongoose);
module.exports = db;
