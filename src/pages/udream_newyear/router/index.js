import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";
Vue.use(VueRouter);

const home = () => import( /* webpackChunkName: "udream_newyear_2023" */ "@pages/udream_newyear/view/home");

const routes = [{
		path: "/",
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		meta: {
			title: '钱兔无量'
		},
	},
];

const router = new VueRouter({
	mode: "hash",
	routes,
});

router.beforeEach((to, from, next) => {
	const t = to.query.title
	const title = t ? t : to.meta.title
	document.title = title;

	next();

})

export default router;