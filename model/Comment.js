const { User } = require('./User');


function Comment(Sequelize, DataTypes) {
  return Sequelize.define(
    "Comment",

    {
      commentid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      useridx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movieidx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(100),
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "Comment",
      freezeTableName: true,
      timestamps: false,
    }
  );
}
Comment.associate = (model) => {
  Comment.hasMany(model.Comment_like, {
    foreignKey: 'commentid',
    onDelete: 'CASCADE', // 이 부분이 cascade deletion을 활성화합니다

  });
};

Comment.associate = (model) => {
  Comment.belongsTo(model.User, {
    foreignKey: 'useridx',
    as: 'CommentUser',
  });


  Comment.belongsTo(Movie_info, {
    foreignKey: 'movieidx',
    targetKey: 'movieidx',
    as: 'CommentMovie', // 에일리어스 추가
  });
    
};
module.exports = Comment;