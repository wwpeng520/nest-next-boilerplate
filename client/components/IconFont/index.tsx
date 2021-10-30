import React from 'react';
import type { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<SVGSVGElement> {
  type: string;
  className?: string;
  style?: React.CSSProperties;
}
/**
 * 自定义 iconfont 组件
 */
const IconFont = (props: IProps) => {
  const { type, className, ...restProps } = props;
  // return <i className={`iconfont icon-${type} ${className}`} {...restProps} />;
  return (
    <svg className={`icon-svg ${className || ''}`} aria-hidden="true" {...restProps}>
      <use xlinkHref={`#icon-${type}`} />
    </svg>
  );
};

export default IconFont;
