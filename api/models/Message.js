const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Message = sequelize.define(
  "Message",
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "room_id",
      references: {
        model: "rooms",
        key: "id",
      },
    },
  },
  {
    tableName: "messages",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Message.associate = (models) => {
  Message.belongsTo(models.User, { foreignKey: "user_id" });
  Message.belongsTo(models.Room, { foreignKey: "room_id" });
};

module.exports = Message;
