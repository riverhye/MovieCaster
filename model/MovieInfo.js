function movie_info(Sequelize, DataTypes) {
    return Sequelize.define(
      'movie_info',
      {
        movieidx: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(4000),
          allowNull: false,
        },
        director: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        date: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pic1: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        pic2: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        pic3: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
      },
      {
        tableName: 'movie_info',
        freezeTableName: true,
        timestamps: false,
      }
    )
  }
  
  module.exports = movie_info