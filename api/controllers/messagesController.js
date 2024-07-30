const messagesService = require("../services/messageService");

async function getMessages(req, res, next) {
  try {
    const { offset, limit, roomId } = req.query;

    const parsedLimit = parseInt(limit) || 20;
    const parsedOffset = parseInt(offset) || 0;
    const where = { roomId };

    const messages = await messagesService.getMessages({
      where,
      limit: parsedLimit,
      offset: parsedOffset,
    });
    return res.status(200).json({
      messages,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getMessages };
