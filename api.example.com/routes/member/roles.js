module.exports = function(request, response) {
    const Congress = request.app.locals.congress;
    const identifier = request.params.identifier;

    Congress.getMemberRoles(identifier, function(roles) {
        if(roles) {
            response.status(200);
            return response.json({ status: "success", roles: roles });
        }

        response.status(502);
        return response.json({ status: "error", error: "ProPublica Congress API error" });
    });
};
