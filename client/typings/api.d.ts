/* eslint-disable */
/// <reference path="../services/authority.typings.d.ts"/>
/// <reference path="../services/access.typings.d.ts"/>
/// <reference path="../services/patient.typings.d.ts"/>

declare namespace API {
  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type ApiResponse<T = {}> = {
    code: number;
    msg?: string;
    data?: T;
  };

  type ApiResponseEwell<T = {}> = {
    status: number;
    object?: T;
    message?: string;
    error?: string;
  };

  type PageData<T> = {
    total: number;
    list: T[];
  };

  type EffectResponse<T = {}> = { result: boolean } & ApiResponse<T>;
  type EffectResponseBlob = { result: boolean; data: Blob };
  type EffectResponseEwell<T = {}> = { result: boolean } & ApiResponseEwell<T>;
}
