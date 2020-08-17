<template>
    <div id="members">
        <div class="container">
            <div class="d-flex mb-24px">

                <input type="text"
                       v-model="name"
                       class="input flex-grow-1"
                       placeholder="Search">

                <div class="select-wrapper">

                    <select class="select ml-24px"
                            v-model="party">

                        <option value="Any party" selected>Any party</option>
                        <option value="Republican">Republican</option>
                        <option value="Democrat">Democrat</option>
                        <option value="Other">Other</option>

                    </select>

                </div>

                 <div class="select-wrapper">

                     <select class="select ml-24px"
                             v-model="state">

                         <option value="Any state" selected>Any state</option>

                         <option v-for="state in states"
                                 :value="state"
                                 :key="state">{{ state }}</option>

                     </select>

                 </div>
            </div>

            <div class="row">

                <div class="col-xl-3 col-lg-4 col-md-6"
                     v-for="member in currentMembers"
                     :key="member.identifier">

                    <router-link :to="{ name: 'Congress member', params: { identifier: member.identifier } }"
                                 tag="div"
                                 class="card card-hover mb-24px">

                        <div class="badge"
                             :class="getClassFromParty(member.party)">{{ member.party }}</div>

                        <h2 class="heading">{{ member.first_name + " " + member.last_name }}</h2>
                        <p class="paragraph"><span class="important">{{ member.title }}</span> of <span class="important">{{ member.state }}</span></p>

                    </router-link>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Members",

    data( ) {
        return {
            members: null,
            currentMembers: null,

            states: [
                "Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas",
                "California", "Colorado", "Connecticut", "Delaware", "District of Columbia",
                "Florida", "Georgia", "Guam", "Hawaii", "Idaho",
                "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
                "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
                "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma",
                "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas", "U.S. Virgin Islands", "Utah",
                "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin",
                "Wyoming"
            ],

            party: "Any party",
            state: "Any state",
            name: null
        };
    },

    watch: {
        name( ) {
            this.filterMembers( );
        },

        party( ) {
            this.filterMembers( );
        },

        state( ) {
            this.filterMembers( );
        }
    },

    methods: {
        // Utility
        getClassFromParty(party) {
            return "badge-" + party.toLowerCase( );
        },

        setParty(party) {
            this.party = party;

            this.filterMembers( );
        },

        setState(state) {
            this.state = state;

            this.filterMembers( );
        },

        filterMembers( ) {
            let members = [ ];

            // No filter has been set
            if( this.party === "Any party" && this.state === "Any state" && ( ! this.name || this.name.trim( ).length === 0 ) ) {
                members = this.members;
            } else {
                for(const member of this.members) {
                    let memberName = member.first_name + " " + member.last_name;

                    // Party filter
                    if(this.party !== "Any party" && member.party !== this.party) continue;

                    // State filter
                    if(this.state !== "Any state" && member.state !== this.state) continue;

                    // Name search
                    if( this.name && this.name.trim( ).length > 0 && ! memberName.toLowerCase( ).includes( this.name.trim( ).toLowerCase( ) ) ) continue;

                    members.push(member);
                }
            }

            this.currentMembers = members.sort(function(firstMember, secondMember) {
                return firstMember.last_name < secondMember.last_name ? -1 : (firstMember.last_name > secondMember.last_name ? 1 : 0);
            });
        }
    },

    mounted( ) {
        axios.get("http://localhost:8450/members").then(response => {
            const { data } = response;

            this.members = data.members;
            this.currentMembers = this.members;
        });
    }
}
</script>
