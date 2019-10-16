/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        is: ['^[\w.+\-]+@andela\.com$'],
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Engineer',
      validate: {
        isIn: {
          args: [
            [
              'Engineer',
              'LF',
              'Super LF',
            ],
          ],
          msg:
            'Role must either be Engineer, LF or Super LF',
        },
      },
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Rating, {
      foreignKey: 'user',
    });
    User.hasMany(models.Group, {
      foreignKey: 'lf',
    });
  };
  return User;
};
