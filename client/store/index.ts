import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { Store } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import type { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import type { MakeStore } from 'next-redux-wrapper';
import { authorityReducer, loadingReducer, accessReducer } from './slices';
import rootSaga from './rootSaga';

// const rootReducer = (state: State | undefined, action: AnyAction) => {
//   switch (action.type) {
//     // getStaticProps or getServerSideProps 发起 dispatch 会走 HYDRATE action
//     // 同步服务端和客户端 reducer 数据，否则两个端数据不一致造成冲突
//     // 可以在此监听 action，可以在各个 reducer 监听（推荐）
//     case HYDRATE:
//       // return { ..._.merge({}, state, action.payload) };
//       return action.payload;
//     default: {
//       const combineReducer = combineReducers({
//         authority: authorityReducer,
//         loading: loadingReducer,
//       });
//       return combineReducer(state, action);
//     }
//   }
// };

interface SagaStore extends Store {
  sagaTask?: Task;
}

const rootReducer = combineReducers({
  authority: authorityReducer,
  loading: loadingReducer,
  access: accessReducer,
});

let myStore;
const isDev = process.env.NODE_ENV === 'development';
const store: MakeStore<Store> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const _store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
    devTools: isDev,
  });
  myStore = _store;
  (_store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return _store;
};

const wrapper = createWrapper(store, { debug: isDev });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof myStore.dispatch;
export default wrapper;
