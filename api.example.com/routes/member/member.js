module.exports = function(request, response) {
    const Congress = request.app.locals.congress;
    const identifier = request.params.identifier;

    Congress.getMember(identifier, function(member) {
        if(member) {
            response.status(200);
            return response.json({ status: "success", member: member });
        }

        response.status(502);
        return response.json({ status: "error", error: "ProPublica Congress API error" });
    });
};
