import HomeSummary from '../views/home/HomeSummary'
import HomeTodo from '../views/home/HomeTodo'
import HomeCommonFunction from '../views/home/HomeCommonFunction'

export default [
  {
    path: '/',
    redirect: '/home/summary'
  },
  {
    path: 'home/summary',
    name: 'home_summary',
    component: HomeSummary
  },
  {
    path: 'home/todo',
    name: 'home_todo',
    component: HomeTodo
  },
  {
    path: 'home/common-function',
    name: 'home_common-function',
    component: HomeCommonFunction
  }
]
