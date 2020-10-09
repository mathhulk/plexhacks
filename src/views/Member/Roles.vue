<template>
    <div id="member-roles">
        <div class="row">

            <div class="col-xl-3 col-lg-4 col-md-6"
                 v-for="role in roles"
                 :key="role.congress">

                <div class="card mb-24px">
                    <h2 class="heading">{{ role.congress }}th Congress</h2>
                    <p class="paragraph mb-24px"><span class="important">{{ role.title }}</span> from <span class="important">{{ role.state }}</span></p>

                    <h3 class="sub-heading">Party</h3>
                    <p class="paragraph mb-24px">{{ role.party }}</p>

                    <h3 class="sub-heading">Start</h3>
                    <p class="paragraph mb-24px">{{ getDate(role.start_date) }}</p>

                    <h3 class="sub-heading">End</h3>
                    <p class="paragraph">{{ getDate(role.end_date) }}</p>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MemberRoles",

    props: [ "identifier" ],

    data( ) {
        return {
            roles: null
        };
    },

    methods: {
        render( ) {
            // Progress bar implementation possible
            this.roles = null;

            axios.get("http://localhost:8450/member/" + this.identifier + "/roles").then(response => {
                const { data } = response;

                this.roles = data.roles;
            });
        },

        // Utility
        getDate(date) {
            date = new Date(date);

            return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        }
    },

    mounted( ) {
        this.render( );
    },

    watch: {
        // Required to render new Congress member
        $route( ) {
            this.render( );
        }
    }
}
</script>
