import { InjectionKey } from "vue";
import { createStore, Store, createLogger, useStore as BaseUseStore } from "vuex";
import { AlertType, ActionsName, Timer } from "@/utils/constant";

export interface State {
  /** ローディング */
  isLoading: boolean;
  /** アラート */
  alert: {
    /** アラートタイプ */
    type: AlertType;
    /** アラートメッセージ */
    message: string;
  };
  /** タイムアウトID */
  timeoutId?: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  plugins: import.meta.env.DEV ? [createLogger()] : [],
  state: {
    isLoading: false,
    alert: {
      type: AlertType.Info,
      message: "",
    },
    timeoutId: undefined,
  },
  actions: {
    // アラート
    [ActionsName.SetAlert]({ state }, payload: State["alert"]) {
      state.alert = payload;
    },
    [ActionsName.ClearAlert]({ dispatch }) {
      dispatch(ActionsName.SetAlert, { type: AlertType.Info, message: "" });
    },
    [ActionsName.AlertInfo]({ state, dispatch }, message: string) {
      if (state.timeoutId) dispatch(ActionsName.ClearTimeoutId);
      dispatch(ActionsName.SetAlert, { type: AlertType.Info, message });
      dispatch(
        ActionsName.SetTimeoutId,
        window.setTimeout(() => dispatch(ActionsName.ClearAlert), Timer.Delay)
      );
    },
    [ActionsName.AlertSuccess]({ state, dispatch }, message: string) {
      if (state.timeoutId) dispatch(ActionsName.ClearTimeoutId);
      dispatch(ActionsName.SetAlert, { type: AlertType.Success, message });
      dispatch(
        ActionsName.SetTimeoutId,
        window.setTimeout(() => dispatch(ActionsName.ClearAlert), Timer.Delay)
      );
    },
    [ActionsName.AlertError]({ dispatch }, message: string) {
      dispatch(ActionsName.SetAlert, { type: AlertType.Error, message });
    },
    // タイムアウト
    [ActionsName.SetTimeoutId]({ state }, payload: State["timeoutId"]) {
      state.timeoutId = payload;
    },
    [ActionsName.ClearTimeoutId]({ state }) {
      window.clearTimeout(state.timeoutId);
      state.timeoutId = undefined;
    },
    // ローディング
    [ActionsName.SetLoading]({ state }) {
      state.isLoading = true;
    },
    [ActionsName.ClearLoading]({ state }) {
      state.isLoading = false;
    },
  },
});

export const useStore = () => BaseUseStore(key);
