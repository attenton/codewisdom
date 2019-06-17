<template>

</template>

<script>
import d3 from 'd3'
import _ from 'lodash'
import $ from 'jquery'
export default {
  name: 'GraphSVG',
  data () {
    return {
      svg: null,
      timer: null,
      editor: null,
      simulation: null,
      linkGroup: null,
      linktextGroup: null,
      nodeGroup: null,
      nodetextGroup: null,
      nodesymbolGroup: null,
      nodebuttonGroup: null,
      nodebuttonAction: '',
      txx: {},
      tyy: {},
      colorList: ['#ff8373', '#f9c62c', '#a5ca34', '#6fce7a', '#70d3bd', '#ea91b0'],
      color5: '#ff4500',
      predefineColors: ['#ff4500', '#ff8c00', '#90ee90', '#00ced1', '#1e90ff', '#c71585'],
      defaultcr: 30,
      selectnodeid: 0,
      selectnodename: '',
      selectsourcenodeid: 0,
      selecttargetnodeid: 0,
      graph: {
        nodes: [],
        links: []
      },
      graphEntity: {
        uuid: 0,
        name: '',
        color: 'ff4500',
        r: 30,
        x: '',
        y: ''
      },
      dialogFormVisible: false,
      headers: {}
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
