function fav_movie(Sequelize, DataTypes) {
    return Sequelize.define(
      'fav_movie',
      {
        favmovieidx: {
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
        tableName: 'fav_movie',
        freezeTableName: true,
        timestamps: false,
        uniqueKeys: {
          unique_fav_movie: {
            fields: ['useridx', 'movieidx'],
          },
        },
      }
    );
  }
  
  module.exports = fav_movie;