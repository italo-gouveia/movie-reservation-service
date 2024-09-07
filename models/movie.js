const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Model {}

  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING, // Use ENUM if predefined genres
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });

  return Movie;
};
