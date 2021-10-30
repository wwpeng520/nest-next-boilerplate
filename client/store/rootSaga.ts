import { all, call, spawn } from 'redux-saga/effects';
import { loadingSaga, authoritySaga, accessSaga } from './slices';

function* rootSaga() {
  const sagas = [loadingSaga, authoritySaga, accessSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            // saga 出错会退出 call 阻塞，然后 while 循环再次调用 call 重新阻塞执行 saga
            yield call(saga);
            break;
          } catch (e) {
            // 这里的错误处理可以自行定义，例如上报运行错误等
            console.error(e);
          }
        }
      }),
    ),
  );
}

export default rootSaga;
