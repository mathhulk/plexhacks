const API_ROOT = "http://localhost:8450";

let eventBus = new Vue( );

Vue.component("core", {
	template: `
	<div id="website">
		<nav class="navigation-bar">
		  	<div class="container">
		    	<a class="navigation-bar-brand"
				   @click="openExplorePage( )"><span class="important">polyglass.</span> political transparency.</a>

		      	<ul class="navigation-bar-menu ml-auto">
			        <li class="menu-item"
					 	v-for="(page, identifier) in navigationPages"
						@click="setCurrentPage(identifier)">

			          	<a class="item-link"
						   :class="{ active: currentPage === identifier }">
						   {{ page.name }}</a>
			        </li>
		      	</ul>
		  	</div>
		</nav>

		<component :is="pages[currentPage].component"
				   :bill="currentBill"
				   :member="currentMember" />
	</div>
	`,

	data( ) {
		return {
			pages: {
				explore: {
					name: "Explore",
					component: "page-explore"
				},

				legislation: {
					name: "Legislation",
					component: "page-legislation"
				},

				members: {
					name: "Congress members",
					component: "page-members"
				},

				bill: {
					name: false,
					component: "page-bill"
				},

				member: {
					name: false,
					component: "page-member"
				}
			},

			currentPage: "explore",

			currentBill: null,
			currentMember: null
		};
	},

	methods: {
		setCurrentPage(page) {
			this.currentPage = page;
		},

		openExplorePage( ) {
			this.currentPage = "explore";
		},

		openBill(bill) {
			this.currentBill = bill;
			this.setCurrentPage("bill");
		},

		openMember(member) {
			this.currentMember = member;
			this.setCurrentPage("member");
		}
	},

	mounted( ) {
		eventBus.$on("open-bill", (bill) => {
			this.openBill(bill);
		});

		eventBus.$on("open-member", (member) => {
			this.openMember(member);
		});

		eventBus.$on("set-current-page", (page) => {
			this.setCurrentPage(page);
		});
	},

	computed: {
		// Exclude bill and politician pages from navigation
		navigationPages( ) {
		    let navigationPages = { };

			for(const pageIndex in this.pages) {
				const page = this.pages[pageIndex];

				if(page.name === false) continue;

				navigationPages[pageIndex] = page;
			}

			return navigationPages;
		}
	}
});

