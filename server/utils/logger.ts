import log4js from 'log4js';
import zone from 'zone-context';
import os from 'os';

const pkgName = 'demoweb';

log4js.configure({
  appenders: {
    file: {
      type: 'dateFile',
      layout: {
        type: 'pattern',
        pattern: `%d{yyyy-MM-dd hh:mm:ss,SSS} %p [${pkgName}] [main] [%f:%l] - trace[%x{tradeId}] %m`,
        tokens: {
          tradeId: function () {
            const tradeId = zone.get('tradeId');
            return tradeId ? `${tradeId['uber-trace-id']}` : '';
          },
        },
      },
      filename: `./logs/${os.hostname()}.log`,
      maxLogSize: 1024 * 1024 * 10,
      backups: 100,
    },
    system: {
      type: 'dateFile',
      layout: {
        type: 'pattern',
        pattern: `%d{yyyy-MM-dd hh:mm:ss,SSS} %p [${pkgName}] [main] [%f:%l] -  trace[%x{tradeId}] %m`,
        tokens: {
          tradeId: function () {
            const tradeId = zone.get('tradeId');
            return tradeId ? `${tradeId['uber-trace-id']}` : '';
          },
        },
      },
      filename: `./logs/${os.hostname()}.sys`,
      maxLogSize: 1024 * 1024 * 10,
      backups: 100,
    },
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: `%[%d{yyyy-MM-dd hh:mm:ss,SSS} - %m%]`,
      },
    },
  },
  categories: {
    // @ts-ignore
    default: { appenders: ['file'], level: 'debug', enableCallStack: true },
    system: { appenders: ['system'], level: 'debug', enableCallStack: true },
    console: { appenders: ['console'], level: 'debug' },
  },
});
export default log4js;
