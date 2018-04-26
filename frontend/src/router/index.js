import Vue from "vue";
import Router from "vue-router";
import Frontpage from "@/components/Frontpage";
import Dashboard from "@/components/Dashboard";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "Frontpage",
			component: Frontpage
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: Dashboard
		}
	]
});
