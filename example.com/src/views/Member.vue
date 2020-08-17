<template>
    <div id="member">
        <template v-if="member">
            <div class="header">
                <div class="container">

                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <div class="badge"
                                 :class="classFromParty">{{ member.party }}</div>

                            <h1 class="heading mb-4px">{{ member.first_name + " " + member.last_name }}</h1>
                            <p class="paragraph"><span class="important">{{ member.role.title }}</span> of <span class="important">{{ member.role.state }}</span></p>
                        </div>

                        <div class="text-right">
                            <div class="d-flex mb-24px">

                                <a class="button"
                                   :href="member.website">Website</a>

                                <a v-if="member.social_media.twitter"
                                   class="button ml-8px" :href="linkFromTwitter">Twitter</a>

                                <a v-if="member.social_media.facebook"
                                  class="button ml-8px" :href="linkFromFacebook">Facebook</a>

                                <a v-if="member.social_media.youtube"
                                   class="button ml-8px" :href="linkFromYouTube">YouTube</a>

                                <a class="button ml-8px"
                                   :href="member.role.contact.form">Contact form</a>

                            </div>

                            <div class="d-flex justify-content-end">
                                <div>
                                    <h3 class="sub-heading">Office</h3>
                                    <p class="paragraph">{{ member.role.contact.office }}</p>
                                </div>

                                <div class="ml-24px">
                                    <h3 class="sub-heading">Phone</h3>
                                    <p class="paragraph">{{ member.role.contact.phone }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav class="navigation-bar navigation-bar-inline mb-24px">
                <div class="container">
                    <ul class="navigation-bar-menu">
                        <li class="menu-item">

                            <router-link :to="{ name: 'Congress member', params: { identifier: this.member.identifier } }"
                                         class="item-link"
                                         exact>Roles</router-link>

                        </li>

                        <li class="menu-item">
                            <a class="item-link">Recent votes</a>
                       </li>

                       <li class="menu-item">

                           <router-link :to="{ name: 'Congress member committees', params: { identifier: this.member.identifier } }"
                                        class="item-link"
                                        exact>Committees</router-link>

                        </li>
                    </ul>
                </div>
            </nav>

            <div class="container">
                <router-view />
            </div>
        </template>
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

            error: false
        };
    },

    methods: {
        render( ) {
            axios.get("http://localhost:8450/member/" + this.identifier).then(response => {
                const { data } = response;

                // Prevent users from viewing Congress members out of office
                if( ! data.member || data.member.in_office === false ) {
                    this.error = true;

                    return;
                }

                this.member = data.member;
            });
        }
    },

    computed: {
        classFromParty( ) {
            return "badge-" + this.member.party.toLowerCase( );
        },

        linkFromTwitter( ) {
            return "https://twitter.com/" + this.member.social_media.twitter;
        },

        linkFromFacebook( ) {
            return "https://facebook.com/" + this.member.social_media.facebook;
        },

        linkFromYouTube( ) {
            return "https://youtube.com/c/" + this.member.social_media.youtube;
        }
    },

    mounted( ) {
        this.render( );
    },

    watch: {
        // Required to render new Congress member
        $route( ) {
            // Progress bar implementation possible
            this.member = null;
            this.error = false;

            this.render( );
        }
    }
}
</script>
