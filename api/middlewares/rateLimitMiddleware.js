// middlewares/rateLimiter.js
const { promisify } = require("util");

const rateLimit = (redisClient, windowMs, maxRequests) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);
  const setexAsync = promisify(redisClient.setex).bind(redisClient);

  return async (socket, next) => {
    const userId = socket.user.id;
    const now = Date.now();
    const windowKey = `rate-limit:${userId}:${Math.floor(now / windowMs)}`;

    try {
      // Check the number of requests in the current window
      const requestCount = await getAsync(windowKey);

      console.log("req count", requestCount);
      if (requestCount && parseInt(requestCount, 10) >= maxRequests) {
        return next(
          new Error("Too many messages sent, please try again later.")
        );
      }

      // Set the count with an expiration time if it's the first request
      await setexAsync(
        windowKey,
        windowMs / 1000,
        requestCount ? parseInt(requestCount, 10) + 1 : 1
      );
      next();
    } catch (error) {
      console.error("Rate limiting error:", error);
      next(error);
    }
  };
};

module.exports = rateLimit;
