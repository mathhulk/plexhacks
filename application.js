const states = {
	"AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
	"CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia", "FL": "Florida",
	"GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", 
	"IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine",
	"MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi",
	"MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", 
	"NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota",
	"OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island",
	"SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah",
	"VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin",
	"WY": "Wyoming", "PR": "Puerto Rico", "GU": "Guam", "AS": "American Samoa", "VI": "U.S. Virgin Islands",
	"MP": "Northern Mariana Islands"
};

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
				   :politician="currentPolitician" />
	</div>
	`,

	data( ) {
		return {
			pages: {
				explore: {
					name: "Explore",
					component: "page-explore"
				},

				bills: {
					name: "Legislation",
					component: "page-bills"
				},

				politicians: {
					name: "Congress members",
					component: "page-politicians"
				},

				bill: {
					name: false,
					component: "page-bill"
				},

				politician: {
					name: false,
					component: "page-politician"
				}
			},

			currentPage: "explore",
			currentBill: null,
			currentPolitician: null
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

		openPolitician(politician) {
			this.currentPolitician = politician;
			this.setCurrentPage("politician");
		}
	},

	mounted( ) {
		eventBus.$on("open-bill", (bill) => {
			this.openBill(bill);
		});

		eventBus.$on("open-politician", (politician) => {
			this.openPolitician(politician);
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
					<div class="col-lg-6 offset-md-3">
						<h1 class="splash-title">Explore legislation passed through Congress and reach out to Congress members</h1>

						<p class="splash-description"><span class="important">People are fighting for their freedom.</span> But the media continues to merge journalism with entertainment and politics to push a specific political agenda. <span class="important">We need political transparency now.</span></p>
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
				<div class="row">
					<div class="col-lg-6 offset-md-6">
						<div class="feature">
							<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  								<path fill="rgb(255, 165, 0)" fill-opacity="0.1" d="M36.7,-52.8C45.2,-44.4,48,-30.5,47.6,-18.5C47.3,-6.6,43.8,3.2,42.9,16.4C42.1,29.6,43.8,46.1,37,57.5C30.3,69,15.2,75.3,-0.7,76.3C-16.6,77.2,-33.1,72.8,-46.1,63.4C-59,54,-68.4,39.6,-75.4,23.3C-82.4,6.9,-87.1,-11.4,-77.8,-20.8C-68.6,-30.1,-45.5,-30.5,-30.2,-36.6C-14.9,-42.8,-7.5,-54.7,3.3,-59.3C14.1,-63.9,28.3,-61.2,36.7,-52.8Z" transform="translate(100 100)" />
							</svg>

							<h2 class="feature-title">Support Congress members</h2>

							<p class="feature-description"><span class="important">Votes for and against legislation are available on Congress member profiles.</span> Track legislation through multiple actions and better understand where Congress members divide their attention.</p>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-6">
						<div class="feature">
							<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  								<path fill="rgb(255, 165, 0)" fill-opacity="0.1" d="M36.7,-52.8C45.2,-44.4,48,-30.5,47.6,-18.5C47.3,-6.6,43.8,3.2,42.9,16.4C42.1,29.6,43.8,46.1,37,57.5C30.3,69,15.2,75.3,-0.7,76.3C-16.6,77.2,-33.1,72.8,-46.1,63.4C-59,54,-68.4,39.6,-75.4,23.3C-82.4,6.9,-87.1,-11.4,-77.8,-20.8C-68.6,-30.1,-45.5,-30.5,-30.2,-36.6C-14.9,-42.8,-7.5,-54.7,3.3,-59.3C14.1,-63.9,28.3,-61.2,36.7,-52.8Z" transform="translate(100 100)" />
							</svg>

							<h2 class="feature-title">Engage local Congress members</h2>

							<p class="feature-description"><span class="important">Social media and website references are available on Congress member profiles.</span> Explore local Congress members below and reach out to them about social justice issues via their website or social media platforms.</p>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-6 offset-md-6">
						<div class="feature">
							<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  								<path fill="rgb(255, 165, 0)" fill-opacity="0.1" d="M36.7,-52.8C45.2,-44.4,48,-30.5,47.6,-18.5C47.3,-6.6,43.8,3.2,42.9,16.4C42.1,29.6,43.8,46.1,37,57.5C30.3,69,15.2,75.3,-0.7,76.3C-16.6,77.2,-33.1,72.8,-46.1,63.4C-59,54,-68.4,39.6,-75.4,23.3C-82.4,6.9,-87.1,-11.4,-77.8,-20.8C-68.6,-30.1,-45.5,-30.5,-30.2,-36.6C-14.9,-42.8,-7.5,-54.7,3.3,-59.3C14.1,-63.9,28.3,-61.2,36.7,-52.8Z" transform="translate(100 100)" />
							</svg>

							<h2 class="feature-title">Follow the legislation progress</h2>

							<p class="feature-description"><span class="important">View the current condition of legislation and where legislation must advance to next.</span> Legislation progress will be displayed on legislation profiles and includes: House of Representatives passage, Senate passage, enactment, and veto.</p>
						</div>
					</div>
				</div>
			</div>

			<div id="local">
				<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
					<path fill="rgb(255, 165, 0)" fill-opacity="0.1" d="M53.2,-67.6C68.6,-62,80.5,-46,80.9,-29.8C81.2,-13.6,70.2,2.8,60.5,15.7C50.9,28.7,42.7,38.1,32.9,46.7C23.1,55.2,11.5,62.7,-0.7,63.7C-13,64.7,-25.9,59.1,-37.8,51.3C-49.7,43.4,-60.6,33.3,-66.5,20.4C-72.4,7.4,-73.4,-8.4,-69.4,-23.2C-65.4,-37.9,-56.5,-51.7,-44.1,-58.3C-31.7,-64.8,-15.9,-64.1,1.5,-66.2C18.9,-68.3,37.8,-73.2,53.2,-67.6Z" transform="translate(100 100)" />
				</svg>

				<h2 class="heading mb-8px">Explore an example</h2>

				<p class="paragraph mb-16px">Browse the <span class="important">56</span> Congress members from <span class="important">California</span>.</p>

				<a class="button" @click="openPoliticiansPage( )">Congress members</a>
			</div>

			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="politician in politicians">
					<div class="card card-hover mb-24px"
						  @click="openPolitician(politician.identifier)">
						<div class="badge"
							 :class="getPartyClass(politician.party)">{{ politician.party }}</div>
						<h2 class="heading">{{ politician.name }}</h2>
						<p class="paragraph"><span class="important">{{ politician.role }}</span> of <span class="important">{{ politician.state }}</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,

	data( ) {
		return {
			politicians: null
		};
	},

	methods: {
		openPoliticiansPage( ) {
			eventBus.$emit("set-current-page", "politicians");
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

		// Redundant from politicians page
		getPartyClass(party) {
			return "badge-" + party.toLowerCase( );
		},

		openPolitician(politician) {
			eventBus.$emit("open-politician", politician);
		}
	},

	mounted( ) {
		// Redundant from politicians page
		let members = [ ];

		const senateRequest = {
			url: "https://api.propublica.org/congress/v1/116/senate/members.json?in_office=true",
			method: "GET",
			headers: {
				"X-API-KEY": "xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY"
			}
		};

		$.ajax(senateRequest).done(response => {
			members = members.concat( response.results[0].members );

			const houseRequest = {
				url: "https://api.propublica.org/congress/v1/116/house/members.json?in_office=true",
				method: "GET",
				headers: {
					"X-API-KEY": "xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY"
				}
			};

			$.ajax(houseRequest).done(response => {
				members = members.concat( response.results[0].members );

				let politicians = [ ];

				for(const member of members) {
					// Locate California Congress members
					if(member.state !== "CA") continue;

					const politician = {
						identifier: member.id,
						name: member.first_name + " " + member.last_name,
						role: member.title,
						state: states[member.state]
					};

					switch(member.party) {
						case "R":
							politician.party = "Republican";

							break;

						case "D":
							politician.party = "Democrat";

							break;

						default:
							politician.party = "Other"
					};

					politicians.push(politician);
				}

				this.politicians = politicians;
			});
		});
	}
});

Vue.component("page-bills", {
	template: `
	<div id="page-legislation">
		<div class="container">
			<p class="paragraph text-center mb-24px">This <span class="important">demonstration</span> only displays the 20 most recent bills passed by Congress.</p>
	
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

