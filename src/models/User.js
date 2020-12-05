import sequelize from 'sequelize';
import bcrypt from 'bcrypt';

const { Model, DataTypes } = sequelize;

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        hooks: {
          beforeCreate: async function (user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          },
        },
        sequelize,
        tableName: 'users',
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.ChatRoom, {
      foreignKey: 'user_id',
      through: 'user_chatrooms',
    });
    this.hasMany(models.Message, {
      foreignKey: 'user_from_id',
    });
    this.hasMany(models.Message, {
      foreignKey: 'user_to_id',
    });
  }
}
