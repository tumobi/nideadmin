// 菜单配置
const menu = [
  {
    name: '控制台',
    icon: '',
    active: false,
    route: 'home_summary',
    children: [
      {
        name: '今日概况',
        icon: 'ios-color-palette-outline',
        active: false,
        route: 'home_summary'
      },
      {
        name: '待办事项',
        icon: 'ios-list-box-outline',
        active: false,
        route: 'home_todo'
      },
      {
        name: '常用操作',
        icon: 'ios-apps-outline',
        active: false,
        route: 'home_common-function'
      }
    ]
  },
  {
    name: '内容',
    icon: '',
    active: false,
    route: 'content_management',
    children: [
      {
        name: '内容管理',
        icon: 'ios-cube-outline',
        active: false,
        route: 'content_management'
      }
    ]
  },
  {
    name: '用户',
    icon: '',
    active: false,
    route: 'user_management',
    children: [
      {
        name: '用户管理',
        icon: 'ios-contact-outline',
        active: false,
        route: 'user_management'
      }
    ]
  },
  {
    name: '工具',
    icon: '',
    active: false,
    route: 'tool_update-cache',
    children: [
      {
        name: '更新缓存',
        icon: 'ios-refresh',
        active: false,
        route: 'tool_update-cache'
      }
    ]
  },
  {
    name: '统计',
    icon: '',
    active: false,
    route: 'statistics_summary',
    children: [
      {
        name: '统计概况',
        icon: 'ios-color-palette-outline',
        active: false,
        route: 'statistics_summary'
      }
    ]
  },
  {
    name: '设置',
    icon: '',
    active: false,
    route: 'setting_site-info',
    children: [
      {
        name: '站点信息',
        icon: 'ios-color-palette-outline',
        active: false,
        route: 'setting_site-info'
      }
    ]
  }
]

export default menu
