<template>
  <div>
    <div style="display: flex">
      <input type="text" v-model="locationQueryStore.locationQuery.global" />
      <div style="background-color: gainsboro; flex-grow: 1">
        Global object:
        <strong>{{ locationQueryStore.locationQuery.global }}</strong>
      </div>
    </div>

    <div style="display: flex">
      <input type="text" v-model="obj1.foo" />
      <div style="background-color: aqua; flex-grow: 1">
        Reactive object 1: <strong>{{ obj1 }}</strong>
      </div>
    </div>

    <div style="display: flex">
      <input type="text" v-model="obj2.bar" />
      <div style="background-color: coral; flex-grow: 1">
        Reactive object 2: <strong>{{ obj2 }}</strong>
      </div>
    </div>
    <div style="display: flex">
      <input type="text" v-model="someRef.myref" />
      <div style="background-color: palevioletred; flex-grow: 1">
        Ref object: <strong>{{ someRef }}</strong>
      </div>
    </div>

    <div style="background-color: antiquewhite; margin-top: 20px">
      Collection: <strong>{{ locationQueryStore.acc }}</strong>
    </div>
    <div style="background-color: gold">
      Final query (computed): <strong>{{ locationQueryStore.accObj }}</strong>
    </div>

    <div style="margin-top: 20px">
      <button
        type="button"
        @click="addVal(1)"
        style="background-color: greenyellow"
      >
        Connect foo
      </button>
      <button
        type="button"
        @click="addVal(2)"
        style="background-color: greenyellow"
      >
        Connect bar
      </button>
      <button type="button" @click="removeVal(1)" style="background-color: red">
        Disconnect foo
      </button>
      <button type="button" @click="removeVal(2)" style="background-color: red">
        Disconnect bar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import {
  useLocationQueryStore,
  useReactiveQuery,
} from "@/stores/locationQuery";

export default defineComponent({
  name: "Home",
  setup() {
    const locationQueryStore = useLocationQueryStore();

    // Router query part
    const obj1 = reactive({
      foo: 1,
    });

    // Router query part
    const obj2 = reactive({
      bar: 2,
    });

    // Router query part
    const someRef = ref({
      myref: "myref_value",
    });

    // Connect parts to the router query
    useReactiveQuery([obj1, obj2, someRef]);

    // Demo helpers
    const getObject = (num: number) => {
      if (num === 1) {
        return obj1;
      }
      return obj2;
    };

    const addVal = (num: number) => {
      locationQueryStore.addLocationQuery(getObject(num));
    };

    const removeVal = (num: number) => {
      locationQueryStore.removeLocationQuery(getObject(num));
    };

    return {
      obj1,
      obj2,
      addVal,
      removeVal,
      locationQueryStore,
      someRef,
    };
  },
});
</script>
