const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Seat extends Model {}

  Seat.init({
    seat_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_reserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Seat',
  });

  return Seat;
};
