module.exports = (req, res, next) => {
  res.respond = (data = null, message = '', statusCode = 200, status = true) => {
    if (statusCode >= 400) status = false;

    res.status(statusCode).json({
      status,
      message,
      data,
    });
  };

  res.respondGet = (data = null, message = 'success get All data!') => {
    res.respond(data, message, 200);
  };

  res.respondCreated = (data = null, message = 'success create data!') => {
    res.respond(data, message, 201);
  };

  res.respondUpdated = (data = null, message = 'success update data!') => {
    res.respond(data, message, 200);
  };

  res.respondDeleted = (data = null, message = 'success delete data!') => {
    res.respond(data, message, 200);
  };

  res.respondNotFound = (message = "data is doesn't exist!", data = null) => {
    res.respond(data, message, 404);
  };

  res.respondAlreadyExist = (message = 'already exist!', data = null) => {
    res.respond(data, message, 400);
  };

  res.respondBadRequest = (message = 'bad request!', data = null) => {
    res.respond(data, message, 400);
  };

  res.respondServerError = (message = 'server error!', data = null) => {
    res.respond(data, message, 500);
  };

  res.respondSuccess = (data = null, message = 'success!') => {
    res.respond(data, message, 200);
  };

  res.notAuthorized = (message = 'youre not authorized!', data = null) => {
    res.respond(data, message, 401);
  };
  next();
};
