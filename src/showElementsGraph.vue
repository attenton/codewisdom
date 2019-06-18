<template>
    <div id='neo4jd3'>
    </div>
</template>

<script>
import Neo4jD3 from '../static/neo4jd3'
import axios from 'axios'

export default {
  name: 'showElementsGraph',
  data () {
    return {
      nodeData: {},
      neo4jd3: null,
      nodes: [],
      edges: [],
      id: null,
      startData: {
        'nodes': [
          {
            'id': '1',
            'labels': ['User'],
            'properties': {
              'userId': 'eisman'
            }
          },
          {
            'id': '8',
            'labels': ['Project'],
            'properties': {
              'name': 'neo4jd3',
              'title': 'neo4jd3.js',
              'description': 'Neo4j graph visualization using D3.js.',
              'url': 'https://eisman.github.io/neo4jd3'
            }
          }
        ],
        'relationships': [
          {
            'id': '7',
            'type': 'DEVELOPES',
            'startNode': '1',
            'endNode': '8',
            'properties': {
              'from': 1470002400000
            },
            'source': '1',
            'target': '8',
            'linknum': 1
          }
        ]
      }
    }
  },
  methods: {
    init () {
      this.neo4jd3 = new Neo4jD3('#neo4jd3', {
        neo4jData: this.startData,
        icons: {},
        images: {},
        minCollision: 60,
        nodeRadius: 25,
        onRelationshipDoubleClick: function (relationship) {
          console.log('double click on relationship: ' + JSON.stringify(relationship))
        },
        zoomFit: true
      })
    },
    dataUpdate (dataNode) {
      this.neo4jd3.updateWithD3Data(this.nodeData)
    },
    data2D3Data (data) {
      let oriTerms = data['terms']
      let oriRelations = data['relations']
      let nodes = []
      let relations = []
      oriTerms.forEach(function (term, index) {
        nodes.push({'id': index, 'labels': [term]})
      })
      oriRelations.forEach(function (relation, index) {
        relations.push({'id': index, 'type': relation[1], 'startNode': relation[0], 'endNode': relation[2], 'linknum': 1})
      })
      return {
        'nodes': nodes,
        'relationships': relations
      }
    },
    // eslint-disable-next-line no-undef
    get_expand_node (id) {
      axios
        .post('http://bigcode.fudan.edu.cn/kg-debug/expandNode/', {id: id})
        .then(response => {
          console.log(response)
          response.data.relations.forEach((relation) => {
            let edge = {}
            edge.target = relation.end_id
            edge.source = relation.start_id
            edge.id = relation.id
            edge.name = relation.name
            this.$set(this.edges, this.edges.length, edge)
          })
          response.data.nodes.forEach((relatedNode) => {
            let node = {}
            node.id = relatedNode.id
            node.name = relatedNode.name
            node.labels = relatedNode.labels
            this.$set(this.nodes, this.nodes.length, node)
          })
          console.log('nodes')
          console.log(this.nodes)
          console.log('edges')
          console.log(this.edges)
          this.neo4jd3.updateWithD3Data({'nodes': this.nodes, 'relationships': this.edges})
        })
        .catch(error => console.log(error))
    }
  },
  mounted () {
    this.init()
    this.get_expand_node(this.id)
  },
  created () {
    this.id = this.$route.params.id
  },
  watch: {
    '$route': function () {
      this.id = this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>
