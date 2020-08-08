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
				recent: {
					name: "Recent",
					component: "page-recent"
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

			currentPage: "recent",
			currentBill: null,
			currentPolitician: null
		};
	},

	methods: {
		setCurrentPage(page) {
			if(this.pages[page].name) {
				// Prevent incorrect data sharing between components
				this.currentBill = null;
				this.currentPolitician = null;
			}

			this.currentPage = page;
		},

		openBill(bill) {
			// Prevent incorrect data sharing between components
			this.currentPolitician = null;

			this.setCurrentPage("bill");
			this.currentBill = bill;
		},

		openPolitician(politician) {
			// Prevent incorrect data sharing between components
			this.currentBill = null;

			this.setCurrentPage("politician");
			this.currentPolitician = politician;
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

Vue.component("page-recent", {
	template: `
	<div id="page-recent">
		<div class="container">
			<div class="row">
				<div class="col-lg-6 col-xl-4"
					 v-for="bill in bills">

					<div class="bill" @click="openBill(bill.identifier)">
						<h2 class="bill-name">{{ bill.name }}</h2>
						<p class="bill-description"><span class="important">{{ bill.root }}</span> introduced on <span class="important">{{ bill.introduced_at }}</span></p>

						<div class="bill-votes">
							<div class="votes-for">
								<p class="for-amount">{{ bill.votes.for }} votes for</p>

								<i class="material-icons">thumb_up</i>
							</div>

							<div class="votes-against">
								<i class="material-icons">thumb_down</i>

								<p class="against-amount">{{ bill.votes.against }} votes against</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,

	methods: {
		openBill(bill) {
			eventBus.$emit("open-bill", bill);
		}
	},

	data( ) {
		return {
			bills: [
				{
					identifier: 0,

					name: "Great American Outdoors Act",
					root: "H.R.1957",
					introduced_at: "3/28/2019",

					votes: {
						for: 254,
						against: 132
					}
				}
			]
		};
	}
});

Vue.component("page-bills", {

});

Vue.component("page-politicians", {

});

Vue.component("page-bill", {
	props: [ "bill" ],

	template: `

	`,

	watch: {
		bill( ) {
			if( ! bill ) return;

			// Load bill data
		}
	}
});

Vue.component("page-politician", {
	props: [ "politician" ],

	template: `

	`,

	watch: {
		politician( ) {
			if( ! politician ) return;

			// Load politician data
		}
	}
});

let app = new Vue({
	el: "#application"
});
