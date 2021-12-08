import Vue from "vue/dist/vue.js";
import Router from "vue-router";
Vue.use(Router);

import Home from "./vue/questionnaire/views/Home.vue";
import results from "./vue/questionnaire/views/Results.vue";
import Steps from "./vue/questionnaire/views/Steps.vue";
import step01 from "./vue/questionnaire/views/step01.vue";
import step02 from "./vue/questionnaire/views/step02.vue";
import step03 from "./vue/questionnaire/views/step03.vue";
import step04 from "./vue/questionnaire/views/step04.vue";
import step05 from "./vue/questionnaire/views/step05.vue";
import step06 from "./vue/questionnaire/views/step06.vue";
import step07 from "./vue/questionnaire/views/step07.vue";
import step08 from "./vue/questionnaire/views/step08.vue";
import step09 from "./vue/questionnaire/views/step09.vue";
import step10 from "./vue/questionnaire/views/step10.vue";



export default new Router({
    mode: "history",
    base: "/questionnairejr",
    routes: [{
            path: "/",
            component: Home,
            name: "home",
        },
        {
            path: "/steps",
            component: Steps,
            children: [{
                    path: "01",
                    component: step01,
                },
                {
                    path: "02",
                    component: step02,
                },
                {
                    path: "03",
                    component: step03,
                },
                {
                    path: "04",
                    component: step04,
                },
                {
                    path: "05",
                    component: step05,
                },
                {
                    path: "06",
                    component: step06,
                },
                {
                    path: "07",
                    component: step07,
                },
                {
                    path: "08",
                    component: step08,
                },
                {
                    path: "09",
                    component: step09,
                },
                {
                    path: "10",
                    component: step10,
                },
                {
                    path: "results",
                    component: results,
                },
            ],
        },
    ],
    scrollBehavior() {
        return {
            x: 0,
            y: 0,
        };
    },
});