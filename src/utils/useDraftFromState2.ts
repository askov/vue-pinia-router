import * as _ from "lodash-es";
import { ref, watch, Ref } from "vue";

type PlainObject<T = unknown> = Record<string | number, T>;

export default function useDraft<
  T extends PlainObject | string | number | boolean
>(
  initialState: T,
  enableDraftSync = true
): {
  state: Ref<T>;
  draft: Ref<T>;
  sync: () => void;
} {
  const state = ref(_.cloneDeep(initialState)) as Ref<T>;
  const draft = ref(_.cloneDeep(initialState)) as Ref<T>;

  const sync = () => {
    state.value = _.cloneDeep(draft.value);
  };

  watch(
    state,
    (nextState) => {
      if (enableDraftSync) {
        draft.value = _.cloneDeep(nextState);
      }
    },
    { deep: true }
  );

  return {
    state,
    draft,
    sync,
  };
}
