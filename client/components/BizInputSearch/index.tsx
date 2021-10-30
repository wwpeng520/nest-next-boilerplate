import { Input } from 'antd';
import type { InputProps } from 'antd';
import IconFont from '@/client/components/IconFont';

const BizInputSearch = ({ style = {}, className = '', placeholder = '请输入', ...rest }: InputProps) => {
  return (
    <Input
      className={className}
      placeholder={placeholder}
      suffix={<IconFont type="search" className={`color-icon`} />}
      style={style}
      {...rest}
      // onPressEnter
    />
  );
};

export default BizInputSearch;
