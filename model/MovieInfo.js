function Movie_info(Sequelize, DataTypes) {
  return Sequelize.define(
    'Movie_info',
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
      overview: {
        type: DataTypes.STRING(4000),
        defaultValue: '정보 없음',
      },
      release_date: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      poster_path: {
        type: DataTypes.STRING(255),
        defaultValue: 'url 없음',
      },
      genre_ids: {
        type: DataTypes.STRING(50),
        default: '정보 없음',
      },
      genre: {
        type: DataTypes.STRING(50),
        defaultValue: '정보 없음',
      },
    },
    {
      tableName: 'Movie_info',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Movie_info;
