import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import axios from '../../assets/js/axios'
import VueStorage from "vue-ls";

import {
  Form,
  Field,
  Button,
  Cell,
  Checkbox,
  Popup, 
  Toast,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Search,
  List,
  Dialog,
  Picker 
} from 'vant'

import "@assets/style/reset.less";
import "@assets/style/flex.less";
import "@assets/style/common.less";

Vue.use(VueStorage);
Vue.use(List);
Vue.use(Search);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Cell);
Vue.use(Checkbox);
Vue.use(CheckboxGroup)
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Picker);

// Vue.use(axios)



window.vm = new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
