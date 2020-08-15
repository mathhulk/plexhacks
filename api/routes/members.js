module.exports = function(request, response) {
    const Congress = request.app.locals.congress;

    Congress.getMembers(function(members) {
       if(members) {
           response.status(200);
           return response.json({ status: "success", members: members });
       }

       response.status(502);
       return response.json({ status: "error", error: "ProPublica Congress API error" });
   });
};
