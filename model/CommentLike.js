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
  Comment_like.associate = (model) => {
    Comment_like.belongsTo(model.Comment, {
      foreignKey: 'commentidx',
      onDelete: 'CASCADE', // cascade deletion을 위해 중요한 부분입니다
    });
  };
  module.exports = Comment_like;