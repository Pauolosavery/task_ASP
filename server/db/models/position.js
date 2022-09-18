const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    static associate({ User }) {
      Position.User = Position.hasMany(User, { foreignKey: 'positionId' });
    }
  }
  Position.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    jobTitle: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Position',
    tableName: 'Positions',
  });
  return Position;
};
