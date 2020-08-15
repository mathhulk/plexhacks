const request = require("request");

const { getStateNameByStateCode } = require("./State");

const CURRENT_MEETING = 116;
const API_ROOT = "https://api.propublica.org/congress/v1";

class Congress {
    constructor(key) {
        this.key = key;
    }

    getMemberRoles(identifier, callback) {
        // Prevent empty functions
        if(typeof callback !== "function") return;

        const options = {
            url: API_ROOT + "/members/" + identifier + ".json",
            headers: { "X-API-KEY": this.key }
        };

        request.get(options, function(error, response, body) {
            if(error) callback(null);

            // Prevent 404 error
            body = JSON.parse(body);
            if(body.status === "ERROR") callback(null);

            const temporaryRoles = body.results[0].roles;

            let roles = [ ];

            for(const temporaryRole of temporaryRoles) {
                const role = {
                    current: temporaryRole.congress === CURRENT_MEETING,

                    congress: temporaryRole.congress,
                    chamber: temporaryRole.chamber,
                    title: temporaryRole.title,
                    short_title: temporaryRole.short_title,
                    state: getStateNameByStateCode(temporaryRole.state),
                    party: temporaryRole.current_party === "R" ? "Republican" : (temporaryRole.current_party === "D" ? "Democrat" : "Other"),
                    start_date: temporaryRole.start_date,
                    end_date: temporaryRole.end_date,

                    votes: {
                        total: temporaryRole.total_votes,
                        missed: temporaryRole.missed_votes,

                        party_percentage: temporaryRole.votes_with_party_pct
                    },

                    bills: {
                        sponsored: temporaryRole.bills_sponsored,
                        cosponsored: temporaryRole.bills_cosponsored
                    }
                };

                roles.push(role);
            }

            callback(roles);
        });
    }

    getMember(identifier, callback) {
        // Prevent empty functions
        if(typeof callback !== "function") return;

        const options = {
            url: API_ROOT + "/members/" + identifier + ".json",
            headers: { "X-API-KEY": this.key }
        };

        request.get(options, function(error, response, body) {
            if(error) callback(null);

            // Prevent 404 error
            body = JSON.parse(body);
            if(body.status === "ERROR") callback(null);

            const result = body.results[0];

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
                },

                roll: null
            };

            // Include current role to consolidate member and roles endpoints
            if(member.in_office) {
                const role = result.roles[0];

                member.role = {
                    congress: role.congress,
                    chamber: role.chamber,
                    title: role.title,
                    short_title: role.short_title,
                    state: getStateNameByStateCode(role.state),
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
                };
            }

            callback(member);
        });
    }

    getMembers(callback) {
        const key = this.key;

        // Prevent empty functions
        if(typeof callback !== "function") return;

        // Prevent identifiers from appearing multiple times
        let identifiers = [ ];

        let temporaryMembers = [ ];

        const senateRequestOptions = {
            url: API_ROOT + "/" + CURRENT_MEETING + "/senate/members.json?in_office=true",
            headers: { "X-API-KEY": key }
        }

        request.get(senateRequestOptions, function(error, response, body) {
            if(error) callback(null);

            const result = JSON.parse(body).results[0].members;
            temporaryMembers = temporaryMembers.concat(result);

            const houseRequestOptions = {
                url: API_ROOT + "/" + CURRENT_MEETING + "/house/members.json?in_office=true",
                headers: { "X-API-KEY": key }
            };

            request.get(houseRequestOptions, function(error, response, body) {
                if(error) callback(null);

                const result = JSON.parse(body).results[0].members;
                temporaryMembers = temporaryMembers.concat(result);

                let members = [ ];

                for(const temporaryMember of temporaryMembers) {
                    // Prevent identifiers from appearing multiple times
                    if( identifiers.includes(temporaryMember.id) ) continue;

                    const member = {
                        identifier: temporaryMember.id,
                        first_name: temporaryMember.first_name,
                        middle_name: temporaryMember.middle_name && temporaryMember.middle_name.length > 1 ? temporaryMember.middle_name : null,
                        last_name: temporaryMember.last_name,
                        suffix: temporaryMember.suffix && temporaryMember.suffix.length > 1 ? temporaryMember.suffix : null,
                        state: getStateNameByStateCode(temporaryMember.state),
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
}

module.exports = Congress;
