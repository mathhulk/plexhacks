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

                        <a class="icon-button d-lg-none ml-24px"
                           @click="openWindow( )">

                            <i class="material-icons">more_vert</i>

                        </a>

                        <div class="d-none d-lg-block text-lg-right">
                            <div id="member-buttons" class="mb-24px">

                                <a class="button"
                                   :href="member.website">Website</a>

                                <a v-if="member.social_media.twitter"
                                   class="button ml-8px"
                                   :href="linkFromTwitter">Twitter</a>

                                <a v-if="member.social_media.facebook"
                                  class="button ml-8px"
                                  :href="linkFromFacebook">Facebook</a>

                                <a v-if="member.social_media.youtube"
                                   class="button ml-8px"
                                   :href="linkFromYouTube">YouTube</a>

                                <a class="button ml-8px"
                                   :href="member.role.contact.form">Contact form</a>

                            </div>

                            <div class="d-lg-flex justify-content-lg-end">

                                <!-- I hate empty tags -->
                                <div id="member-office" class="mr-16px">
                                    <h3 class="sub-heading">Office</h3>
                                    <p class="paragraph">{{ member.role.contact.office }}</p>
                                </div>

                                <div id="member-phone">
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
                            <a class="item-link">Votes</a>
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

            <!-- Mobile contact menu -->
            <div v-if="window" class="window">
                <nav class="navigation-bar mb-48px">
                    <div class="container-fluid">

                        <h2 class="navigation-bar-title">More information</h2>

                        <a class="icon-button ml-auto d-lg-none"
                           @click="closeWindow( )">

                            <i class="material-icons">close</i>

                        </a>

                    </div>
                </nav>

                <div class="container-fluid">

                    <div class="badge"
                         :class="classFromParty">{{ member.party }}</div>

                    <h1 class="heading mb-4px">{{ member.first_name + " " + member.last_name }}</h1>
                    <p class="paragraph mb-48px"><span class="important">{{ member.role.title }}</span> of <span class="important">{{ member.role.state }}</span></p>

                    <h3 class="sub-heading">Office</h3>
                    <p class="paragraph mb-24px">{{ member.role.contact.office }}</p>

                    <h3 class="sub-heading">Phone</h3>
                    <p class="paragraph mb-48px">{{ member.role.contact.phone }}</p>

                </div>

                <ul class="window-menu">

                    <li class="menu-item">

                        <a class="item-link active"
                           :href="member.website">

                            Website

                            <i class="material-icons ml-auto">public</i>

                        </a>

                    </li>

                    <li class="menu-item"
                        v-if="member.social_media.twitter">

                        <a class="item-link"
                           :href="linkFromTwitter">Twitter</a>

                    </li>

                    <li class="menu-item"
                        v-if="member.social_media.facebook">

                        <a class="item-link"
                           :href="linkFromFacebook">Facebook</a>

                    </li>

                    <li class="menu-item"
                        v-if="member.social_media.youtube">

                        <a class="item-link"
                           :href="linkFromYouTube">YouTube</a>

                    </li>

                    <li class="menu-item">

                        <a class="item-link mb-48px"
                           :href="member.role.contact.form">Contact form</a>

                    </li>

                </ul>
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

            error: false,

            window: false
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
        },

        openWindow( ) {
            const body = document.getElementsByTagName("body")[0];

            body.style.overflow = "hidden";
            body.style.height = "100%";

            this.window = true;
        },

        closeWindow( ) {
            const body = document.getElementsByTagName("body")[0];

            body.style.overflow = "auto";
            body.style.height = "auto";

            this.window = false;
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
