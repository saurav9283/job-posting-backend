const { validate } = require("uuid");


exports.isValidUuid = (id) => validate(id)

exports.isValidDate = (dateString) => (dateString && new Date(dateString).toString() !== "Invalid Date") || false;





