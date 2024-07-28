const Message = require("../models/Message");
const User = require("../models/User");

async function getMessages({ where, offset, limit }) {
  try {
    const { count, rows: messages } = await Message.findAndCountAll({
      where,
      offset,
      limit,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });

    const result = {
      totalMessages: count,
      messages: messages.reverse(),
    };

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { getMessages };
