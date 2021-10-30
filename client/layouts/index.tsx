import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  // actLogin, selectAuthUserInfo,
  setLoginToken,
  selectLoginToken,
} from '@/client/store/slices/authority.slice';
import styles from './index.module.less';

// const isDev = process.env.NODE_ENV === 'development';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { query = {} } = useRouter();
  // const authUserInfo = useSelector(selectAuthUserInfo);
  const loginToken = useSelector(selectLoginToken);

  useEffect(() => {
    if (!loginToken && query.loginToken) {
      dispatch(setLoginToken(query.loginToken));
    }
  }, [dispatch, loginToken, query.loginToken]);

  // useEffect(() => {
  //   if (isDev && !authUserInfo) {
  //     dispatch(
  //       actLogin({
  //         account: 'health', // health, health_common_user, health_agency_admin
  //         password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', // 123456 SHA256
  //         appId: 'health',
  //       }),
  //     );
  //   }
  // }, [dispatch, authUserInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default Layout;
