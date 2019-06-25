<template>
    <div id="discover">
      <div id="banner">
        Discover
      </div>
      <div id="content">
        <div id="button-block">
          <button id="random" @click="get_random_node_by_label">Random</button>
        </div>
        <div id="nodes-content">
          <div v-for="(item,index) in nodes" :key="index" class="node">
            <h3>{{item.name}}</h3>
            <el-tag v-for="(label, i) in item.labels" type="item.type" effect="dark" :key="i" @click="query_label(label)">{{label}}</el-tag>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Discover',
  data () {
    return {
      nodes: [],
      label: null
    }
  },
  methods: {
    get_random_node_by_label () {
      axios
        .post('http://bigcode.fudan.edu.cn/kg/api/graph/getRandomNodesByLabel/',  {label: this.label})
        .then(response => {
          this.nodes = response.data.nodes
          console.log(this.nodes)
        })
        .catch(error => console.log(error))
    },
    query_label (label) {
      this.label = label
      console.log('label')
      console.log(label)
      this.get_random_node_by_label()
    }
  },
  mounted () {
    this.get_random_node_by_label()
  }
}
</script>

<style scoped>
#discover{
  background-color: #f5f6fc;
}
#banner{
  height: 450px;
  background: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
  vertical-align: center;
  font-size: 50px;
  /*font-family: na;*/
  font-style: italic;
  color: #fff;
  text-align: center;
  line-height: 300px;
}
#content{
  position: relative;
  top: -150px;
  background-color: #fff;
  border-radius: 5px;
  /*height: 500px;*/
  width: 900px;
  margin: 0 auto;
}
#random {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  box-sizing: border-box;
  min-width: 130px;
  height: 48px;
  padding: 12px 24px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #4c5fe2;
  border-radius: 4px;
  margin-top: 51px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color:  #4c5fe2;
  outline:none;
}
#random:active{
  transform: scale(.98);
}
#random:hover{
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
}
#button-block{
  height: 150px;
  width: 100%;
  padding: auto;
  text-align: center;
  border-bottom: 1px solid #e5e9ef
}
.node{
  height: 200px;
  border-bottom: 1px solid #e5e9ef;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 15px;
}
.node:hover{
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
  border-radius: 4px;
}
.el-tag{
  margin-right: 10px;
}
.el-tag:hover{
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
}
</style>
