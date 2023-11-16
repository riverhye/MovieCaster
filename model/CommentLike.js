const { User } = require('./User');
const { Movie_info } = require('./MovieInfo');

function Comment_like(Sequelize, DataTypes) {
    return Sequelize.define(
      'comment_like',
      {
        commentlikeidx: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        commentid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        useridx: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'comment_like',
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
  
  module.exports = Comment_like;