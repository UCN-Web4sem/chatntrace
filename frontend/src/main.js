// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import CreateUser from "@/components/CreateUser";
import FrontPageUser from "@/components/FrontpageUser";
import Chat from "@/components/Chat";
import ChatArea from "@/components/ChatArea";
import ChatForm from "@/components/ChatSendForm";
import CreateLobbyModal from "@/components/CreateLobbyModal";
import CreateLobby from "@/components/CreateLobby";
import Game from "@/components/Game";
import WordClue from "@/components/WordClue";

Vue.config.productionTip = false;

Vue.component("create-user", CreateUser);
Vue.component("frontpage-user", FrontPageUser);
Vue.component("chat", Chat);
Vue.component("chat-area", ChatArea);
Vue.component("chat-form", ChatForm);
Vue.component("create-lobby-modal", CreateLobbyModal);
Vue.component("create-lobby", CreateLobby);
Vue.component("game", Game);
Vue.component("word-clue", WordClue);
/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	components: { App },
	template: "<App/>"
});
