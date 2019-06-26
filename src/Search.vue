<template>
    <div id="search">
      <div id="search-box" style="margin: 100px 20%;">
        <el-input  placeholder="Input Entity for Searching" v-model="input5" @keyup.enter.native="search">
          <el-button type="info" icon="el-icon-info" slot="prepend" @click="openInfo" ></el-button>
          <el-button type="primary" icon="el-icon-search" slot="append" @click="search">Search</el-button>
        </el-input>
        <el-button style="margin-top: 20px;" type="primary" @click="example">Example</el-button>
      </div>
      <div id="node-content" v-loading="loading">
        <div v-for="(item, index) in nodes" :key="index" class="node">
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'Search',
  data () {
    return {
      select: '',
      input5: '',
      loading: false,
      query: '',
      nodes: []
    }
  },
  methods: {
    search () {
      this.loading = true
      axios
        .post('http://bigcode.fudan.edu.cn/kg/api/graph/getRandomNodesByLabel/', {query: this.query})
        .then(response => {
          this.nodes = response.data.nodes
          console.log(this.nodes)
          this.loading = false
        })
      // alert(this.input5)
      // this.loading = true
    },
    openInfo () {
      this.$notify.info({
        title: 'Notification',
        position: 'bottom-right',
        message: 'You can click the node to see the information about it.'
      })
    },
    detail (id) {
      this.$router.push({name: 'KnowledgeData', params: {id: id}})
    },
    example () {
      this.input5 = 'keybindings are broken in detached views'
    }
  }
}
</script>

<style scoped>
  .el-input__inner{
    outline: none;
  }
  #node-content{
    width: 900px;
    margin: 30px auto;
  }
  .node{
    position: relative;
    height: 200px;
    /*border-top: 1px solid #e5e9ef;*/
    background-color: #f9f9f9;
    border-radius: 4px;
    padding: 20px 15px 10px 82px;
    overflow: hidden;
    margin-top: 30px;
  }
  /*.node:hover{*/
  /*  !*transform: scale(1.02);*!*/
  /*  !*box-shadow: 0 2px 8px rgba(0,0,0,.3);*!*/
  /*  border-radius: 4px;*/
  /*  z-index: 100;*/
  /*}*/
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
