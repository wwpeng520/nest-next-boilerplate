import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { HYDRATE } from 'next-redux-wrapper';

export interface LoadingState {
  global?: boolean;
  [key: string]: boolean;
}

export const loadingSlice = createSlice({
  name: 'LOADING',
  initialState: {} as LoadingState,
  reducers: {
    START_LOADING: (state, action: PayloadAction<string>) => ({
      ...state,
      [action.payload]: true,
      global: true,
    }),
    END_LOADING: ({ global, ...restState }, action: PayloadAction<string>) => {
      const finalStateNoGlobal = { ...restState, [action.payload]: false };
      return {
        ...restState,
        [action.payload]: false,
        global: Object.values(finalStateNoGlobal).some((v) => v),
      };
    },
  },
  extraReducers: {
    // getStaticProps or getServerSideProps 发起 dispatch 会走 HYDRATE action
    // 在 rootReducer 监听或者在各个 reducer 监听（在 rootReducer 则在此无效）
    // 合并(服务器端状态替换客户端)
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.counter };
    },
  },
});

export const { START_LOADING: startLoading, END_LOADING: endLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

export function* loadingSaga() {}

export const selectLoading = (type) => (state: RootState) => state.loading[type];
