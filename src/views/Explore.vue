<template>
    <div id="explore">
        <div id="splash">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3">
                        <h1 class="splash-title">Explore legislation passed through Congress and reach out to Congress members</h1>

                        <p class="explore-description"><span class="important">People are fighting for their freedom</span> but the media continues to merge journalism with entertainment and politics to push a specific political agenda. <span class="important">We need political transparency now.</span></p>
                    </div>
                </div>

                <div class="splash-buttons">
                    <!-- Improve smooth scroll? -->
                    <a class="button" @click="scrollToFeatures( )">Learn more</a>
                    <a class="button" @click="scrollToExample( )">Explore an example</a>
                </div>
            </div>
        </div>

        <div class="container">
            <div id="features">
                <div class="row align-items-center">
                    <div class="col-lg-6 text-center">
                        <img src="images/engage.png">
                    </div>

                    <div class="col-lg-6">
                        <div class="feature">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="rgb(255, 165, 0)" fill-opacity="0.1" d="M36.7,-52.8C45.2,-44.4,48,-30.5,47.6,-18.5C47.3,-6.6,43.8,3.2,42.9,16.4C42.1,29.6,43.8,46.1,37,57.5C30.3,69,15.2,75.3,-0.7,76.3C-16.6,77.2,-33.1,72.8,-46.1,63.4C-59,54,-68.4,39.6,-75.4,23.3C-82.4,6.9,-87.1,-11.4,-77.8,-20.8C-68.6,-30.1,-45.5,-30.5,-30.2,-36.6C-14.9,-42.8,-7.5,-54.7,3.3,-59.3C14.1,-63.9,28.3,-61.2,36.7,-52.8Z" transform="translate(100 100)" />
                            </svg>

                            <h2 class="heading mb-16px">Engage</h2>

                            <p class="explore-description"><span class="important">Find social media profiles and other contact information for every Congress member on their profile.</span> We encourage everyone to contact their local Congress members with questions and concerns regarding legislation and social justice issues.</p>
                        </div>
                    </div>
                </div>

                <div class="row align-items-center flex-column-reverse flex-lg-row">
                    <div class="col-lg-6">
                        <div class="feature">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="rgb(255, 165, 0)" fill-opacity="0.1" d="M36.7,-52.8C45.2,-44.4,48,-30.5,47.6,-18.5C47.3,-6.6,43.8,3.2,42.9,16.4C42.1,29.6,43.8,46.1,37,57.5C30.3,69,15.2,75.3,-0.7,76.3C-16.6,77.2,-33.1,72.8,-46.1,63.4C-59,54,-68.4,39.6,-75.4,23.3C-82.4,6.9,-87.1,-11.4,-77.8,-20.8C-68.6,-30.1,-45.5,-30.5,-30.2,-36.6C-14.9,-42.8,-7.5,-54.7,3.3,-59.3C14.1,-63.9,28.3,-61.2,36.7,-52.8Z" transform="translate(100 100)" />
                            </svg>

                            <h2 class="heading mb-16px">Compare</h2>

                            <p class="explore-description"><span class="important">Recent votes from Congress members are displayed on their profile</span> and <span class="important">every bill contains a list of Congress members who voted on the bill and their vote.</span> We encourage everyone to educate themselves on legislation and make informed decisions when supporting Congress members.</p>
                        </div>
                    </div>

                    <div class="col-lg-6 text-center">
                        <img src="images/compare.png">
                    </div>
                </div>
            </div>

            <div id="local">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="rgb(255, 165, 0)" fill-opacity="0.1" d="M53.2,-67.6C68.6,-62,80.5,-46,80.9,-29.8C81.2,-13.6,70.2,2.8,60.5,15.7C50.9,28.7,42.7,38.1,32.9,46.7C23.1,55.2,11.5,62.7,-0.7,63.7C-13,64.7,-25.9,59.1,-37.8,51.3C-49.7,43.4,-60.6,33.3,-66.5,20.4C-72.4,7.4,-73.4,-8.4,-69.4,-23.2C-65.4,-37.9,-56.5,-51.7,-44.1,-58.3C-31.7,-64.8,-15.9,-64.1,1.5,-66.2C18.9,-68.3,37.8,-73.2,53.2,-67.6Z" transform="translate(100 100)" />
                </svg>

                <h2 class="heading mb-8px">Explore an example</h2>

                <p class="paragraph mb-16px" v-html="example" />

                <router-link to="/members" class="button">Congress members</router-link>
            </div>

            <div class="row">

                <div class="col-xl-3 col-lg-4 col-md-6"
                     v-for="member in members"
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

<style lang="scss">
#explore p.explore-description {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    line-height: 1.25;

    .important {
        font-weight: 500;
        color: black;
    }
}

#splash {
    padding-top: 64px;
    padding-bottom: 64px;

    background-color: rgba(255, 165, 0, 0.1);

    h1.splash-title {
        font-weight: 900;
        font-size: 24px;
        line-height: 1.25;
        color: rgb(255, 165, 0);

        text-align: center;

        margin-bottom: 16px;
    }

    p.explore-description {
        text-align: center;

        margin-bottom: 32px;
    }

    .splash-buttons {
        display: flex;

        @media (max-width: 992px) {
            flex-direction: column;
            align-items: center;

            .button:first-child {
                margin-bottom: 8px;
            }
        }

        @media (min-width: 992px) {
            justify-content: center;

            .button:first-child {
                margin-right: 8px;
            }
        }
    }
}

#local {
    position: relative;
    margin-bottom: 64px;
    
    text-align: center;

    svg {
        position: absolute;

        width: 554px;
        max-width: 100%;

        z-index: -1;

        left: 50%;
        top: 80%;

        transform: translate(-50%, -50%);
    }
}

#features {
	padding-top: 64px;
	padding-bottom: 64px;

	img {
		max-width: 100%;
	}

	.feature {
		margin-top: 64px;
		margin-bottom: 64px;

		position: relative;

		svg {
			position: absolute;

			width: 128px;

			z-index: -1;

			left: -48px;
			top: -48px;
		}
	}
}
</style>

<script>
import axios from "axios";

export default {
    name: "Explore",

    data( ) {
        return {
            members: null,
            state: null
        };
    },

    computed: {
        example( ) {
            if(this.members && this.state) return `Browse the <span class="important">` + this.members.length + `</span> Congress members from <span class="important">` + this.state + `</span>.`;

            return `Browse Congress members from any state.`;
        }
    },

    methods: {
        getClassFromParty(party) {
            return "badge-" + party.toLowerCase( );
        },

        scrollToFeatures( ) {
            window.scrollTo({ top: document.querySelector("#features").offsetTop, behavior: "smooth" });
        },

        scrollToExample( ) {
            window.scrollTo({ top: document.querySelector("#example").offsetTop - 64, behavior: "smooth" });
        }
    },

    mounted( ) {
        axios.get("http://localhost:8450/state").then(response => {
            const { data } = response;

            this.state = data.state;

            this.members = data.members.sort(function(firstMember, secondMember) {
                return firstMember.last_name < secondMember.last_name ? -1 : (firstMember.last_name > secondMember.last_name ? 1 : 0);
            });
        });
    }
}
</script>
