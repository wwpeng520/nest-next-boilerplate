// 项目是集成在系统平台的还是独立系统的
export enum Platform {
  intact, // 独立系统
  subsystem, // 集成平台的
}

const COLOR_MAP = {
  [Platform.intact]: {
    primary: '#457FD6',
    error: '#F54645',
    warn: '#FEC400',
    success: '#1BAD73',
  },
  [Platform.subsystem]: {
    primary: '#13939E',
    error: '#D40000',
    warn: '#F1924E',
    success: '#2DA641',
  },
};

export const COLORS = COLOR_MAP[Platform.subsystem];

export default {
  'primary-color': COLORS.primary,
  'color-error': COLORS.error,
  'color-warn': COLORS.warn,
  'color-success': COLORS.success,
  'color-gray': '#7B7F8D',
  'icon-color-base': '#A7ABB7', // 图标 icon 主色
  'font-color': '#1F212A', // 文字主颜色
  'label-color': '#4C5162', // 输入框前的提示文案，内容展示前的 label 等
  'border-color': '#DEDFE0',
  'border-lighter': '#EBEDF4',
  'table-active-color': '#F8F9FA',
  'table-hover-color': '#E8EFFA',
  'value-bg-color': '#F5F6F7', // 表单等信息非编辑时有淡色背景
  'height-lg': '52px',
  'header-height': '40px',
  'sider-width': '240px', // 三级菜单（页面左侧 Sider）的宽度
};
