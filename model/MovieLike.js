function movie_like(Sequelize, DataTypes) {
    return Sequelize.define(
      'movie_like',
      {
        movielikeidx: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        useridx: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        movieidx: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'movie_like',
        freezeTableName: true,
        timestamps: false,
        uniqueKeys: {
          unique_movie_like: {
            fields: ['useridx', 'movieidx'],
          },
        },
      }
    );
  }
  
  module.exports = movie_like;