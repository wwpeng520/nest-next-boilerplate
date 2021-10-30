import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { createAction } from '@reduxjs/toolkit';
import type { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { startLoading, endLoading, selectLoading } from '@/client/store/slices/loading.slice';
import { patient as patientService } from '@/client/services';
import Layout from '@/client/layouts';
import { BizTable } from '@/client/components';
import { BIZ } from '@/client/constants';
import { selectLoginToken } from '@/client/store/slices/authority.slice';
import styles from './list.module.less';

const List = () => {
  const { query = {} } = useRouter();
  const dispatch = useDispatch();
  const getListAct = createAction<Record<string, any>>('patient/list');
  const loadingList = useSelector(selectLoading(getListAct.type));
  const loginToken = useSelector(selectLoginToken);

  type State = {
    list: API.PatientItem[];
    total: number;
    pageNo: number;
    pageSize: number;
    queryParams: Record<string, string | number | undefined> | undefined;
  };
  const initial: State = {
    list: [],
    total: 0,
    pageNo: query?.pageNo ? Number(query?.pageNo) : 1,
    pageSize: query?.pageSize ? Number(query?.pageSize) : BIZ.PAGE_SIZE,
    queryParams: undefined,
  };

  const [state, setState] = useReducer(
    (prev: typeof initial, next: Partial<typeof initial>) => ({ ...prev, ...next }),
    initial,
  );
  const { list, total, pageNo, pageSize } = state;

  useEffect(() => {
    async function getList() {
      dispatch(startLoading(getListAct.type));
      const result = await patientService.patientList();
      if (result.code === 0) {
        setState({
          list: Array.isArray(result.data) ? result.data : result.data?.list || [],
          total: Array.isArray(result.data) ? result.data.length : result.data?.total || 0,
        });
      }
      dispatch(endLoading(getListAct.type));
    }

    getList();
  }, [dispatch, getListAct.type]);

  function onItemClick(record) {
  }

  const columns = [
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      render: (text: number) => moment(Number(text)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改人',
      dataIndex: 'modifier',
    },
    {
      title: '修改时间',
      dataIndex: 'modified',
      render: (text: number) => moment(Number(text)).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];
  return (
    <div className={styles.container}>
      <BizTable
        rowKey="id"
        dataSource={list}
        columns={columns}
        pagination={{ total, current: pageNo, pageSize }}
        loading={loadingList}
        scroll={{ x: BIZ.SCROLL_X }}
      />
    </div>
  );
};

const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

List.getLayout = getLayout;

export default List;
