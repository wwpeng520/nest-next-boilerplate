import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { takeLatest, all, call } from 'redux-saga/effects';
import { access as accessService } from '@/client/services';
import { createRequestSaga } from '@/client/utils';

export interface AccessState {
  list?: API.PageData<API.AccessAppItem>;
}

export const accessSlice = createSlice({
  name: 'ACCESS',
  initialState: {} as AccessState,
  reducers: {
    appFindForPage_SUCCESS: (state, action) => {
      state.list = action.payload;
    },
    save: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    // getStaticProps or getServerSideProps 发起 dispatch 会走 HYDRATE action
    // 在 rootReducer 监听或者在各个 reducer 监听（在 rootReducer 则在此无效）
    // 合并(服务器端状态替换客户端)
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.access };
    },
  },
});

export const {} = accessSlice.actions;

export const ACT_APP_PAGE = 'ACCESS/appFindForPage';

const [actAppPage, sagaAppPage] = createRequestSaga(ACT_APP_PAGE, accessService.appFindForPage);

function* watchAppPage() {
  yield takeLatest(ACT_APP_PAGE, sagaAppPage);
}

export { actAppPage };

export function* accessSaga() {
  yield all([call(watchAppPage)]);
  // yield all([watchAppPage()]);
}

export default accessSlice.reducer;
