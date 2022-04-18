import * as _ from "lodash-es";
import { ref, watch, Ref, isRef, isReactive } from "vue";

type PlainObject<T = unknown> = Record<string | number, T>;

export default function useDraftFromState<
  T extends PlainObject | string | number | boolean
>(
  state: Ref<T> | T,
  enableDraftSync = true
): {
  draft: Ref<T>;
  sync: () => void;
} {
  const draft = ref(_.cloneDeep(isRef(state) ? state.value : state)) as Ref<T>;

  const sync = () => {
    if (isRef(state)) {
      state.value = _.cloneDeep(draft.value);
    } else if (isReactive(state)) {
      Object.assign(state, _.cloneDeep(draft.value));
    }
  };

  watch(
    () => state,
    (nextState) => {
      console.log("nextState", nextState);
      if (enableDraftSync) {
        if (isRef(nextState)) {
          console.log("isRef", nextState);
          draft.value = _.cloneDeep(nextState.value);
        } else if (isReactive(nextState)) {
          console.log("reactive", nextState);
          Object.assign(draft.value, _.cloneDeep(nextState));
        }
      }
    },
    {
      deep: true,
    }
  );

  return {
    draft,
    sync,
  };
}
