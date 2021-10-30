// @ts-ignore
/* eslint-disable */
declare namespace API {
  type AccessAppItem = AccessAppDetail;

  type AccessAppDetail = {
    id?: string;
    accessDate?: number;
    appCategoryCode?: string;
    appCategoryName?: string;
    appCode?: string;
    appContactName?: string;
    appEmail?: string;
    appName?: string;
    appOrgCategoryCode?: string;
    appOrgCategoryName?: string;
    appPackage?: string;
    appPhone?: string;
    appPlatCode?: string;
    appPlatName?: string;
    appRecordDate?: number;
    appRecordNo?: string;
    appTel?: string;
    appUrl?: string;
    bussFunctionCode?: string;
    bussFunctionName?: string;
    copyrightNo?: string;
    createUserName?: string; // 创建人姓名
    erhcSystem?: string;
    erhcSystemOrgCode?: string;
    erhcSystemOrgName?: string;
    erhcSystemRecordNo?: string;
    imgUrl?: string;
    launchTime?: number;
    updateUserName?: string;
    onlineStatus?: string;
    orgCode?: string;
    orgName?: string;
    orgFullName?: string;
    productModel?: string;
    publishChannelCode?: string;
    publishChannelName?: string;
    address?: string;
    provinceCode?: string;
    provinceName?: string;
    cityCode?: string;
    cityName?: string;
    countyCode?: string;
    countyName?: string;
    sdkInfo?: string;
    unitCode?: string;
    unitName?: string;
    createTime?: number;
    updateTime?: number;
    subStatus?: 0 | 1; // 订阅配置状态: 0 未配置 1已配置
    subToken?: string; // 订阅签名token
    subUrl?: string; // 订阅请求网址
    subKey?: string; // 订阅加密密钥
    isSystemAdmin?: boolean;
  };

  type OpenApiItem = {
    id: string;
    name: string;
    description: string;
    method?: string;
    status: 0 | 1;
    type?: 1 | 2; // 1:开放接口; 2:订阅接口
  };

  type TerminalItem = {
    id: string;
    terminalCode?: string;
    orgName?: string;
    orgCode?: string;
    terminalPurpose?: string;
    terminalName?: string;
    terminalTypeCode?: string;
    terminalTypeName?: string;
    serialNumber?: string;
    departmentCode?: string;
    departmentName?: string;
    installationPositior?: string;
    remark?: string;
    terminalUnit?: string;
    createUserName?: string;
    createTime?: string | number;
    updateUserName?: string;
    updateTime?: string | number;
    accessDate?: string | number;
  };
  type TerminalList = TerminalItem[];
}
