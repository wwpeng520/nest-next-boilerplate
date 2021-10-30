/**
 * @phone: string
 * @return: boolean
 * 校验手机号码
 */
export function isMobile(phone: string) {
  return /^1[3456789]\d{9}$/.test(phone);
}

export function testAny(type: string, value: any, callback: (error?: string | undefined) => void) {
  if (!value) {
    callback();
  } else {
    switch (type) {
      case 'phone':
      case 'mobile':
        if (!isMobile(value)) {
          throw new Error('手机号码不合法');
        } else {
          callback();
        }
        break;
      // ...
      default:
        callback();
    }
  }
}
