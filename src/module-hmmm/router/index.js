import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/base', // 一级路由
    component: Layout,
    redirect: 'noredirect',
    name: 'base',
    meta: {
      title: '后台管理',
      icon: 'people'
    },
    children: [// 二级路由
      {
        path: 'users',
        component: _import('hmmm/components/users'),
        name: 'base-users',
        meta: { title: '用户', noCache: true, icon: 'component' }
      },
      {
        path: 'menus',
        component: _import('hmmm/components/menus'),
        name: 'base-menus',
        meta: { title: '菜单', noCache: true, icon: 'component' }
      },
      {
        path: 'permission',
        name: 'base-permission',
        component: _import('hmmm/components/permission'),
        meta: { title: '权限', noCache: true, icon: 'component' }
      },
      {
        path: 'logs',
        name: 'base-logs',
        component: _import('hmmm/components/logs'),
        meta: { title: '日志', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/companys',
    component: Layout,
    redirect: 'noredirect',
    name: 'companys',
    alwaysShow: true,
    meta: {
      title: '企业管理',
      icon: 'component'
    },
    children: [
      {
        path: 'list',
        component: _import('hmmm/components/companys'),
        name: 'companys-list',
        meta: { title: '企业列表', noCache: true, icon: 'peoples' }
      }
    ]
  },
  {
    path: '/questions',
    component: Layout,
    redirect: 'noredirect',
    name: 'questions',
    meta: {
      title: '题库管理',
      icon: 'documentation'
    },
    children: [
      {
        path: 'list',
        component: _import('hmmm/components/questions'),
        name: 'questions-list',
        meta: { title: '基础题库', noCache: true, icon: 'component' }
      },
      {
        path: 'choice',
        component: _import('hmmm/components/questions-choice'),
        name: 'questions-choice',
        meta: { title: '精选题库', noCache: true, icon: 'component' }
      },
      {
        path: 'new',
        component: _import('hmmm/components/questions-new'),
        name: 'questions-new',
        meta: { title: '试题录入', noCache: true, icon: 'component' }
      },
      {
        path: 'randoms',
        component: _import('hmmm/components/questions-randoms'),
        name: 'questions-randoms',
        meta: { title: '组题列表', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/subjects',
    component: Layout,
    redirect: 'noredirect',
    name: 'subjects',
    meta: {
      title: '学科管理',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        component: _import('hmmm/components/subjects'),
        name: 'subjects-list',
        meta: { title: '学科', noCache: true, icon: 'component' }
      },
      {
        path: 'directorys',
        component: _import('hmmm/components/directorys'),
        name: 'subjects-directorys',
        meta: { title: '目录', noCache: true, icon: 'component' }
      },
      {
        path: 'tags',
        component: _import('hmmm/components/tags'),
        name: 'subjects-tags',
        meta: { title: '标签', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/articles',
    component: Layout,
    redirect: 'noredirect',
    name: 'articles',
    alwaysShow: true,
    meta: {
      title: '面试题管理',
      icon: 'form'
    },
    children: [
      {
        path: 'list',
        component: _import('hmmm/components/articles'),
        name: 'articles-list',
        meta: { title: '面试技巧', noCache: true, icon: 'component' }
      }
    ]
  }
]
