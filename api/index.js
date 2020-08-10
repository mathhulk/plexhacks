// Environment variables
require("dotenv").config( );

const express = require("express");
const request = require("request");
const states = require("us-state-codes");

const app = express( );

// API

/*
 *  /members/:member/roles
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
            middle_name: result.middle_name.length > 0 ? result.middle_name : null,
            last_name: result.last_name,
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
