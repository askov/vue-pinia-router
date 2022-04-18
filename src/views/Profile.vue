<template>
  <div>Profile (global param only)</div>
  <input type="text" v-model="locationQueryStore.locationQuery.global" />
</template>

<script lang="ts">
import { useLocationQueryStore } from "@/stores/locationQuery";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile",
  setup() {
    const locationQueryStore = useLocationQueryStore();

    return { locationQueryStore };
  },
});
</script>
