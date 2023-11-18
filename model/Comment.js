const { User } = require("./User");

function Comment(Sequelize, DataTypes) {
  return Sequelize.define(
    "comment",

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
      tableName: "comment",
      freezeTableName: true,
      timestamps: false,
    }
  );
}
Comment.associate = (model) => {
  Comment.hasMany(model.Comment_like, {
    foreignKey: "commentidx",
    onDelete: "CASCADE", // 이 부분이 cascade deletion을 활성화합니다
  });
};

module.exports = Comment;
