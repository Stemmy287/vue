import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router/router";
import intersection from "@/directives/VIntersection";
import focus from "@/directives/VFocus";
import store from "@/store";

const app = createApp(App)

app.directive('intersection', intersection)
app.directive('focus', focus)

app.use(router).use(store).mount('#app')
