function User(Sequelize, DataTypes) {
  return Sequelize.define(
    'user',
    {
      useridx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      pw: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(255),
      },
      del_user_ch: {
        type: DataTypes.STRING(1),
        defaultValue: 'n',
      },
    },
    {
      tableName: 'user',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = User;
