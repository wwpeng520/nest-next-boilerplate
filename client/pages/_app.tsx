import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import withReduxSaga from 'next-redux-saga';
import wrapper from '../store';
import 'moment/locale/zh-cn';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
    </ConfigProvider>,
  );
};

// export default App;
export default wrapper.withRedux(withReduxSaga(MyApp));
