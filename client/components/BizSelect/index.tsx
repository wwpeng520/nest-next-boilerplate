import { Select } from 'antd';
import IconFont from '@/client/components/IconFont';
import styles from './index.less';

const BizSelect = ({ className = '', ...rest }) => {
  return (
    <Select
      className={`${styles.container} ${className}`}
      suffixIcon={<IconFont type="arrow-down-filled" />}
      {...rest}
    />
  );
};

BizSelect.Option = Select.Option;
BizSelect.OptGroup = Select.OptGroup;
export default BizSelect;
