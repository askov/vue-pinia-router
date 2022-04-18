<template>
  <h1>Router reactive query demo</h1>
  <p>
    <router-link to="/">Go to Home</router-link>
    &
    <router-link to="/about">Go to About</router-link>
    &
    <router-link to="/profile">Go to Profile</router-link>
  </p>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
