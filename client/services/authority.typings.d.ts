/* eslint-disable */
declare namespace API {
  type AuthLoginResult = {
    loginToken?: string;
    userId?: string;
    userName?: string | null;
    userNameCn?: string | null;
    account?: string | null;
    sex?: string;
    userType?: string; // 0-管理员
    inpatientDeptCode?: string;
    deptCode?: string;
    orgCode?: string;
    staffCode?: string;
  };

  type AuthListItem = {
    checked?: string;
    remark?: string | null;
    sortNo?: number;
    permissionsType: string;
    permissionsName: string;
    permissionsCode: string;
    permissionsId: string;
  };

  type AuthList = AuthListItem[];

  type AreaListItem = { authList: AuthList };

  // 权限点
  type Authorities = {
    areaList?: AreaListItem[];
  };
}
