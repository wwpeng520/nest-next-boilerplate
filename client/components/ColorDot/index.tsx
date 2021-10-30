import classNames from 'classnames';
import { COLORS } from '@/client/constants';
import styles from './index.less';

interface IProps {
  type?: 'primary' | 'error' | 'success' | 'warn';
  className?: string;
}
const ColorDot = ({ type = 'primary', className }: IProps) => {
  return (
    <span className={classNames(styles.container, className)}>
      <span className={styles.bg} style={{ backgroundColor: COLORS[type] }} />
      <span className={styles.inner} style={{ backgroundColor: COLORS[type] }} />
    </span>
  );
};

export default ColorDot;
