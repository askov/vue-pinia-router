<template>
  <div>About (shows url param shadowing)</div>
  <input type="text" v-model="shadowGlobal.global" />
</template>

<script lang="ts">
import { useLocationQueryStore } from "@/stores/locationQuery";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "About",
  setup() {
    const { connectQuery } = useLocationQueryStore();

    const shadowGlobal = reactive({
      global: "local_global_value",
    });

    connectQuery([shadowGlobal]);

    return { shadowGlobal };
  },
});
</script>
