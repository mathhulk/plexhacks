const states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];

let eventBus = new Vue( );

Vue.component("core", {
	template: `
	<div id="website">
		<nav class="navbar">
		  	<div class="container">
		    	<a class="navbar-brand" href="#">polyglass.</a>

		      	<ul class="navbar-nav ml-auto">
			        <li class="nav-item"
					 	v-for="(page, identifier) in navigationPages"
						@click="setCurrentPage(identifier)">

			          	<a class="nav-link"
						   :class="{ active: currentPage === identifier }"
						   href="#">
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
				movements: {
					name: "Movements",
					component: "page-movements"
				},

				bills: {
					name: "Bills",
					component: "page-bills"
				},

				politicians: {
					name: "Politicians",
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

			currentPage: "movements",
			currentBill: null,
			currentPolitician: null
		};
	},

	methods: {
		setCurrentPage(page) {
			this.currentPage = page;
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

Vue.component("page-movements", {
	template: `
	<div id="page-movements">

	</div>
	`,

	data( ) {
		return {

		};
	}
});

Vue.component("page-bills", {
	template: `
	<div id="page-bills">
		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="bill in bills">
					<div class="board"
					 	 @click="openBill(bill.identifier)">
						<h2 class="title">{{ bill.number }}</h2>
						<p class="description">Latest major action on <span class="important">{{ bill.latest_major_action_date }}</span></p>

						<p class="explanation">{{ bill.title }}</p>

						<h3 class="heading">Date introduced</h3>
						<p class="explanation">{{ bill.introduced_at }}</p>
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

Vue.component("page-politicians", {
	template: `
	<div id="page-politicians">
		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="politician in currentPoliticians">
					<div class="board"
					 	  @click="openPolitician(politician.identifier)">
						<div class="party"
							 :class="getPartyClass(politician.party)">{{ getPartyName(politician.party) }}</div>
						<h2 class="title">{{ politician.name }}</h2>
						<p class="description"><span class="important">{{ politician.role }}</span> of <span class="important">{{ politician.state }}</span></p>
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
			return "party-" + party;
		},

		getPartyName(party) {
			return party.charAt(0).toUpperCase( ) + party.slice(1);
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
						state: states[ states.findIndex(state => state.abbreviation === member.state) ].name
					};

					switch(member.party) {
						case "R":
							politician.party = "republican";

							break;

						case "D":
							politician.party = "democrat";

							break;

						default:
							politician.party = "other"
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
				<h1 class="title">{{ currentTitle }}</h1>
				<p class="description">Introduced on <span class="important">{{ introduced_at }}</span></p>

				<template v-if="displayTitle">
					<h3 class="heading">Identifier</h3>
					<p class="explanation">{{ number }}</p>
				</template>

				<h3 class="heading">Title</h3>
				<p class="explanation">{{ title }}</p>

				<template v-if="summary && summary.length > 0">
					<h3 class="heading">Summary</h3>
					<p class="explanation">{{ summary }}</p>
				</template>
			</div>
		</div>

		<nav class="navbar navbar-inline">
			<div class="container">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link active">Votes</a>
					</li>

					<li class="nav-item">
						<a class="nav-link">Actions</a>
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
				<div class="party"
					 :class="partyClass">{{ partyName }}</div>
				<h1 class="title">{{ name }}</h1>
				<p class="description"><span class="important">{{ role }}</span> of <span class="important">{{ state }}</span></p>
			</div>
		</div>

		<nav class="navbar navbar-inline">
			<div class="container">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link active">Votes</a>
					</li>
				</ul>
			</div>
		</nav>

		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6"
					 v-for="vote in votes">
					<div class="board"
					 	 @click="openBill(vote.identifier)">
						<h2 class="title">{{ vote.number }}</h2>
						<p class="description"><span class="important">{{ vote.time }}</span> on <span class="important">{{ vote.date }}</span></p>

						<p v-if="vote.title" class="explanation">{{ vote.title }}</p>

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
			return "party-" + this.party;
		},

		partyName( ) {
			return this.party ? this.party.charAt(0).toUpperCase( ) + this.party.slice(1) : null;
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
			this.state = states[ states.findIndex(state => state.abbreviation === role.state) ].name;

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
