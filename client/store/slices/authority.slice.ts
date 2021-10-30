import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { takeLatest, call, all } from 'redux-saga/effects';
import * as authorityService from '@/client/services/authority';
import { createRequestSaga } from '@/client/utils';
import type { RootState } from '../index';

export interface AuthorityState {
  authUserInfo?: API.AuthLoginResult; // 用户信息（来自公共用户信息）
  loginToken?: string;
  error?: any;
}

export const ACT_LOGIN = 'AUTHORITY/LOGIN';

const [actLogin, sagaLogin] = createRequestSaga(ACT_LOGIN, authorityService.login);

function* watchLogin() {
  yield takeLatest(ACT_LOGIN, sagaLogin);

  // yield takeLatest(ACT_LOGIN, function* (action: PayloadAction) {
  //   const res = yield sagaLogin(action);
  //   console.log('....res', res);
  //   return res;
  // });
}

export { actLogin };

export function* authoritySaga() {
  // yield takeLatest(LOGIN, sagaLogin);
  // yield fork(login);
  yield all([call(watchLogin)]);
}

export const authoritySlice = createSlice({
  name: 'AUTHORITY',
  initialState: {} as AuthorityState,
  reducers: {
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.authUserInfo = action.payload;
    },
    LOGIN_FAILURE: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    // getStaticProps or getServerSideProps 发起 dispatch 会走 HYDRATE action
    // 在 rootReducer 监听或者在各个 reducer 监听（在 rootReducer 则在此无效）
    // 合并(服务器端状态替换客户端)
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.authority };
    },
  },
});

// 导出 reducers
export const { setLoginToken } = authoritySlice.actions;

// 导出 selector
export const selectAuthUserInfo = (state: RootState) => state.authority?.authUserInfo;
export const selectLoginToken = (state: RootState) => state.authority?.loginToken;

export default authoritySlice.reducer;
