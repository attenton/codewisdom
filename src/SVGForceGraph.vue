<template>
    <div id="graph" class="container">
      <div id="svg_graph"></div>
    </div>
</template>

<script>
import axios from 'axios'
import * as d3 from 'd3'
// import '../assets/labelCorlor.js'

export default {
  name: 'SVGForceGraph',
  // props: {
  //   SVG_graphData: {
  //     type: String,
  //     default: '0'
  //   }
  // },
  data () {
    return {
      id: 0,
      nodes: [],
      edges: [],
      sim: null,
      g: null,
      link_distance: 90,
      svg_links: null,
      svg_nodes: null,
      svg_texts: null
    }
  },
  methods: {
    getNodeRelation (id) {
      axios
        .post('http://bigcode.fudan.edu.cn/kg-debug/expandNode/', {id: id})
        .then(response => {
          this.edges = []
          this.nodes = []
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
          this.force_graph_init()
        })
        .catch(error => console.log(error))
    },
    force_graph_init () {
      this.width = 800
      this.height = 600
      // init svg
      var svg = d3.select('#svg_graph')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .call(d3.zoom()
          .scaleExtent([-5, 2])
          // for zoom transform
          .on('zoom', this.zoom_actions))
      this.g = svg.append('g')
        .attr('class', 'svg_graph_container')
      // init links
      this.sim = d3.forceSimulation(this.nodes).force('center', d3.forceCenter(this.width / 2, this.height / 2))
      this.sim.force('charge', d3.forceManyBody().strength(-90))
        .force('collide', d3.forceCollide(2 * 9))
        .force('link', d3.forceLink().id(d => { return d.id }).distance(this.link_distance))
      this.sim.force('link').links(this.edges)
      this.svg_links = this.g.append('g')
        .attr('class', 'edges')
        .selectAll('line')
        .data(this.edges)
        .enter()
        .append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
      this.svg_nodes = this.g.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.nodes)
        .enter()
        .append('circle')
        .attr('r', '21')
        .style('fill', function (d) {
          switch (d.labels[0]) {
            case 'Software Concept': return '#1e88e4'
            case 'Descriptive Knowledge': return '#4DCF74'
            case 'API Concept': return '#BFD0E0'
            case 'API Package': return '#E9B872'
            case 'API Class': return '#3CBBB1'
            case 'API Interface': return '#DD1C1A'
            case 'API Field': return '#6369D1'
            case 'API Method': return '#105C38'
            case 'API Parameter': return '#454C63'
            case 'API Return Value': return '#B84569'
            case 'Exception': return '#7697C2'
          }
          console.log(this.labelColor(d.labels[0]))
          // return 'red'
        })
        .style('stroke', '#D1D1D1')
        .style('stroke-width', 2)
        .call(
          d3.drag()
            .on('start', this.start_drag)
            .on('drag', this.drag_effect)
            .on('end', this.end_drag)
        )
      this.svg_texts = this.g.append('g')
        .selectAll('text')
        .data(this.nodes)
        .enter()
        .append('text')
        .style('fill', 'black')
        .attr('dx', 0)
        .attr('dy', 7)
        .style('font-family', 'Raleway')
        .attr('pointer-events', 'none')
        .attr('text-anchor', 'middle')
        .text(function (d) {
          return d.name
        })
      this.sim.on('tick', this.ticked)
    },
    ticked () {
      this.svg_links
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })
      this.svg_nodes
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
      this.svg_texts
        .attr('x', function (d) { return d.x })
        .attr('y', function (d) { return d.y })
    },
    zoom_actions () {
      this.g.attr('transform', d3.event.transform)
    },
    // get the focused circle
    start_drag () {
      d3.event.active || this.sim.alphaTarget(0.3).restart()
      d3.event.subject.fx = d3.event.subject.x
      d3.event.subject.fy = d3.event.subject.y
    },
    drag_effect () {
      d3.event.subject.fx = d3.event.x
      d3.event.subject.fy = d3.event.y
    },
    end_drag () {
      d3.event.active || this.sim.alphaTarget(0)
      d3.event.subject.fx = null
      d3.event.subject.fy = null
    },
    labelColor (node) {
      switch (node) {
        case 'Software Concept': return '#1e88e4'
        case 'Descriptive Knowledge': return '#4DCF74'
        case 'API Concept': return '#BFD0E0'
        case 'API Package': return '#E9B872'
        case 'API Class': return '#3CBBB1'
        case 'API Interface': return '#DD1C1A'
        case 'API Field': return '#6369D1'
        case 'API Method': return '#105C38'
        case 'API Parameter': return '#454C63'
        case 'API Return Value': return '#B84569'
        case 'Exception': return '#7697C2'
      }
    }
  },
  mounted () {
    this.getNodeRelation(this.id)
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
@import "assets/font/Raleway.css";
.svg_graph_container{
  margin: 0 auto;
}
</style>
