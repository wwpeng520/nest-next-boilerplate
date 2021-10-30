---
title: Hooks
sidemenu: false
---

# 自定义 Hooks

## useMeasure

页面 resize 后自动计算容器的尺寸调用返回`[{ ref }, bounds]`。bounds 形如{x: 0, y: 0, width: 960, height: 347, top: 0, bottom: 347, left: 0, right: 960 }。

应用场景一：Table 内部滚动，且根据页面缩放自动适应

- Table 外层容器是 flex: 1 的布局（最外层 flex 布局）
- Table 外层容器自适应最大，则可以计算出 Table 外层容器的位置大小信息
- 获得 Table 外层容器的高度后，减去 BIZ.SCROLL_Y（表头和页面的高度），则可以得到 Table.scroll.y

```tsx | pure
import { useState } from 'react';
import { Table } from 'antd';
import { useMeasure } from '@/hooks';
import { BIZ } from '@/client/constants';
import styles from './index.less';

function App() {
  const [bind, { height: viewHeight }] = useMeasure();
  return (
    <div className={`main-wrapper pb-0 ${styles.container}`}>
      <div>这是表格上方内容</div>
      <div {...bind} className={styles.tableBox}>
        <Table
          {...tableProps}
          className="biz-table mt-8"
          columns={columns}
          rowKey="email"
          scroll={{ y: viewHeight - BIZ.SCROLL_Y }}
        />
      </div>
    </div>
  );
}
```

---

## usePrevious

```tsx | pure
import { useState } from 'react';
import { usePrevious } from '@/hooks';

const [count, setCount] = useState(0);
const prevCount = usePrevious(count);
```

---

## useCountdown

- @param seconds required 倒计时的总数
- @param hintText required 非倒计时阶段显示文本
- @param format 返回显示文字格式：「'%c」会全局被替换为剩余时间秒数
- @param onCompleted 倒计时结束回调

```tsx | pure
import { useState } from 'react';
import { useCountdown } from '@/hooks';

const {
  text: countText,
  begin,
  cancel,
  isRunning,
} = useCountdown({
  seconds: 60,
  hintText: '发送验证码',
  format: '%c秒后重试',
  onCompleted: () => setState({ hasSentVerifyCode: false }),
});

// countText 为显示文本（发送验证码 OR 10秒后重试）
// begin 为点击按钮开始倒计时触发
// cancel 取消倒计时
```

---
