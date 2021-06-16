import Vue from "vue";
import VueRouter from "vue-router";

import Start from "./views/Start.vue";
import Inputs from "./views/Inputs.vue";
import Outputs from "./views/Outputs.vue";
import ControlElements from "./views/ControlElements.vue";
import Finish from "./views/Finish.vue";
import General from "./views/General.vue";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/Start",
            component: Start
        },
        {
            path: "/General",
            component: General
        },
        {
            path: "/Inputs",
            component: Inputs
        },
        {
            path: "/Outputs",
            component: Outputs
        },
        {
            path: "/ControlElements",
            component: ControlElements
        },
        {
            path: "/Finish",
            component: Finish
        },
        {
            path: "*",
            redirect: "/Start"
        }
    ]
})
