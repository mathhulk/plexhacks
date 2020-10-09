<template>
    <div id="member-committees">
        <div class="row">

            <div class="col-xl-3 col-lg-4 col-md-6"
                 v-for="committee in committees"
                 :key="committee.identifier">

                <div class="card mb-24px">
                    <h2 class="heading">{{ committee.name }}</h2>
                    <p class="paragraph mb-24px">{{ committee.title }}</p>

                    <h3 class="sub-heading">Start</h3>
                    <p class="paragraph mb-24px">{{ getDate(committee.start_date) }}</p>

                    <h3 class="sub-heading">End</h3>
                    <p class="paragraph">{{ getDate(committee.end_date) }}</p>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MemberCommittees",

    props: [ "identifier" ],

    data( ) {
        return {
            committees: null
        };
    },

    methods: {
        render( ) {
            // Progress bar implementation possible
            this.roles = null;

            axios.get("http://localhost:8450/member/" + this.identifier + "/committees").then(response => {
                const { data } = response;

                this.committees = data.committees;
            });
        },

        // Utility
        getDate(date) {
            date = new Date(date);

            return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        },
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
