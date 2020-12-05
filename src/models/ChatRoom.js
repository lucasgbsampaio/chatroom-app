import sequelize from 'sequelize';

const { Model, DataTypes } = sequelize;

export default class ChatRoom extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'chatrooms',
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'chatroom_id',
      through: 'user_chatrooms',
    });
    this.hasMany(models.Message, {
      foreignKey: 'chat_id',
    });
  }
}
