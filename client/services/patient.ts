import httpRequest from '@/client/utils/axios';

const URLS = {
  patientList: '/api/patient/list',
};

// 分页查询应用列表
export function patientList(params?: Record<string, string | number>) {
  return httpRequest.get<API.PageData<API.PatientItem>>(URLS.patientList, params);
}
