// eslint-disable-next-line arrow-body-style
/**
 * Catches errors thrown in controllers
 * @param {Function} fn - The controller function
 */
// eslint-disable-next-line func-names
const catchErrors = (fn) => function (req, res, next) {
  return fn(req, res, next).catch(next);
};

module.exports = catchErrors;