Vue.component("page-politicians", {
	template: `
	<div id="page-members">
		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="politician in currentPoliticians">
					<div class="card card-hover mb-24px"
					 	  @click="openPolitician(politician.identifier)">
						<div class="badge"
							 :class="getPartyClass(politician.party)">{{ politician.party }}</div>
						<h2 class="heading mb-4px">{{ politician.name }}</h2>
						<p class="paragraph"><span class="important">{{ politician.role }}</span> of <span class="important">{{ politician.state }}</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,

	data( ) {
		return {
			politicians: [ ],
			currentPoliticians: [ ]
		};
	},

	methods: {
		getPartyClass(party) {
			return "badge-" + party.toLowerCase( );
		},

		openPolitician(politician) {
			eventBus.$emit("open-politician", politician);
		}
	},

	mounted( ) {
		let members = [ ];

		const senateRequest = {
			url: "https://api.propublica.org/congress/v1/116/senate/members.json?in_office=true",
			method: "GET",
			headers: {
				"X-API-KEY": "xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY"
			}
		};

		$.ajax(senateRequest).done(response => {
			members = members.concat( response.results[0].members );

			const houseRequest = {
				url: "https://api.propublica.org/congress/v1/116/house/members.json?in_office=true",
				method: "GET",
				headers: {
					"X-API-KEY": "xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY"
				}
			};

			$.ajax(houseRequest).done(response => {
				members = members.concat( response.results[0].members );

				for(const member of members) {
					const politician = {
						identifier: member.id,
						name: member.first_name + " " + member.last_name,
						role: member.title,
						state: states[member.state]
					};

					switch(member.party) {
						case "R":
							politician.party = "Republican";

							break;

						case "D":
							politician.party = "Democrat";

							break;

						default:
							politician.party = "Other"
					};

					this.politicians.push(politician);
				}

				this.currentPoliticians = this.politicians;
			});
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

		<nav class="navigation-bar navigation-bar-inline mb-24px">
			<div class="container">
				<ul class="navigation-bar-menu">
					<li class="menu-item">
						<a class="item-link active">Votes</a>
					</li>
				</ul>
			</div>
		</nav>
		
		<p class="paragraph text-center">This <span class="important">demonstration</span> cannot display a summary of voting positions for this bill.</p>
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
	<div v-if="name" id="page-politician">
		<div class="header">
			<div class="container">
				<div class="header-split">
					<div class="header-left">
						<div class="badge"
							 :class="partyClass">{{ party }}</div>
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
		
		<p class="paragraph text-center mb-24px">This <span class="important">demonstration</span> does not include every vote.</p>

		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="vote in votes">
					<div class="card card-hover mb-24px"
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
			return "badge-" + this.party.toLowerCase( );
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

			this.name = result.first_name + " " + result.last_name;
			this.role = role.title;
			this.state = states[role.state];

			this.url = result.url;
			this.twitter = result.twitter_account;
			this.facebook = result.facebook_account;
			this.youtube = result.youtube_account;

			switch(result.current_party) {
				case "R":
					this.party = "Republican";

					break;

				case "D":
					this.party = "Democrat";

					break;

				default:
					this.party = "Other"
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