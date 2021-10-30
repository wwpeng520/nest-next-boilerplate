/* eslint-disable */
declare namespace API {
  type PatientItem = {
    id: string;
    orgCode?: string;
    orgMedicalNo?: string;
    medicalNo?: string;
    medicalType?: string; // 1-门诊 2-住院
    staffCode?: string;
    empiId?: string;
    visitStartTime?: string;
    status?: string; // -1-已删除 0-无效 1-正常
    creator?: string;
    created?: string;
    modifier?: string;
    modified?: string;
  };
}
