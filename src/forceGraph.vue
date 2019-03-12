<template>
  <div id='force_graph'>
    <h1>ForceGraph</h1>
    <div id='graph_canvas'>
      <canvas ref="canvas" height=600 width=1300></canvas>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import axios from 'axios'

export default {
  name: 'forceGraph',
  data () {
    return {
      id: null,
      nodes: [],
      edges: [],
      // nodes: [
      //   {id: 1, name: 'javascript.lang.hello.you', color: 'pink'},
      //   {id: 2, name: 'java', color: 'green'},
      //   {id: 3, name: 'c++', color: 'blue'},
      //   {id: 4, name: 'python', color: 'grey'},
      //   {id: 5, name: 'php1', color: 'red'},
      //   {id: 6, name: 'php2', color: 'red'},
      //   {id: 7, name: 'php3', color: 'red'},
      //   {id: 8, name: 'php4', color: 'red'},
      //   {id: 9, name: 'php5', color: 'red'},
      //   {id: 10, name: 'php6', color: 'red'},
      //   {id: 11, name: 'php7', color: 'red'},
      //   {id: 12, name: 'php8', color: 'red'},
      //   {id: 13, name: 'php9', color: 'red'},
      //   {id: 14, name: 'php10', color: 'red'},
      //   {id: 15, name: 'php11', color: 'red'},
      //   {id: 16, name: 'php12', color: 'red'},
      //   {id: 17, name: 'php13', color: 'red'},
      //   {id: 18, name: 'php14', color: 'red'},
      //   {id: 19, name: 'php15', color: 'red'},
      //   {id: 20, name: 'php16', color: 'red'},
      //   {id: 21, name: 'php17', color: 'red'},
      //   {id: 22, name: 'php18', color: 'red'},
      //   {id: 23, name: 'php19', color: 'red'},
      //   {id: 24, name: 'php20', color: 'red'},
      //   {id: 25, name: 'php21', color: 'red'}
      // ],
      // edges: [
      //   {source: 1, target: 3, label: 'has class'},
      //   {source: 1, target: 4, label: 'has class'},
      //   {source: 1, target: 2, label: 'has class'},
      //   {source: 1, target: 5, label: 'has class'},
      //   {source: 1, target: 6, label: 'has class'},
      //   {source: 1, target: 7, label: 'has class'},
      //   {source: 1, target: 8, label: 'has class'},
      //   {source: 1, target: 9, label: 'has class'},
      //   {source: 1, target: 10, label: 'has class'},
      //   {source: 1, target: 11, label: 'has cname'},
      //   {source: 1, target: 12, label: 'has class'},
      //   {source: 1, target: 13, label: 'has class'},
      //   {source: 1, target: 14, label: 'has class'},
      //   {source: 1, target: 15, label: 'has cname'},
      //   {source: 1, target: 16, label: 'has class'},
      //   {source: 1, target: 17, label: 'has class'},
      //   {source: 1, target: 18, label: 'has class'},
      //   {source: 1, target: 19, label: 'has class'},
      //   {source: 1, target: 20, label: 'has cname'},
      //   {source: 1, target: 21, label: 'has class'},
      //   {source: 1, target: 22, label: 'has class'},
      //   {source: 1, target: 23, label: 'has class'},
      //   {source: 1, target: 24, label: 'has class'},
      //   {source: 1, target: 25, label: 'has cname'}
      // ],
      graph: null,
      width: null,
      height: null,
      strength: -60,
      link_distance: 90,
      canvas: document.querySelector('canvas'),
      e: null,
      getIterator: null
    }
  },
  methods: {
    getId () {
      this.id = this.$route.params.id
    },
    // get central node
    getNodeData (id) {
      let node = {}
      axios
        .post('http://bigcode.fudan.edu.cn/kg/getNodeByID/', {id: id})
        .then(response => {
          node.id = response.data['id']
          node.name = response.data['name']
          node.label = response.data['labels']
          this.$set(this.nodes, this.nodes.length, node)
        })
        .catch(error => console.log(error))
    },
    rec_getNodeRelation (id, data) {
      if (this.iterator >= 0) {
        axios
          .post('http://bigcode.fudan.edu.cn/kg/getNodeByID/', {id: data[this.iterator].end_id})
          .then(response => {
            let node = {}
            let edge = {}
            node.id = response.data['id']
            node.name = response.data['name']
            node.lable = response.data['labels']
            edge.target = node.id
            edge.id = data[this.iterator].id
            edge.source = id
            edge.label = data[this.iterator].name
            this.$set(this.nodes, this.nodes.length, node)
            this.$set(this.edges, this.edges.length, edge)
            this.iterator = this.iterator--
            this.rec_getNodeRelation(id, data, this.iterator)
          })
          .catch(error => console.log(error))
      }
      if (this.iterator < 0) this.force_graph_init()
    },
    // get related nodes
    getNodeRelation (id) {
      axios
        .post('http://bigcode.fudan.edu.cn/kg/GetOutRelation/', {id: id, page_number: 0})
        .then(response => {
          this.iterator = response.data.relations.length - 1
          this.rec_getNodeRelation(id, response.data.relations)
          // if (this.iterator < 0) this.force_graph_init()
          // response.data.relations.forEach((relation) => {
          //   axios
          //     .post('http://bigcode.fudan.edu.cn/kg/getNodeByID/', {id: relation.end_id})
          //     .then(response2 => {
          //       let node = {}
          //       let edge = {}
          //       node.id = response2.data['id']
          //       node.name = response2.data['name']
          //       node.lable = response2.data['labels']
          //       edge.target = node.id
          //       edge.id = relation.id
          //       edge.source = id
          //       edge.label = relation.name
          //       this.$set(this.nodes, this.nodes.length, node)
          //       this.$set(this.edges, this.edges.length, edge)
          //     })
          //    .catch(error => console.log(error))
          // }
          // )
        })
        .catch(error => console.log(error))
    },
    // graph init
    force_graph_init () {
      const canvas = document.querySelector('canvas')
      this.e = canvas.getContext('2d')
      this.width = canvas.width
      this.height = canvas.height
      this.graph = d3.forceSimulation(this.nodes).force('center', d3.forceCenter(this.width / 2, this.height / 2))
      this.graph.force('charge', d3.forceManyBody())
        .force('collide', d3.forceCollide(2 * 15))
        .force('link', d3.forceLink().id(d => { return d.id }).distance(this.link_distance))
      this.graph.on('tick', this.render)
      this.graph.force('link').links(this.edges)
      this.initDrag()
      this.restart()
    },
    // create canvas
    render () {
      this.e = document.querySelector('canvas').getContext('2d')
      this.e.clearRect(0, 0, this.width, this.height)
      this.e.lineWidth = 2
      this.e.strokeStyle = 'brown'
      this.e.beginPath()
      this.edges.forEach(a => {
        this.e.strokeStyle = this.label2color(a.label)
        this.e.moveTo(a.source.x, a.source.y)
        this.e.lineTo(a.target.x, a.target.y)
        this.e.stroke()
      })
      this.e.lineWidth = 3
      this.e.strokeStyle = 'white'
      this.nodes.forEach(a => {
        this.e.fillStyle = a.color
        this.e.beginPath()
        this.e.arc(a.x, a.y, 20, 0, 2 * Math.PI)
        this.e.fill()
        this.e.stroke()
      })
      this.e.font = '14px Comic Sans MS'
      this.e.fillStyle = 'black'
      this.e.textAlign = 'center'
      this.nodes.forEach(a => {
        this.e.fillText(a.name, a.x, a.y + 2.5 * 2)
      })
    },
    // set line color
    label2color (label) {
      if (label[0] === 'Software Concept') return 'blue'
      if (label[0] === 'has cname') return 'black'
    },
    // init drag action
    initDrag () {
      let canvas = document.querySelector('canvas')
      d3.select(canvas).call(
        d3.drag().container(canvas)
          .subject(this.find_subject)
          .on('start', this.start_drag).on('drag', this.drag_effect).on('end', this.end_drag))
    },
    // get the focused circle
    find_subject () {
      return this.graph.find(d3.event.x, d3.event.y)
    },
    start_drag () {
      d3.event.active || this.graph.alphaTarget(0.3).restart()
      d3.event.subject.fx = d3.event.subject.x
      d3.event.subject.fy = d3.event.subject.y
    },
    drag_effect () {
      d3.event.subject.fx = d3.event.x
      d3.event.subject.fy = d3.event.y
    },
    end_drag () {
      d3.event.active || this.graph.alphaTarget(0)
      d3.event.subject.fx = null
      d3.event.subject.fy = null
    },
    run () {
      this.graph.restart()
    },
    restart () {
      this.graph.alpha(1)
      this.run()
    }
  },
  mounted () {
    this.getNodeData(this.id)
    this.getNodeRelation(this.id)
  },
  created () {
    this.getId()
  },
  watch: {
    nodes: function () {
      console.log('nodes:')
      console.log(this.nodes)
      console.log('edges')
      console.log(this.edges)
      this.force_graph_init()
      this.run()
    }
  }
}
</script>

<style scoped>
#graph_canvas {
  width: 1300px;
  margin: 20px auto;
}
</style>
