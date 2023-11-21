const Sequelize = require('sequelize');
// const config = require('../config/config.json')['development'];
const config = require('../config/config.json')['production'];


const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);
db.Movie_info = require('./MovieInfo')(sequelize, Sequelize);
db.Movie_like = require('./MovieLike')(sequelize, Sequelize);
db.Comment_like = require('./CommentLike')(sequelize, Sequelize);
db.Fav_movie = require('./FavMovie')(sequelize, Sequelize);

// Movie_info와 join
db.Movie_info.hasMany(db.Comment, {
  foreignKey: 'movieidx',
});

db.Comment.belongsTo(db.Movie_info, {
  foreignKey: 'movieidx',
  as: 'CommentMovie',
});

db.Movie_info.hasMany(db.Movie_like, {
  foreignKey: 'movieidx',
});

db.Movie_like.belongsTo(db.Movie_info, {
  foreignKey: 'movieidx',
  as: 'MovieLikeInfo',
});

db.Movie_info.hasMany(db.Fav_movie, {
  foreignKey: 'movieidx',
});

db.Fav_movie.belongsTo(db.Movie_info, {
  foreignKey: 'movieidx',
  as: 'FavMovieInfo',
});

// User와 연결
db.User.hasMany(db.Movie_like, {
  foreignKey: 'useridx',
});

db.Movie_like.belongsTo(db.User, {
  foreignKey: 'useridx',
  as: 'MovieLikeUser',
});

db.User.hasMany(db.Comment, {
  foreignKey: 'useridx',
});

db.Comment.belongsTo(db.User, {
  foreignKey: 'useridx',
  as: 'CommentUser',
});

db.User.hasMany(db.Fav_movie, {
  foreignKey: 'useridx',
});

db.Fav_movie.belongsTo(db.User, {
  foreignKey: 'useridx',
  as: 'FavMovieUser',
});

db.User.hasMany(db.Comment_like, {
  foreignKey: 'useridx',
});

db.Comment_like.belongsTo(db.User, {
  foreignKey: 'useridx',
  as: 'CommentLikeUser',
});

// Comment와 연결
db.Comment.hasMany(db.Comment_like, {
  foreignKey: 'commentid',
});

db.Comment_like.belongsTo(db.Comment, {
  onDelete: 'cascade',
  foreignKey: 'commentid',
  as: 'CommentLikeCmt',
});

module.exports = db;
