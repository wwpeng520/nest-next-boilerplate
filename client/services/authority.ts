/**
 * * 微服务用户登录权限等
 */
import httpRequest from '@/client/utils/axios';

const URLS = {
  login: '/api/authority/login',
  getAuthority: '/api/authority/getAuthority',
  loginTokenVerification: '/api/authority/loginTokenVerification',
};

// 微服务用户登录
export async function login(params: Record<string, any>) {
  const res = await httpRequest.get<API.AuthLoginResult>(URLS.login, params);
  if (res?.data?.loginToken) {
    httpRequest.setUserInfo({ loginToken: res?.data?.loginToken });
  }
  return res;
}

// 微服务获取用户权限点
export function getAuthority(params: Record<string, any>) {
  return httpRequest.get<API.Authorities>(URLS.getAuthority, params);
}

// 微服务认证token：只刷新token和返回用户基本信息
export async function loginTokenVerification(params: Record<string, any>) {
  const res = await httpRequest.get<API.AuthLoginResult>(URLS.loginTokenVerification, params);
  const { account, userId, userNameCn, userType, inpatientDeptCode, staffCode } = res?.data || {};
  if (userId) {
    httpRequest.setUserInfo({
      uuheader: {
        account,
        userId,
        userNameCn,
        userType,
        deptCode: inpatientDeptCode,
        staffCode,
      },
    });
  }
  return res;
}
