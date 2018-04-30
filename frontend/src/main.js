// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import CreateUser from "@/components/CreateUser";
import FrontPageUser from "@/components/FrontpageUser";
import CreateLobbyModal from "@/components/CreateLobbyModal";
import CreateLobby from "@/components/CreateLobby";

Vue.config.productionTip = false;

Vue.component("create-user", CreateUser);
Vue.component("frontpage-user", FrontPageUser);
Vue.component("CreateLobbyModal", CreateLobbyModal);
Vue.component("CreateLobby", CreateLobby);
/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	components: { App },
	template: "<App/>"
});
