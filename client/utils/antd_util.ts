import { Modal, notification } from 'antd';

let modalVisible = false;

export function show401Modal(msg?: string) {
  if (!modalVisible) {
    modalVisible = true;
    Modal.warn({
      title: msg || '无效授权',
      content: '未登录或者登录过期，请重新登陆！',
      keyboard: false,
      maskClosable: false,
      okText: '去登录',
      onOk() {
        modalVisible = false;
        window.location.href = '/user/login';
      },
    });
  }
}

export function notificationRequstErrMsg(message: string) {
  notification.error({
    message,
    description: '',
    duration: 5,
  });
}
