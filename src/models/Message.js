import sequelize from 'sequelize';

const { Model, DataTypes } = sequelize;

export default class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        body: DataTypes.STRING,
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
    this.belongsTo(models.ChatRoom, {
      foreignKey: 'user_to_id',
    });
    this.belongsTo(models.ChatRoom, {
      foreignKey: 'user_from_id',
    });
  }
}
