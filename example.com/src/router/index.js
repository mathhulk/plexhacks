import Vue from "vue";
import VueRouter from "vue-router";

import Explore from "../views/Explore.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Explore",
        component: Explore
    },
    {
        path: "/members",
        name: "Congress members",
        component: ( ) => import(/* webpackChunkName: "members" */ "../views/Members.vue")
    },
    {
        path: "/member/:identifier",
        props: true,
        component: ( ) => import(/* webpackChunkName: "member" */ "../views/Member.vue"),
        children: [
            {
                path: "/member/:identifier",
                name: "Congress member",
                props: true,
                component: ( ) => import(/* webpackChunkName: "member" */ "../views/Member/Roles.vue")
            },
            {
                path: "/member/:identifier/committees",
                name: "Congress member committees",
                props: true,
                component: ( ) => import(/* webpackChunkName: "member" */ "../views/Member/Committees.vue")
            }
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "active",
    routes: routes
});

export default router;
