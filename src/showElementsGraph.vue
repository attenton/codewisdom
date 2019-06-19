<template>
    <div id='neo4jd3' v-loading="loading">
    </div>
</template>

<script>
import Neo4jD3 from '../static/neo4jd3'
import axios from 'axios'

export default {
  name: 'showElementsGraph',
  data () {
    return {
      loading: true,
      nodeData: {},
      neo4jd3: null,
      nodes: [],
      edges: [],
      id: null,
      startData: {
        'results': [
          {
            'columns': ['user', 'entity'],
            'data': [
              {
                'graph': {
                  'nodes': [],
                  'relationships': []
                }
              }
            ]
          }
        ],
        'error': []
      }
    }
  },
  methods: {
    init () {
      let _this = this
      this.neo4jd3 = new Neo4jD3('#neo4jd3', {
        neo4jData: this.startData,
        icons: {
        },
        images: {
        },
        minCollision: 60,
        nodeRadius: 25,
        onNodeDoubleClick: function (node) {
          _this.get_expand_node(node.id)
        },
        onRelationshipDoubleClick: function (relationship) {
          console.log('double click on relationship: ' + JSON.stringify(relationship))
        },
        zoomFit: true
      })
    },
    // dataUpdate (dataNode) {
    //   this.neo4jd3.updateWithD3Data(this.nodeData)
    // },
    // data2D3Data (data) {
    //   let oriTerms = data['terms']
    //   let oriRelations = data['relations']
    //   let nodes = []
    //   let relations = []
    //   oriTerms.forEach(function (term, index) {
    //     nodes.push({'id': index, 'labels': [term]})
    //   })
    //   oriRelations.forEach(function (relation, index) {
    //     relations.push({'id': index, 'type': relation[1], 'startNode': relation[0], 'endNode': relation[2], 'linknum': 1})
    //   })
    //   return {
    //     'nodes': nodes,
    //     'relationships': relations
    //   }
    // },
    // eslint-disable-next-line no-undef
    get_expand_node (id) {
      axios
        .post('http://bigcode.fudan.edu.cn/kg-debug/expandNode/', {id: id})
        .then(response => {
          console.log(response)
          response.data.relations.forEach((relation) => {
            let edge = {}
            edge.end_id = relation.end_id
            edge.start_id = relation.start_id
            edge.target = relation.end_id
            edge.source = relation.start_id
            edge.id = relation.id
            edge.type = relation.name
            edge.properties = {}
            this.$set(this.edges, this.edges.length, edge)
          })
          response.data.nodes.forEach((relatedNode) => {
            // let node = relatedNode.nodes
            this.$set(this.nodes, this.nodes.length, relatedNode)
          })
          // this.neo4jd3.cleanGraph()
          console.log('nodes')
          console.log(this.nodes)
          console.log('edges')
          console.log(this.edges)
          let data = []
          let graph = {'graph': {'nodes': this.nodes, 'relationships': this.edges}}
          data.push(graph)
          let results = []
          results.push({'data': data})
          this.startData.results = results
          this.neo4jd3.updateWithNeo4jData(this.startData)
          this.loading = false
          // this.neo4jd3.updateWithD3Data({'nodes': this.nodes, 'relationships': this.edges})
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
#neo4jd3{
  height: 500px;
}
.neo4jd3 {
  height: 500px;
  overflow: hidden;
}
* {
  margin: 0px;
  padding: 0px;
}

body {
  font: 13px 'Helvetica Neue',Helvetica,Arial,sans-serif;
  font-size: 20px;
}

.neo4jd3-graph {
  border: 1px solid #ddd;
  border-radius: 5px;
}

.neo4jd3-info {
  font-size: 16px;
  padding: 10px;
  position: absolute;
}
.neo4jd3-info a {
  border: 1px solid;
  display: inline-block;
  font-size: 14px;
  line-height: 1.428571429;
  margin-left: 5px;
  margin-top: 5px;
  padding: 6px 12px;
}
.neo4jd3-info a.class {
  color: white;
}
.neo4jd3-info a.property {
  background-color: #fff;
  border-color: #ccc;
  color: #333;
}
.neo4jd3-info a.btn {
  margin-left: 5px;
  margin-top: 5px;
  opacity: 1;
}
.neo4jd3-info a.info {
  background-color: #a5abb6;
  border: 1px solid #9aa1ac;
  color: white;
}

.node.node-highlighted .ring {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)';
  filter: alpha(opacity=50);
  opacity: .5;
  stroke: #888;
  stroke-width: 12px;
}
.node .outline {
  cursor: pointer;
  fill: #a5abb6;
  pointer-events: all;
  stroke: #9aa1ac;
  stroke-width: 2px;
}
.node .ring {
  fill: none;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  opacity: 0;
  stroke: #6ac6ff;
  stroke-width: 8px;
}
.node .text.icon {
  font-family: FontAwesome;
}

.node.selected .ring,
.node:hover .ring {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';
  filter: alpha(opacity=30);
  opacity: .3;
}

.relationship {
  cursor: default;
}
.relationship line {
  stroke: #aaa;
}
.relationship .outline {
  cursor: default;
}
.relationship .overlay {
  cursor: default;
  fill: #6ac6ff;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  opacity: 0;
}
.relationship text {
  cursor: default;
}

.relationship.selected .overlay,
.relationship:hover .overlay {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';
  filter: alpha(opacity=30);
  opacity: .3;
}

svg {
  cursor: move;
}
</style>
