function comment_like(Sequelize, DataTypes) {
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
  
  module.exports = comment_like;