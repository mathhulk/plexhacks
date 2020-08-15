<template>
    <div id="page-member">
        <div v-if="member" class="header">
            <div class="container">
                <div class="d-flex flex-column flex-lg-row">
                    <div class="flex-grow-1">

                        <div class="badge"
                             :class="classFromParty">{{ member.party }}</div>

                        <h1 class="heading mb-4px">{{ member.first_name + " " + member.last_name }}</h1>
                        <p class="paragraph"><span class="important">{{ member.role.title }}</span> of <span class="important">{{ member.role.state }}</span></p>

                    </div>
                </div>
            </div>
        </div>

        <nav class="navigation-bar navigation-bar-inline mb-24px">
            <div class="container">
                <ul class="navigation-bar-menu">
                    <li class="menu-item">
                        <a class="item-link active">Roles</a>
                    </li>

                    <li class="menu-item">
                        <a class="item-link">Recent votes</a>
                    </li>

                    <li class="menu-item">
                        <a class="item-link">Sponsored legislation</a>
                    </li>

                    <li class="menu-item">
                        <a class="item-link">Committees</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container">
            <div class="row">

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Member",

    props: [ "identifier" ],

    data( ) {
        return {
            member: null,

            roles: null
        };
    },

    methods: {
        load( ) {
            axios.get("http://localhost:8450/members/" + this.identifier).then(response => {
                const { data } = response;

                console.log(data);

                this.member = data.member;
            });
        }
    },

    computed: {
        classFromParty( ) {
            return "badge-" + this.member.party.toLowerCase( );
        }
    },

    mounted( ) {
        this.load( );
    },

    watch: {
        $route( ) {
            this.load( );
        }
    }
}
</script>
