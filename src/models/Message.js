import sequelize from 'sequelize';

const { Model, DataTypes } = sequelize;

export default class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        message_text: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'messages',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.ChatRoom, {
      foreignKey: 'chat_id',
    });
    this.belongsTo(models.User, {
      foreignKey: 'sender_user',
    });
  }
}