Vue.component("page-explore", {
	template: `
	<div id="page-explore">
		<div id="splash">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 offset-lg-3">
						<h1 class="splash-title">Explore legislation passed through Congress and reach out to Congress members</h1>

						<p class="splash-description"><span class="important">People are fighting for their freedom</span> but the media continues to merge journalism with entertainment and politics to push a specific political agenda. <span class="important">We need political transparency now.</span></p>
					</div>
				</div>

				<div class="splash-buttons">
					<a class="button" @click="scrollToFeatures( )">Learn more</a><!--

					Removes whitespace

					--><a class="button" @click="scrollToExample( )">Explore an example</a>
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

							<h2 class="feature-title">Engage</h2>

							<p class="feature-description"><span class="important">Find social media profiles and other contact information for every Congress member on their profile.</span> We encourage everyone to contact their local Congress members with questions and concerns regarding legislation and social justice issues.</p>
						</div>
					</div>
				</div>

				<div class="row align-items-center flex-column-reverse flex-lg-row">
					<div class="col-lg-6">
						<div class="feature">
							<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  								<path fill="rgb(255, 165, 0)" fill-opacity="0.1" d="M36.7,-52.8C45.2,-44.4,48,-30.5,47.6,-18.5C47.3,-6.6,43.8,3.2,42.9,16.4C42.1,29.6,43.8,46.1,37,57.5C30.3,69,15.2,75.3,-0.7,76.3C-16.6,77.2,-33.1,72.8,-46.1,63.4C-59,54,-68.4,39.6,-75.4,23.3C-82.4,6.9,-87.1,-11.4,-77.8,-20.8C-68.6,-30.1,-45.5,-30.5,-30.2,-36.6C-14.9,-42.8,-7.5,-54.7,3.3,-59.3C14.1,-63.9,28.3,-61.2,36.7,-52.8Z" transform="translate(100 100)" />
							</svg>

							<h2 class="feature-title">Compare</h2>

							<p class="feature-description"><span class="important">Recent votes from Congress members are displayed on their profile</span> and <span class="important">every bill contains a list of Congress members who voted on the bill and their vote.</span> We encourage everyone to educate themselves on legislation and make informed decisions when supporting Congress members.</p>
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

				<p class="paragraph mb-16px"
                   v-html="example" />

				<a class="button" @click="openPoliticiansPage( )">Congress members</a>
			</div>

			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="member in members">
					<div class="card card-hover mb-24px"
						 @click="openPolitician(member.identifier)">
						<div class="badge"
							 :class="getPartyClass(member.party)">{{ member.party }}</div>
						<h2 class="heading">{{ member.first_name + " " + member.last_name }}</h2>
						<p class="paragraph"><span class="important">{{ member.title }}</span> of <span class="important">{{ member.state }}</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,

	data( ) {
		return {
			members: null,
            state: null
		};
	},

    computed: {
        example( ) {
            if(this.state && this.members) return `Browse the <span class="important">` + this.members.length + `</span> Congress members from <span class="important">` + this.state + `</span>.`;

            return "Browse Congress members from any state.";
        }
    },

	methods: {
		getPartyClass(party) {
			return "badge-" + party.toLowerCase( );
		},

		openMembers( ) {
			eventBus.$emit("set-current-page", "members");
		},

		scrollToFeatures( ) {
			const top = $("#features").offset( ).top;

			window.scroll({
			  	top: top,
			  	left: 0,
			  	behavior: "smooth"
			});
		},

		scrollToExample( ) {
			const top = $("#local").offset( ).top - 64;

			window.scroll({
			  	top: top,
			  	left: 0,
			  	behavior: "smooth"
			});
		},

		openMember(politician) {
			eventBus.$emit("open-members", politician);
		}
	},

	mounted( ) {
		$.get(API_ROOT + "/state", response => {
            this.state = response.state;

            this.members = response.members.sort(function(firstMember, secondMember) {
                return firstMember.last_name < secondMember.last_name ? -1 : (firstMember.last_name > secondMember.last_name ? 1 : 0);
            });
		});
	}
});

Vue.component("page-bills", {
	template: `
	<div id="page-bills">
		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="bill in bills">
					<div class="card card-hover mb-24px"
					 	 @click="openBill(bill.identifier)">
						<h2 class="heading mb-4px">{{ bill.number }}</h2>
						<p class="paragraph mb-24px">Latest major action on <span class="important">{{ bill.latest_major_action_date }}</span></p>

						<p class="paragraph mb-24px">{{ bill.title }}</p>

						<h3 class="sub-heading mb-4px">Date introduced</h3>
						<p class="paragraph">{{ bill.introduced_at }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,

	data( ) {
		return {
			bills: [ ]
		};
	},

	methods: {
		openBill(bill) {
			eventBus.$emit("open-bill", bill);
		}
	},

	mounted( ) {
		const billsRequest = {
			url: "https://api.propublica.org/congress/v1/116/both/bills/passed.json",
			method: "GET",
			headers: {
				"X-API-KEY": "xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY"
			}
		};

		$.ajax(billsRequest).done(response => {
			const passedBills = response.results[0].bills;

			let bills = [ ];

			for(const passedBill of passedBills) {
				console.log(passedBill)

				const bill = {
					identifier: passedBill.bill_id,
					number: passedBill.number,
					title: passedBill.title,
					introduced_at: passedBill.introduced_date,
					latest_major_action_date: passedBill.latest_major_action_date
				};

				bills.push(bill);
			}

			this.bills = bills.sort( (firstBill, secondBill) => Date.parse(secondBill.latest_major_action_date) - Date.parse(firstBill.latest_major_action_date) );
		});
	}
});

Vue.component("page-members", {
	template: `
	<div id="page-members">
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
                                 :value="state">{{ state }}</option>
                     </select>
                 </div>
            </div>

			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="member in currentMembers"
                     :key="member.identifier">
					<div class="card card-hover mb-24px"
					 	  @click="openMember(member.identifier)">
						<div class="badge"
							 :class="getPartyClass(member.party)">{{ member.party }}</div>
						<h2 class="heading mb-4px">{{ member.first_name + " " + member.last_name }}</h2>
						<p class="paragraph"><span class="important">{{ member.title }}</span> of <span class="important">{{ member.state }}</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,

	data( ) {
		return {
			members: null,
            currentMembers: null,

            states: [
                "Alabama", "Alaska", "Arizona", "Arkansas", "California",
                "Colorado", "Connecticut", "Delaware", "District of Columbia",
                "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
                "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
                "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
                "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
                "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
                "Texas", "Utah", "Vermont", "Virginia", "Washington",
                "West Virginia", "Wisconsin", "Wyoming"
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
		getPartyClass(party) {
			return "badge-" + party.toLowerCase( );
		},

		openMember(member) {
			eventBus.$emit("open-member", member);
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
		$.get(API_ROOT + "/members", response => {
			this.members = response.members;
            this.currentMembers = this.members;
        });
	}
});

Vue.component("page-bill", {
	props: [ "bill" ],

	template: `
	<div id="page-bill">
		<div class="header">
			<div class="container">
				<h1 class="heading mb-4px">{{ currentTitle }}</h1>
				<p class="paragraph mb-24px">Introduced on <span class="important">{{ introduced_at }}</span></p>

				<template v-if="displayTitle">
					<h3 class="sub-heading mb-4px">Identifier</h3>
					<p class="paragraph mb-24px">{{ number }}</p>
				</template>

				<h3 class="sub-heading mb-4px">Title</h3>
				<p class="paragraph">{{ title }}</p>

				<template v-if="summary && summary.length > 0">
					<h3 class="sub-heading mb-4px mt-24px">Summary</h3>
					<p class="paragraph">{{ summary }}</p>
				</template>
			</div>
		</div>

		<nav class="navigation-bar navigation-bar-inline">
			<div class="container">
				<ul class="navigation-bar-menu">
					<li class="menu-item">
						<a class="item-link active">Votes</a>
					</li>

					<li class="menu-item">
						<a class="item-link">Actions</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
	`,

	data( ) {
		return {
			identifier: null,
			number: null,
			title: null,
			short_title: null,
			congress_url: null,
			introduced_at: null,
			summary: null
		};
	},

	computed: {
		displayTitle( ) {
			return this.short_title !== this.title;
		},

		currentTitle( ) {
			return this.displayTitle ? this.short_title : this.number;
		}
	},

	mounted( ) {
		const splitBill = this.bill.split("-");

		const billRequest = {
			url: "https://api.propublica.org/congress/v1/" + splitBill[1] + "/bills/" + splitBill[0] + ".json",
			method: "GET",
			headers: {
				"X-API-KEY": "xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY"
			}
		};

		$.ajax(billRequest).done(response => {
			const result = response.results[0];

			this.identifier = result.bill_id;
			this.number = result.number;
			this.title = result.title;
			this.short_title = result.short_title;
			this.congress_url = result.congressdotgov_url;
			this.introduced_at = result.introduced_date;
			this.summary = result.summary;
		});
	}
});

Vue.component("page-politician", {
	props: [ "politician" ],

	template: `
	<div id="page-politician">
		<div class="header">
			<div class="container">
				<div class="header-split">
					<div class="header-left">
						<div class="badge"
							 :class="partyClass">{{ partyName }}</div>
						<h1 class="heading mb-4px">{{ name }}</h1>
						<p class="paragraph"><span class="important">{{ role }}</span> of <span class="important">{{ state }}</span></p>
					</div>

					<a class="button" target="_blank" :href="url">Website</a>
					<a v-if="twitter" target="_blank" class="button" :href="url">Twitter</a>
					<a v-if="facebook" target="_blank" class="button" :href="facebook_url">Facebook</a>
					<a v-if="youtube" target="_blank" class="button" :href="youtube_url">YouTube</a>
				</div>
			</div>
		</div>

		<nav class="navigation-bar navigation-bar-inline mb-24px">
			<div class="container">
				<ul class="navigation-bar-menu">
					<li class="menu-item">
						<a class="item-link active">Votes</a>
					</li>
				</ul>
			</div>
		</nav>

		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="vote in votes">
					<div class="card card-hover"
					 	 @click="openBill(vote.identifier)">
						<h2 class="heading mb-4px">{{ vote.number }}</h2>
						<p class="paragraph mb-24px"><span class="important">{{ vote.time }}</span> on <span class="important">{{ vote.date }}</span></p>

						<p v-if="vote.title" class="paragraph mb-24px">{{ vote.title }}</p>

						<div class="vote" :class="getVoteClass(vote.for)">
							<p class="vote-position">Voted {{ getVotePosition(vote.for) }}</p>

							<i class="material-icons">{{ getVoteIcon(vote.for) }}</i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,

	data( ) {
		return {
			name: null,
			party: null,
			state: null,
			role: null,

			url: null,
			twitter: null,
			facebook: null,
			youtube: null,

			votes: null
		};
	},

	methods: {
		getVoteIcon(position) {
			return "thumb_" + (position ? "up" : "down");
		},

		getVoteClass(position) {
			return "vote-" + (position ? "for" : "against");
		},

		getVotePosition(position) {
			return position ? "for" : "against";
		},

		openBill(bill) {
			eventBus.$emit("open-bill", bill);
		}
	},

	computed: {
		partyClass( ) {
			return "badge-" + this.party;
		},

		partyName( ) {
			return this.party ? this.party.charAt(0).toUpperCase( ) + this.party.slice(1) : null;
		},

		twitter_url( ) {
			return "https://twitter.com/" + this.twitter;
		},

		facebook_url( ) {
			return "https://facebook.com/" + this.facebook;
		},

		youtube_url( ) {
			return "https://youtube.com/c/" + this.youtube;
		}
	},

	mounted( ) {
		const memberRequest = {
			url: "https://api.propublica.org/congress/v1/members/" + this.politician + ".json",
			method: "GET",
			headers: {
				"X-API-KEY": "xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY"
			}
		};

		$.ajax(memberRequest).done(response => {
			const result = response.results[0];
			const role = result.roles[0];

			console.log(result);

			this.name = result.first_name + " " + result.last_name;
			this.role = role.title;
			this.state = states[ states.findIndex(state => state.abbreviation === role.state) ].name;

			this.url = result.url;
			this.twitter = result.twitter_account;
			this.facebook = result.facebook_account;
			this.youtube = result.youtube_account;

			switch(result.current_party) {
				case "R":
					this.party = "republican";

					break;

				case "D":
					this.party = "democrat";

					break;

				default:
					this.party = "other"
			}

			const votesRequest = {
				url: "https://api.propublica.org/congress/v1/members/" + this.politician + "/votes.json",
				method: "GET",
				headers: {
					"X-API-KEY": "xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY"
				}
			};

			$.ajax(votesRequest).done(response => {
				const votes = response.results[0].votes;

				const bills = [ ];

				for(const vote of votes) {
					if( ! vote.bill.title ) continue;

					const bill = {
						identifier: vote.bill.bill_id,
						number: vote.bill.number,
						title: vote.description,
						date: vote.date,
						time: vote.time,
						for: vote.position === "Yes"
					};

					bills.push(bill);
				}

				this.votes = bills.sort( (firstBill, secondBill) => Date.parse(secondBill.time + " " + secondBill.date) - Date.parse(firstBill.time + " " + firstBill.date) );
			});
		});
	}
});

let app = new Vue({
	el: "#application"
});
