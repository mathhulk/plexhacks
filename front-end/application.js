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

let app = new Vue({
	el: "#application"
});
