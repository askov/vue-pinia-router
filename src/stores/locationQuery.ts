import { computed, isRef, onUnmounted, reactive, Ref, unref, watch } from "vue";
import { LocationQueryRaw, useRouter } from "vue-router";
import { defineStore } from "pinia";

export const useLocationQueryStore = defineStore("locationQuery", () => {
  const router = useRouter();

  // global query object, shared between pages (you can modify it or just shadow if needed)
  const locationQuery = reactive<LocationQueryRaw>({
    global: 42,
  });

  // Reactive objects collection
  const acc = reactive<LocationQueryRaw[]>([]);

  // Final query param to be set
  const accObj = computed(() =>
    acc.reduce((prev, next) => ({ ...prev, ...next }), {
      ...locationQuery,
    })
  );

  // Router query setter
  watch(accObj, (nextAccObj) => {
    router.push({ query: { ...nextAccObj } });
  });

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

  return {
    // Private API
    acc, // TODO: remove, this is for the demo only
    accObj, // TODO: remove, this is for the demo only
    addLocationQuery, // this should be "protected", only for useReactiveQuery
    removeLocationQuery, // this should be "protected", only for useReactiveQuery
    // Public API
    locationQuery, // global query object, shared between pages (you can modify it or just shadow if needed)
  };
});

// Objects (reactive) connector with autodiscconnect
// Using this you can connect local reactive objects to the query
export const useReactiveQuery = (
  queries: (LocationQueryRaw | Ref<LocationQueryRaw>)[]
): void => {
  const locationQueryStore = useLocationQueryStore();

  const disconnects = queries.map(locationQueryStore.addLocationQuery);

  onUnmounted(() => {
    disconnects.forEach((disconnect) => disconnect && disconnect());
  });
};
