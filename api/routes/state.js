const geoip = require("geoip-lite");

const { getStateNameByStateCode } = require("../src/State");

module.exports = function(request, response) {
    const Congress = request.app.locals.congress;
    const location = geoip.lookup(request.ip);

    let state = "California";

    // Exclude regions outside of the United States
    if(location && location.region && location.country === "US") {
        state = getStateNameByStateCode(location.region);
    }

    Congress.getMembers(function(members) {
        members = members.filter(member => member.state === state);

        if(members) {
            response.status(200);
            return response.json({ status: "success", state: state, members: members });
        }

        response.status(502);
        return response.json({ status: "error", error: "ProPublica Congress API error" });
    });
}
