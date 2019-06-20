import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import display from '@/components/display'
import index from '../index'
import KnowledgeData from '../KnowledgeData'
import Search from '../Search'
import SVGForceGraph from '../SVGForceGraph'
import DomainConceptRetrieval from '../DomainConceptRetrieval'
import EntityLink from '../EntityLink'
import EntityRecognition from '../EntityRecognition'
import SentenceClassification from '../SentenceClassification'
import ElementGraph from '../showElementsGraph'

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
      path: '/SVGForceGraph/:id',
      name: 'SVGForceGraph',
      component: SVGForceGraph
    },
    {
      path: '/ConceptGraphExtraction',
      name: 'DomainConceptRetrieval',
      component: DomainConceptRetrieval
    },
    {
      path: '/EntityLink',
      name: 'EntityLink',
      component: EntityLink
    },
    {
      path: '/EntityRecognition',
      name: 'EntityRecognition',
      component: EntityRecognition
    },
    {
      path: '/KnowledgePatternPrediction',
      name: 'SentenceClassification',
      component: SentenceClassification
    },
    {
      path: '/ElementGraph/:id',
      name: 'ElementGraph',
      component: ElementGraph
    }
  ]
})
