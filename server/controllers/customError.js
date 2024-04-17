class customError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const wrapper = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
};

export { customError, wrapper };
