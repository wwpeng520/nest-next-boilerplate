import classNames from 'classnames';
import logoEwell from '@/client/assets/common/logo_ewell.svg';
import styles from './index.less';

type Props = {
  size?: 'small' | 'default' | number; // circle-rotate 时只支持 number 类型，否则默认大小是 24px
  // circle-rotate: 固定大小的旋转券；logo: 带 logo，logo 外有旋转圈
  type?: 'circle-rotate' | 'logo';
  loadingText?: string;
};
const Loading: React.FC<Props> = ({ type = 'circle-rotate', size = 'default', loadingText = '加载中' }) => {
  const style: React.CSSProperties = {};
  if (Number.isInteger(size) && size > 0) {
    style.width = size;
    style.height = size;
  }
  return (
    <div className={styles.container}>
      {type === 'circle-rotate' && (
        <div className={classNames(styles.circleBox)}>
          <div className={classNames(styles.circle)} style={style} />
          <div className={styles.circleText}>{loadingText}</div>
        </div>
      )}
      {type === 'logo' && (
        <div className={classNames(styles.circleBoxNoText)}>
          <div className={classNames(styles.circle, styles.onlyCircle)} style={style} />
          <img src={logoEwell} className={classNames(styles.logoDefault)} style={style} />
        </div>
      )}
    </div>
  );
};

export default Loading;
