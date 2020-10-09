<template>
    <div id="application">
        <nav class="navigation-bar">
            <div class="container">
                <!--
                <router-link to="/" class="navigation-bar-brand">
                    <span class="important">polyglass.</span> political transparency.
                </router-link>
                -->

                <ul class="navigation-bar-menu ml-auto d-none d-lg-flex">
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

                <a class="icon-button ml-auto d-lg-none"
                   @click="openWindow( )">

                    <i class="material-icons">menu</i>

                </a>
            </div>
        </nav>

        <!-- Mobile navigation -->
        <div v-if="window" class="window">
            <nav class="navigation-bar mb-24px">
                <div class="container-fluid">

                    <h2 class="navigation-bar-title">Navigation</h2>

                    <a class="icon-button ml-auto d-lg-none"
                       @click="closeWindow( )">

                        <i class="material-icons">close</i>

                    </a>

                </div>
            </nav>

            <ul class="window-menu">
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

        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",

    data( ) {
        return {
            window: false
        };
    },

    methods: {
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

    watch: {
        $route( ) {
            if(this.window) this.closeWindow( );
        }
    }
}
</script>
