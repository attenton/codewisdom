import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import display from '@/components/display'
import index from '../index'
import KnowledgeData from '../KnowledgeData'
import Search from '../Search'
import graph from '../graph'
import forceGraph from '../forceGraph'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/df',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/display',
      name: 'display',
      component: display
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/KnowledgeData/:id',
      name: 'KnowledgeData',
      component: KnowledgeData
    },
    {
      path: '/graph/:id',
      name: 'graph',
      component: graph
    },
    {
      path: '/forceGraph/:id',
      name: 'forceGraph',
      component: forceGraph
    }
  ]
})
