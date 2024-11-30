const { events } = require("../config/constants");
//-------------------------------------------------------------
/**
 * @param {string} eventName
 * @param {object} body
 * @returns {object | boolean}
 */
//MAIN FUNCTION
exports.formCustomDataObject = (eventName, body) => {
  if (events[eventName] === false) {
    return false;
  }
  const requiredData = events[eventName];

  let response = {};
  let keyName;
  for (key in requiredData) {
    keyName = requiredData[key];
    response[keyName] = body[keyName];
  }
  console.log(response);
  return response;
};
