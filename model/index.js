const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
db.Movie_info = require("./MovieInfo")(sequelize, Sequelize);
db.Movie_like = require("./MovieLike")(sequelize, Sequelize);
db.Comment_like = require("./CommentLike")(sequelize, Sequelize);
db.Fav_movie = require("./FavMovie")(sequelize, Sequelize);

module.exports = db;