import { Button, Table } from 'antd';
import type { TableProps, TablePaginationConfig } from 'antd';
import { BIZ } from '@/client/constants';
import styles from './index.less';

const BizTable = ({ pagination = {}, ...rest }: TableProps<any>) => {
  return (
    <Table
      {...rest}
      pagination={
        pagination !== false &&
        ({
          position: ['bottomCenter'],
          showQuickJumper: {
            goButton: <Button style={{ marginLeft: 10 }}>确定</Button>,
          },
          pageSize: pagination.pageSize || BIZ.PAGE_SIZE,
          showSizeChanger: true,
          // onShowSizeChange: (pageNo: number, pageSize: number) => setState({ pageNo, pageSize }),
          // showSizeChanger: 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
          showTotal: (t: number) => `共 ${t} 条`,
          itemRender: (page, type, originalElement) => {
            if (type === 'page' && pagination?.current === page) {
              return (
                <Button className={styles.relPagiActive} type="primary">
                  {page}
                </Button>
              );
            }

            return originalElement;
          },
          ...pagination,
        } as TablePaginationConfig)
      }
    />
  );
};

export default BizTable;
