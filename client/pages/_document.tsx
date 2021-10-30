import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class Doc extends Document {
  render() {
    return (
      <Html>
        <title>测试服务</title>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
