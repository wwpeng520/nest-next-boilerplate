import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { COLORS } from '@/client/constants';

const KEY = 'UNIQUE_KEY';

type Option = {
  key?: string; // key 相同的只会显示一个提示框（内容可变）
  duration?: number;
  title?: string | React.ReactNode;
};
export default (
  text: string | React.ReactNode = '操作成功',
  { key = KEY, duration = 2, title = '温馨提示' }: Option = {},
) =>
  notification.open({
    key,
    message: title,
    description: text,
    duration,
    icon: <CheckCircleOutlined style={{ color: COLORS.primary }} />,
  });
