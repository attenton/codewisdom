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
            <span class="number">{{index + 1}}</span>
            <div class="node_block">
              <h4 class="name" @click="detail(item.id)" :title="item.name">{{item.name}}</h4>
              <el-tag v-for="(label, i) in item.labels" type="item.type" effect="dark" :key="i" @click="query_label(label)">{{label}}</el-tag>

              <button class="graph-button" @click="graph(item.id)">Graph</button>
            </div>
            <button class="detail-button" @click="detail(item.id)">Learn More</button>
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
        .post('http://bigcode.fudan.edu.cn/kg/api/graph/getRandomNodesByLabel/', {label: this.label})
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
    },
    detail (id) {
      this.$router.push({name: 'KnowledgeData', params: {id: id}})
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
  /*position: relative;*/
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
  position: relative;
  height: 200px;
  border-top: 1px solid #e5e9ef;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px 15px 10px 82px;
  overflow: hidden;
}
.node:hover{
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
  border-radius: 4px;
  z-index: 100;
}
.number{
  font-weight: 700;
  line-height: 64px;
  position: absolute;
  top: 13px;
  left: 0;
  display: block;
  width: 82px;
  text-align: center;
  color: #000;
  font-size: 50px;
}
.node_block{
  max-width: 600px;
  position: relative;
  float: left;
}
.el-tag{
  margin-right: 10px;
  user-select: none;
  margin-top: 10px;
}
.el-tag:hover{
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
}
.el-tag:active{
  transform: scale(0.98);
}
.name{
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700!important;
  /*font-style: italic;*/
  overflow: hidden;
  /*display: block;*/
  /*margin-bottom: 10px;*/
}
.name:hover{
  text-decoration: underline;
  cursor: pointer;
}
.detail-button{
  position: absolute;
  top: 70px;
  right: 40px;
  display: block;
  float: right;
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
  color: #fec937;
  border: 1px solid #fec937;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: #fff;
  outline:none;
}
.detail-button:hover{
  cursor: pointer;
  background-color:  #fec937;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
}
.detail-button:active{
  transform: scale(0.98);
}
.graph-button{
  display: block;
  margin-top: 30px;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  box-sizing: border-box;
  min-width: 80px;
  height: 40px;
  padding: 12px 24px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-transform: uppercase;
  color: #ff8d29;
  border: 1px solid #ff8d29;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: #fff;
  outline:none;
}
.graph-button:hover{
  cursor: pointer;
  color: #fff;
  background-color: #ff8d29;
}
.graph-button:active{
  transform: scale(0.98);
}
</style>
