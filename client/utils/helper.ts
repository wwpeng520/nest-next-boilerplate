// 延迟
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 获取字符串的后缀（文件名）
export function getSuffix(name: string) {
  if (typeof name !== 'string') {
    throw new Error('非法文件名！');
  }
  let suffix = '';
  if (name.includes('.')) {
    const tempArr = String(name).split('.');
    suffix = tempArr[tempArr.length - 1];
  } else {
    suffix = name;
  }
  return suffix.toLowerCase();
}

// 判断是否是图片
export function isImage(name: string) {
  const suffix = getSuffix(name);
  return ['bmp', 'jpg', 'jpeg', 'png', 'gif', 'jfif', 'webp', 'svg'].includes(suffix);
}

// 获取 enum 类型所有的 key
export function getEnumKeys<T>(data: T) {
  return Object.keys(data).filter((v) => Number.isNaN(parseInt(v, 10)));
}

// 文件流下载
export function downloadBlob({ blob, filename }: { blob: any; filename: string }) {
  if (navigator.userAgent.indexOf('Trident') > -1 && (navigator as any).msSaveBlob) {
    (navigator as any).msSaveBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    a.href = (window.URL || window.webkitURL).createObjectURL(blob);
    a.download = filename;

    // 此写法兼容可火狐浏览器
    document.body.appendChild(a);

    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    a.dispatchEvent(evt);

    document.body?.removeChild(a);
  }
}

// 生成min~max之间的随机整数
export function randomNumber({ min = 0, max }: { max: number; min?: number }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 生成随机字符串
export function randomString(len = 32) {
  const str = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const a = str.length;
  let n = '';
  for (let i = 0; i < len; i += 1) n += str.charAt(Math.floor(Math.random() * a));
  return n;
}

// 根据文件头信息获取文件类型
export function getMimeFromHeader(header: string): string {
  // https://en.wikipedia.org/wiki/List_of_file_signatures
  // https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern

  if (header.slice(0, 4) === '424d') {
    return 'image/bmp';
  }
  switch (header) {
    case '89504e47':
      return 'image/png';
    case '47494638':
      return 'image/gif';
    case '52494646':
      return 'image/webp';
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg';
    case '25504446':
      return 'application/pdf';
    case '504B0304':
      return 'application/zip';
    default:
      return 'unknown';
  }
}

// 根据文件二进制获取文件头信息
export function getMimeFromBlob(blob: Blob) {
  if (blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const arr = new Uint8Array(reader.result as any).subarray(0, 4);
        const header = arr.reduce((out, item) => out + item.toString(16), '');
        resolve(getMimeFromHeader(header));
      });
      reader.addEventListener('error', reject);
      reader.readAsArrayBuffer(blob);
    });
  }
  return Promise.reject();
}

// 从文件路径（url）或 img DOM 节点获取文件头信息
export function getMimeFromImg({ url, img }: { img?: HTMLImageElement; url?: string }) {
  const imgSrc = url || img?.src;
  if (imgSrc) {
    return fetch(imgSrc)
      .then((response) => response.blob())
      .then((imgBlob: Blob) => getMimeFromBlob(imgBlob));
  }

  return Promise.reject();
}

// 二进制流转换成 base64
export function getBase64FromBlob(
  img: Blob | File | undefined,
  // callback: (img: string | ArrayBuffer | null) => void,
): Promise<string> {
  if (img) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      // reader.onload = () => resolve(reader.result);
      // reader.onerror = (error) => reject(error);
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.addEventListener('error', reject);
    });
  }
  return Promise.reject();
}
