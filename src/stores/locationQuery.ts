import { computed, isRef, onUnmounted, reactive, Ref, unref, watch } from "vue";
import { LocationQueryRaw, useRouter } from "vue-router";
import { defineStore } from "pinia";

export const useLocationQueryStore = defineStore("locationQuery", () => {
  const router = useRouter();

  // global query object, shared between pages (you can modify it or just shadow if needed)
  const locationQuery = reactive<LocationQueryRaw>({
    // global: 42,
  });

  // Reactive objects collection
  const acc = reactive<LocationQueryRaw[]>([]);

  // Final query param to be set
  const accObj = computed(() =>
    acc.reduce((prev, next) => ({ ...prev, ...next }), {
      ...locationQuery,
    })
  );

  // Prevent the router from being unsynchronised
  router.beforeEach((to, from, next) => {
    if (to.path === from.path && !Object.keys(to.query).length) {
      console.log("SAME", from.query, to.query);
      next({ ...to, query: { ...from.query } });
    } else {
      console.log("REGULAR", from.query, to.query);
      next();
    }
  });

  // Router query setter
  watch(
    accObj,
    (nextAccObj) => {
      console.log("PUSH", nextAccObj);
      router.push({ query: { ...nextAccObj } });
    },
    { deep: true }
  );

  // Disconnect from reactive query
  const removeLocationQuery = (obj: LocationQueryRaw) => {
    const i = acc.findIndex((el) => el === obj);
    if (i > -1) {
      acc.splice(i, 1);
    }
  };

  // Connect to reactive query
  const addLocationQuery = (obj: LocationQueryRaw | Ref<LocationQueryRaw>) => {
    if (acc.findIndex((el) => el === obj) === -1) {
      const o = isRef(obj) ? unref(obj) : obj;
      acc.push(o);
      return () => removeLocationQuery(o);
    }
  };

  // Objects (reactive) connector with autodiscconnect
  // Using this you can connect local reactive objects to the query
  const connectQuery = (
    queries: (LocationQueryRaw | Ref<LocationQueryRaw>)[]
  ): void => {
    const locationQueryStore = useLocationQueryStore();

    const disconnects = queries.map(locationQueryStore.addLocationQuery);

    onUnmounted(() => {
      disconnects.forEach((disconnect) => disconnect && disconnect());
    });
  };

  return {
    // Private API
    acc, // TODO: remove, this is for the demo only
    accObj, // TODO: remove, this is for the demo only
    addLocationQuery, // this should be "protected", only for useReactiveQuery
    removeLocationQuery, // this should be "protected", only for useReactiveQuery
    // Public API
    locationQuery, // global query object, shared between pages (you can modify it or just shadow if needed)
    connectQuery,
  };
});
