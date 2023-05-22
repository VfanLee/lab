import Vue from "vue";

import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";

Vue.use(ElementUI, { zIndex: 3000 });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
