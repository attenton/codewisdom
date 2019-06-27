<template>
    <div id='neo4jd3' v-loading="loading">
    </div>
</template>

<script>
import { Neo4jD3 } from './neo4j'
import axios from 'axios'

export default {
  name: 'showElementsGraph',
  props: {
    graphData: {
      type: String,
      default: '0'
    },
    extend: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      nodeData: {},
      neo4jd3: null,
      nodes: [],
      edges: [],
      id: null,
      startData: {
        // 'nodes': [
        //   {
        //     'id': 316472,
        //     'labels': [
        //       'Software Concept'
        //     ],
        //     'majority_properties': {
        //       'Commons category': [
        //         'GPL'
        //       ]
        //     },
        //     'name': 'hello'
        //   },
        //   {
        //     'id': 88740,
        //     'labels': [
        //       'Software Concept'
        //     ],
        //     'majority_properties': {
        //       'description': 'computer program for editing HTML',
        //       'name': 'HTML editor',
        //       'wd item id': 'Q726761'
        //     },
        //     'name': 'HTML editor',
        //     'properties': {
        //       'Freebase ID': [
        //         '/m/0161z0'
        //       ]
        //     }
        //   },
        //   {
        //     'id': 94002,
        //     'labels': [
        //       'Software Concept'
        //     ],
        //     'majority_properties': {
        //       'Commons category': [
        //         'KompoZer'
        //       ],
        //       'Commons gallery': [
        //         'KompoZer'
        //       ],
        //       'Quora topic ID': [
        //         'Kompozer'
        //       ],
        //       'SourceForge project': [
        //         'kompozer'
        //       ],
        //       'description': 'WYSIWYG HTML editor',
        //       'image': [
        //         'KompoZer nahled.png'
        //       ],
        //       'name': 'KompoZer',
        //       'official website': [
        //         'http://www.kompozer.net'
        //       ],
        //       'source code repository': [
        //         'http://hg.code.sf.net/p/kompozer/code'
        //       ],
        //       'wd item id': 'Q161834'
        //     },
        //     'name': 'KompoZer',
        //     'properties': {
        //       'Commons category': [
        //         'KompoZer'
        //       ],
        //       'Commons gallery': [
        //         'KompoZer'
        //       ]
        //     }
        //   }
        // ],
        // 'relationships': [
        //   {
        //     'target': 316472,
        //     'id': 273605,
        //     'type': 'license',
        //     'source': 94002,
        //     'properties': {}
        //   },
        //   {
        //     'target': 88740,
        //     'id': 143489,
        //     'type': 'instance of',
        //     'source': 94002,
        //     'properties': {}
        //   }
        // ]
      }
    }
  },
  methods: {
    init_single () {
      axios
        .post('http://bigcode.fudan.edu.cn/kg/api/graph/getNodeByID/', {id: this.id})
        .then(response => {
          this.init()
        })
        .catch(error => console.error(error))
    },
    init_extend () {
      axios
        .post('http://bigcode.fudan.edu.cn/kg/api/graph/expandNode/', {id: this.id})
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
            edge.properties = relation.properties
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
          this.startData = {'nodes': this.nodes, 'relationships': this.edges}
          // this.neo4jd3.updateWithD3Data(this.startData)
          this.init()
        })
        .catch(error => console.error(error))
    },
    init () {
      let _this = this
      this.neo4jd3 = new Neo4jD3('#neo4jd3', {
        D3Data: this.startData,
        icons: {
        },
        images: {
        },
        minCollision: 60,
        nodeRadius: 25,
        onNodeDoubleClick: function (node) {
          this.loading = true
          _this.get_expand_node(node.id)
        },
        onRelationshipDoubleClick: function (relationship) {
          console.log('double click on relationship: ' + JSON.stringify(relationship))
        }
      })
    },
    get_expand_node (id) {
      axios
        .post('http://bigcode.fudan.edu.cn/kg/api/graph/expandNode/', {id: id})
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
            edge.properties = relation.properties
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
          // this.startData = {'nodes': this.nodes, 'relationships': this.edges}
          // this.neo4jd3.updateWithD3Data(this.startData)
          // this.init()
          this.neo4jd3.updateWithD3Data({'nodes': this.nodes, 'relationships': this.edges})
          this.loading = false
        })
        .catch(error => console.log(error))
    }
  },
  mounted () {
    if (this.extend === true) {
      this.init_extend()
    } else {
      this.init_single()
    }
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
  height: 100%;
  width: 100%;
  /*margin: 50px auto;*/
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
}
.neo4jd3 {
  height: 100%;
  width: 100%;
  overflow: hidden;
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
