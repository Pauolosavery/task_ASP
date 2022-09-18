const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Position }) {
      User.Position = User.belongsTo(Position, { foreignKey: 'positionId' });
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    positionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Position',
        key: 'id',
      },
    },
    fullname: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};
