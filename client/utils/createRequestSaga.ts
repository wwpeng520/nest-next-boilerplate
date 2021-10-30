import { createAction } from '@reduxjs/toolkit';
import type {
  ActionCreatorWithNonInferrablePayload,
  ActionCreatorWithOptionalPayload,
  PayloadAction,
} from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import type { CallEffect, PutEffect } from 'redux-saga/effects';
import { startLoading, endLoading } from '@/client/store/slices/loading.slice';

export interface ResponseGenerator {
  code?: number;
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export default function createRequestSaga(
  type: string,
  request: any,
): [
  (
    | ActionCreatorWithNonInferrablePayload<string>
    | ActionCreatorWithOptionalPayload<Record<string, string | number>, string>
  ),
  (action: PayloadAction) => Generator<CallEffect | PutEffect<{ type: string; payload: any }>, void, ResponseGenerator>,
] {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  const generatorFn = function* (action: PayloadAction) {
    yield put(startLoading(type));

    const response: ResponseGenerator = yield call(request, action.payload);
    if (response?.code === 0) {
      yield put({ type: SUCCESS, payload: response.data });
    } else {
      yield put({ type: FAILURE, payload: response.data, error: true });
    }

    yield put(endLoading(type));
  };

  const actionAct = createAction<Record<string, any>>(type);

  return [actionAct, generatorFn];
}
