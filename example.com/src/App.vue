<template>
	<div id="application">
		<nav class="navigation-bar">
			<div class="container">
				<router-link to="/" class="navigation-bar-brand">
					<span class="important">polyglass.</span> political transparency.
				</router-link>

				<ul class="navigation-bar-menu ml-auto">
					<li class="menu-item">
						<router-link to="/" class="item-link" exact>Explore</router-link>
					</li>

					<li class="menu-item">
						<router-link to="/legislation" class="item-link">Legislation</router-link>
					</li>

					<li class="menu-item">
						<router-link to="/members" class="item-link">Congress members</router-link>
					</li>

					<li class="menu-item">
						<a class="item-link disabled">Organizations</a>
					</li>
				</ul>
			</div>
		</nav>

		<router-view />
	</div>
</template>
