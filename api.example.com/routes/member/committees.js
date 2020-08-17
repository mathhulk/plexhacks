module.exports = function(request, response) {
    const Congress = request.app.locals.congress;
    const identifier = request.params.identifier;

    Congress.getMemberCommittees(identifier, function(committees) {
        if(committees) {
            response.status(200);
            return response.json({ status: "success", committees: committees });
        }

        response.status(502);
        return response.json({ status: "error", error: "ProPublica Congress API error" });
    });
};
