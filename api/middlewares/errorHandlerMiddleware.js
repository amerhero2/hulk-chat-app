function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    error: err.message || err,
  });
}

module.exports = errorHandler;
