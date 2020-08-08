Vue.component("website", {
	template: `
	<div id="website">
		<nav class="navbar">
		  	<div class="container-fluid">
		    	<a class="navbar-brand" href="#">polyglass.</a>

		      	<ul class="navbar-nav ml-auto">
			        <li class="nav-item">
			          	<a class="nav-link active" href="#">Recent</a>
			        </li>

			        <li class="nav-item">
			          	<a class="nav-link" href="#">Bills</a>
			        </li>

			        <li class="nav-item">
			          	<a class="nav-link">Politicians</a>
			        </li>
		      	</ul>
		  	</div>
		</nav>
	</div>
	`
})

let app = new Vue({
	el: "#application"
});
