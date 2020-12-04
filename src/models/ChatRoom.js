import sequelize from 'sequelize';

const { Model, DataTypes } = sequelize;

export default class ChatRoom extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'chatroom_id',
      through: 'user_chatrooms',
      as: 'users',
    });
  }
}
