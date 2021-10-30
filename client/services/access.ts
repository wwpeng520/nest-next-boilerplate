import httpRequest, { ContentType } from '@/client/utils/axios';

const URLS = {
  terminalFindForPage: '/api/terminal/findForPage',
  terminalFindForDetail: '/api/terminal/findForDetail',
  terminalAdd: '/api/terminal/add',
  terminalUpdate: '/api/terminal/update',
  terminalDelete: '/api/terminal/delete',
  terminalExport: '/api/terminal/export',
  appFindForPage: '/api/app/findForPage',
  appFindForDetail: '/api/app/findForDetail',
  appAdd: '/api/app/add',
  appUpdate: '/api/app/update',
  appDelete: '/api/app/delete',
  appExport: '/api/app/export',
  appFindForOpenApiList: '/api/app/findForOpenApiList',
  appFindForSubscribeApiList: '/api/app/findForSubscribeApiList',
  appUpdateApiStatus: '/api/app/updateApiStatus',
  appGenerate: '/api/app/generate',
  appSaveSubscribeConfig: '/api/app/saveSubscribeConfig',
};

// 分页查询应用列表
export function appFindForPage(params?: Record<string, string | number>) {
  return httpRequest.get<API.PageData<API.AccessAppItem>>(URLS.appFindForPage, params);
}

// 根据id查询应用详情
export function appFindForDetail(params: Record<string, string | number>) {
  return httpRequest.get<API.AccessAppDetail>(URLS.appFindForDetail, params);
}

// 更新应用
export function appUpdate(params: Record<string, string | number>) {
  return httpRequest.post(URLS.appUpdate, params, {
    headers: { 'Content-Type': ContentType.json },
  });
}

export function appAdd(params: Record<string, string | number>) {
  return httpRequest.post(URLS.appAdd, params, {
    headers: { 'Content-Type': ContentType.json },
  });
}

export function appDelete(params: Record<string, string | number>) {
  return httpRequest.post(URLS.appDelete, params);
}

// 导出应用
export function appExport(params: Record<string, string | number> = {}) {
  // return httpRequest.get(URLS.appExport, params, {
  //   responseType: 'blob',
  // });
  return httpRequest.get(URLS.appExport, params);
}

// 查询应用的接口权限列表
export function appFindApiList(params: Record<string, string | number>) {
  return httpRequest.get<API.OpenApiItem>(URLS.appFindForOpenApiList, params);
}

// 查询应用的订阅权限列表
export function appFindSubscribeList(params: Record<string, string | number>) {
  return httpRequest.get<API.OpenApiItem>(URLS.appFindForSubscribeApiList, params);
}

// 更新接口状态
export function appApiUpdate(params: Record<string, string | number>) {
  return httpRequest.post(URLS.appUpdateApiStatus, params);
}

// 获取应用秘钥或token
export function appHashGen(params: Record<string, string | number>) {
  return httpRequest.get(URLS.appGenerate, params);
}

// 保存订阅配置
export function appSubscribeConfSave(params: Record<string, string | number>) {
  return httpRequest.post(URLS.appSaveSubscribeConfig, params, {
    headers: { 'Content-Type': ContentType.json },
  });
}

/**
 * 新增终端
 */
export function addTerminal(params: Record<string, string | number>) {
  return httpRequest.post(URLS.terminalAdd, params, {
    headers: { 'Content-Type': ContentType.json },
  });
}

/**
 * 删除终端
 */
export function delTerminal(params: Record<string, string | number>) {
  return httpRequest.post(URLS.terminalDelete, params);
}

/**
 * 根据id查询详情
 */
export function findTerminalDetail(params: Record<string, string | number>) {
  return httpRequest.get<API.TerminalItem>(URLS.terminalFindForDetail, params);
}

/**
 * 导出终端
 */
export function exportTerminal(params: Record<string, string | number>) {
  // return httpRequest.get(URLS.terminalExport, params, {
  //   responseType: 'blob',
  // });
  return httpRequest.get(URLS.terminalExport, params);
}

/**
 * 终端分页查询
 */
export function getTerminalList(params: Record<string, string | number>) {
  return httpRequest.get<API.PageData<API.TerminalItem>>(URLS.terminalFindForPage, params);
}

/**
 * 更新终端
 */
export function updateTerminal(params: Record<string, string | number>) {
  return httpRequest.post(URLS.terminalUpdate, params, {
    headers: { 'Content-Type': ContentType.json },
  });
}
