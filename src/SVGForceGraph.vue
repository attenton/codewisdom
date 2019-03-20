<template>
    <div id="graph" class="container">
      <div id="svg_graph" v-loading="loading"></div>
    </div>
</template>

<script>
import axios from 'axios'
import * as d3 from 'd3'
// import { Notification } from 'element-ui'
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
      svg: null,
      g: null,
      link_distance: 90,
      svg_links: null,
      svg_nodes: null,
      svg_texts: null,
      loading: true
    }
  },
  methods: {
    getNodeRelation (id) {
      axios
        .post('http://bigcode.fudan.edu.cn/kg-debug/expandNode/', {id: id})
        .then(response => {
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
      this.svg = d3.select('#svg_graph')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .call(d3.zoom()
          .scaleExtent([-5, 2])
          // for zoom transform
          .on('zoom', this.zoom_actions))
      this.g = this.svg.append('g')
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
      this.svg_nodes = this.g.append('g').attr('class', 'nodes')
      this.nodes.forEach(node => {
        this.svg_nodes.append('g')
          .attr('class', 'node')
          .attr('node_id', node.id)
          .data(node)
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
      })
      this.svg_nodes = this.g.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.nodes)
        .enter()
        .append('circle')
        .attr('r', '21')
        .attr('node_id', function (d) {
          return d.id
        })
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
        .attr('class', 'SVGtext')
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
      this.loading = false
    },
    updateGraph () {
      let svgNode = this.svg_nodes.selectAll('circle').data(this.nodes, d => d)
      svgNode.exit().remove()
      this.svg_nodes = svgNode
      // svgNode.exit().remove()
      console.log(this.nodes)
      let nodeEnter = svgNode
        .enter()
        .append('circle')
        .attr('r', '21')
        .attr('node_id', function (d) {
          return d.id
        })
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
      this.svg_nodes = nodeEnter.merge(svgNode)
      this.svg_links.selectAll('line')
        .data(this.edges)
        .enter()
        .append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
      this.svg_texts.selectAll('text')
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
      // this.g.selectAll('circle').on('click', function (d) {
      //   let id = d.id
      //   // let _this = this
      //   axios
      //     .post('http://bigcode.fudan.edu.cn/kg-debug/getNodeByID/', {id: id})
      //     .then(response => {
      //       let data = response.data
      //       console.log(response)
      //       Notification({
      //         title: d.name,
      //         // message: d.name
      //         dangerouslyUseHTMLString: true,
      //         message: '<span class="node_tag" style=" color: ' + '#1e88e4' + ' ">' + data.labels[0] + '</span><br>' +
      //           '<a href="/KnowledgeData/ ' + id + '">ID: ' + id + '</a><br>',
      //         duration: 0
      //       })
      //     })
      // })
      this.svg.on('dblclick.zoom', null)
      let _this = this
      this.g.selectAll('circle').on('dblclick', function (d) {
        let id = d.id
        axios
          .post('http://bigcode.fudan.edu.cn/kg-debug/expandNode/', {id: id})
          .then(response => {
            let edgesId = _this.edges.id
            let NodeId = _this.nodes.id
            console.log(NodeId)
            for (let i = 0; i < response.data.relations.length; i++) {
              let relation = response.data.relations[i]
              if (edgesId.find(relation.id)) {
                continue
              }
              let edge = {}
              edge.target = relation.end_id
              edge.source = relation.start_id
              edge.id = relation.id
              edge.name = relation.name
              _this.$set(_this.edges, _this.edges.length, edge)
            }
            for (let i = 0; i < response.data.nodes.length; i++) {
              let relatedNode = response.data.nodes[i]
              if (NodeId.find(relatedNode.id)) continue
              let node = {}
              node.id = relatedNode.id
              node.name = relatedNode.name
              node.labels = relatedNode.labels
              _this.$set(_this.nodes, _this.nodes.length, node)
            }
            _this.updateGraph()
          })
          .catch(error => console.log(error))
      })
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
    // expand (e) {
    //   if (e.target.class === 'node') {
    //
    //   }
    // }
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
.node_tag{
  display: inline-block;
  height: 28px;
  line-height: 28px;
  border-radius: 3px;
  color: #fff !important;
  background-color: #1e88e4;
  padding: 0px 10px;
  white-space: nowrap;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
</style>
