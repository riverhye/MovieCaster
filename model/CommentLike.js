const { User } = require('./User');
const { Movie_info } = require('./MovieInfo');
const { Comment } = require('./Comment');

function Comment_like(Sequelize, DataTypes) {
    return Sequelize.define(
      'Comment_like',
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
        tableName: 'Comment_like',
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
  Comment_like.associate = (model) => {
    Comment_like.belongsTo(model.Comment, {
      foreignKey: 'commentid',
      onDelete: 'CASCADE', // cascade deletion을 위해 중요한 부분입니다
    });
  };
  module.exports = Comment_like;