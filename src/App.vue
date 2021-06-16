<template>
  <div id="app">
    <b-navbar toggleable="md" variant="light" class="mb-4">
      <b-container>
        <b-navbar-nav>
          <b-nav-item to="Start" :active="$route.path === '/Start'">Start</b-nav-item>
          <b-nav-item to="General" :active="$route.path === '/General'">General</b-nav-item>
          <b-nav-item to="Inputs" :active="$route.path === '/Inputs'">Inputs</b-nav-item>
          <b-nav-item to="Outputs" :active="$route.path === '/Outputs'">Outputs</b-nav-item>
          <b-nav-item to="ControlElements" :active="$route.path === '/ControlElements'">ControlElements</b-nav-item>
          <b-nav-item to="Finish" :active="$route.path === '/Finish'">Finish</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <b-form ref="mainForm">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </b-form>

    <b-container class="mt-3">
      <ul class="pagination float-left">
        <li class="page-item" :class="{ disabled : isFirstPage }">
          <b-link class="page-link" href="#" @click.prevent="goToPreviousPage">
            « Previous
          </b-link>
        </li>
      </ul>

      <ul class="pagination float-right">
        <li class="page-item">
          <b-link class="page-link" href="#" @click.prevent="goToNextPage">
            {{ isLastPage ? "Finish" : "Next" }} »
          </b-link>
        </li>
      </ul>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields";
import { goToNextPage, goToPreviousPage } from "./Router.js";

export default {
  computed: {
    ...mapState(["template"]),
    isFirstPage() { return this.$route.path === "/Start"; },
    isLastPage() { return this.$route.path === "/Finish"; }
  },
  methods: {
    ...mapMutations([]),
    goToPreviousPage() {
      let pageIndex = this.$router.options.routes.findIndex(route => route.path === this.$route.path);
      if (pageIndex > 0) {
        let prevPage = this.$router.options.routes[--pageIndex];

        this.$router.push(prevPage);
      }
    },
    goToNextPage() {
      let pageIndex = this.$router.options.routes.findIndex(route => route.path === this.$route.path);
      if (pageIndex + 2 < this.$router.options.routes.length) {
        let nextPage = this.$router.options.routes[++pageIndex];
        this.$router.push(nextPage);
      }
    },
    mounted() {

    }
  }


}
</script>

<style>
#app {

}
</style>
