function isValidId(id) {
  return Number.isInteger(id) && id > 0;
};

module.exports = { isValidId };