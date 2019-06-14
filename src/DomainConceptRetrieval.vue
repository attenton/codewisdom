<template>
  <div id="DCR">
    <div id="content">
      <h1 id="title" style="text-align: center">Domain Concept Retrieval</h1>
      <div id="input_frame">
        <div class="codemirror">
          <codemirror ref="myCm" v-model="text" :options="cmOptions"></codemirror>
        </div>
        <el-button id="extract" type="success" @click="extract">Extract Entity</el-button>
      </div>
      <div id="Entity">
        <h2>Relations</h2>
        <el-table :data="relations"></el-table>
      </div>
    </div>
  </div>
</template>

<script>
import GraphData from './forceGraph'
import axios from 'axios'
import {codemirror, CodeMirror} from 'vue-codemirror'
// language js
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/paraiso-light.css'

export default {
  name: 'DomainConceptRetrieval',
  components: {GraphData, codemirror, CodeMirror},
  data () {
    // const text = `const bbb = 222;\nconst ccc = 111;\neee fff ggg`
    return {
      text: '',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'paraiso-light',
        lineNumbers: true,
        line: true,
        lineWrapping: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      terms: null,
      relations: null
    }
  },
  methods: {
    onCmReady (cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus (cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange (newCode) {
      console.log('this is new code', newCode)
      this.text = newCode
    },
    extract () {
      axios
        .post('http://127.0.0.1:5000/extractTextEntity/', {text: this.text})
        .then(response => {
          this.terms = response.data.terms
          this.relations = response.data.relations
          console.log(response)
        })
        .catch(error => console.log(error))
    },
    force_graph_init () {
      var canvas = document.querySelector('canvas')
      canvas.width = document.querySelector('#graph').offsetWidth
      canvas.height = canvas.width / 1.5
      this.e = canvas.getContext('2d')
      this.width = canvas.width
      this.height = canvas.height
      this.graph = d3.forceSimulation(this.nodes).force('center', d3.forceCenter(this.width / 2, this.height / 2))
      this.graph.force('charge', d3.forceManyBody())
        .force('collide', d3.forceCollide(this.width / 20))
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
      this.e.lineWidth = 1
      this.e.strokeStyle = 'black'
      this.e.beginPath()
      this.edges.forEach(a => {
        // this.e.strokeStyle = this.label2color(a.label)
        this.e.moveTo(a.source.x, a.source.y)
        this.e.lineTo(a.target.x, a.target.y)
        this.e.stroke()
      })
      this.e.lineWidth = 3
      this.e.strokeStyle = 'white'
      this.nodes.forEach(a => {
        this.e.fillStyle = 'red'
        this.e.beginPath()
        // 起始点坐标，圆的半径，起始角，弧度值
        this.e.arc(a.x, a.y, this.width / 45, 0, 2 * Math.PI)
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
  computed: {
    codemirror () {
      return this.$refs.myCm.codemirror
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
#content{

}
#title{
  margin-top: 40px;
  margin-bottom: 40px;
}
#input_frame{
  width: 600px;
  margin: 20px auto 0 auto;
}
.codemirror{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  /*height: 300px;*/
}
#extract{
  margin-top: 20px;
}
</style>
