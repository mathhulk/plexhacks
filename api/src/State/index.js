const states = require("./states.json");

// Include territories
function getStateNameByStateCode(code) {
    return states[code];
}

module.exports = {
    getStateNameByStateCode: getStateNameByStateCode
}
