// Environment variables
require("dotenv").config( );

const express = require("express");
const request = require("request");
const states = require("us-state-codes");
const geoip = require("geoip-lite");

const app = express( );

const CONGRESS = 116;

// API

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*"); // temporary
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next( );
});

/*
 *  /state
 *  Returns the state of the user and the Congress members for that state
 *
 *  Default: California
 *
 */
app.get("/state", function(request, response) {
    const location = geoip.lookup(request.ip);

    let state = "CA";

    if(location && location.region && location.country === "US") {
        state = location.region;
    }

    getMembers(state, function(members) {
        if(members) {
            response.status(200);
            return response.json({ status: "success", state: states.getStateNameByStateCode(state), members: members });
        }

        response.status(404);
        return response.json({ status: "error", error: "ProPublica error" });
    });
});

/*
 *  /members
 *  Returns current Congress members
 *
 */
app.get("/members", function(request, response) {
    getMembers(function(members) {
        if(members) {
            response.status(200);
            return response.json({ status: "success", members: members });
        }

        response.status(404);
        return response.json({ status: "error", error: "ProPublica error" });
    });
});

/*
 *  /members/:member/roles
 *  Returns the roles for a Congress member
 *
 */
app.get("/members/:member/roles", function(request, response) {
    const identifier = request.params.member;

    getMemberRoles(identifier, function(roles) {
        if(roles) {
            response.status(200);
            return response.json({ status: "success", roles: roles });
        }

        response.status(404);
        return response.json({ status: "error", error: "Member not found" });
    });
});

/*
 *  members/:member
 *  Returns a Congress member
 *
 */
app.get("/members/:member", function(request, response) {
    const identifier = request.params.member;

    getMember(identifier, function(member) {
        if(member) {
            response.status(200);
            return response.json({ status: "success", member: member });
        }

        response.status(404);
        return response.json({ status: "error", error: "Member not found" });
    });
});

// App
app.listen(process.env.port, ( ) => {
    console.log("Listening...")
});

// Functions

/*
 *  getMembers(state)
 *
 */
function getMembers(state, callback) {
    let identifiers = [ ];

    if(typeof state === "function") {
        callback = state;

        state = null;
    }

    let temporaryMembers = [ ];

    const senateRequestOptions = {
        url: "https://api.propublica.org/congress/v1/" + CONGRESS + "/senate/members.json?in_office=true",
        headers: {
            "X-API-KEY": process.env.X_API_KEY
        }
    };

    request.get(senateRequestOptions, function(error, response, body) {
        // Prevent errors
        if(error) callback(null);

        temporaryMembers = temporaryMembers.concat(JSON.parse(body).results[0].members);

        const houseRequestOptions = {
            url: "https://api.propublica.org/congress/v1/" + CONGRESS + "/house/members.json?in_office=true",
            headers: {
                "X-API-KEY": process.env.X_API_KEY
            }
        };

        request.get(houseRequestOptions, function(error, response, body) {
            // Prevent errors
            if(error) callback(null);

            temporaryMembers = temporaryMembers.concat(JSON.parse(body).results[0].members);

            let members = [ ];

            for(const temporaryMember of temporaryMembers) {
                if(state && temporaryMember.state !== state) continue;

                if( identifiers.includes(temporaryMember.id) ) continue;

                const member = {
                    identifier: temporaryMember.id,
                    first_name: temporaryMember.first_name,
                    middle_name: temporaryMember.middle_name && temporaryMember.middle_name.length > 1 ? temporaryMember.middle_name : null,
                    last_name: temporaryMember.last_name,
                    suffix: temporaryMember.suffix && temporaryMember.suffix.length > 1 ? temporaryMember.suffix : null,
                    state: states.getStateNameByStateCode(temporaryMember.state),
                    party: temporaryMember.party === "R" ? "Republican" : (temporaryMember.party === "D" ? "Democrat" : "Other"),
                    title: temporaryMember.title,
                    short_title: temporaryMember.short_title
                };

                identifiers.push(member.identifier);
                members.push(member);
            }

            callback(members);
        });
    });
}

/*
 *  getMemberRoles(member)
 *
 */
function getMemberRoles(identifier, callback) {
    const options = {
        url: "https://api.propublica.org/congress/v1/members/" + identifier + ".json",
        headers: {
            "X-API-KEY": process.env.X_API_KEY
        }
    };

    request.get(options, function(error, response, body) {
        // Prevent errors
        if(error) callback(null);

        const roles = JSON.parse(body).results[0].roles;

        let updatedRoles = [ ];

        for(const role of roles) {
            const updatedRole = {
                current: role.congress === "116",

                congress: role.congress,
                chamber: role.chamber,
                title: role.title,
                short_title: role.short_title,
                state: states.getStateNameByStateCode(role.state),
                party: role.current_party === "R" ? "Republican" : (role.current_party === "D" ? "Democrat" : "Other"),
                start_date: role.start_date,
                end_date: role.end_date,

                votes: {
                    total: role.total_votes,
                    missed: role.missed_votes,

                    party_percentage: role.votes_with_party_pct
                },

                bills: {
                    sponsored: role.bills_sponsored,
                    cosponsored: role.bills_cosponsored
                }

                // Committees and subcommittees have individual endpoints
            };

            updatedRoles.push(updatedRole);
        }

        callback(updatedRoles);
    });
}

/*
 *  getMember(member)
 *
 */
function getMember(identifier, callback) {
    const options = {
        url: "https://api.propublica.org/congress/v1/members/" + identifier + ".json",
        headers: {
            "X-API-KEY": process.env.X_API_KEY
        }
    };

    request.get(options, function(error, response, body) {
        // Prevent errors
        if(error) callback(null);

        const result = JSON.parse(body).results[0];

        const member = {
            identifier: result.id,
            first_name: result.first_name,
            middle_name: result.middle_name && result.middle_name.length > 1 ? result.middle_name : null,
            last_name: result.last_name,
            suffix: result.suffix && result.suffix.length > 1 ? result.suffix : null,
            gender: result.gender === "M" ? "male" : "female",
            date_of_birth: result.date_of_birth,
            party: result.current_party === "R" ? "Republican" : (result.current_party === "D" ? "Democrat" : "Other"),
            in_office: result.in_office,

            links: {
                website: result.url,
                twitter: result.twitter_account ? "https://twitter.com/" + result.twitter_account : null,
                facebook: result.facebook_account ? "https://facebook.com/" + result.facebook_account : null,
                youtube: result.youtube_account ? "https://youtube.com/c/" + result.youtube_account : null
            }
        };

        if(member.in_office) {
            const role = result.roles[0];

            member.role = {
                congress: role.congress,
                chamber: role.chamber,
                title: role.title,
                short_title: role.short_title,
                state: states.getStateNameByStateCode(role.state),
                party: role.current_party === "R" ? "Republican" : (role.current_party === "D" ? "Democrat" : "Other"),
                start_date: role.start_date,
                end_date: role.end_date,

                contact: {
                    office: role.office,
                    phone: role.phone,
                    fax: role.fax,
                    form: role.contact_form
                },

                votes: {
                    total: role.total_votes,
                    missed: role.missed_votes,

                    party_percentage: role.votes_with_party_pct
                },

                bills: {
                    sponsored: role.bills_sponsored,
                    cosponsored: role.bills_cosponsored
                }

                // Committees and subcommittees have individual endpoints
            };
        }

        callback(member);
    });
}
