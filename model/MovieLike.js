const { User } = require('./User');
const { Movie_info } = require('./MovieInfo');

function Movie_like(Sequelize, DataTypes) {
  return Sequelize.define(
    'Movie_like',
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
      tableName: 'Movie_like',
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

module.exports = Movie_like;
