<template>
  <div>
  <div  id="bg">
        <div class="container" id="introduction">
            <h1 class="slogan-title">API Knowledge Graph</h1>
            <h2 class="slogan-desc">API knowledge graph is an API centric knowledge base that links API elements
                (e.g., libraries, classes, methods, parameters),
                their descriptive knowledge (e.g., functionalities, directives),
                and related background knowledge (e.g., concepts about computer and programming).
                You can explore interesting API knowledge by searching and graph-based navigating.
                The current version supports JDK and Android APIs.</h2>
            <el-button class="dis" type="primary" plain @click="discover">Discover</el-button>
            <el-button class="dis" type="primary" plain @click="search">Search</el-button>
        </div>
    </div>

    <div id="Statistics" >
            <el-row type="flex" justify="center" >
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4" :pull="1">
                    <transition name="el-fade-in-linear">
                        <el-card class="outer" shadow="hover" >
                            Most Popular
                            <div class="inner" v-for="item in popular_data" :key="item.id">
                                <router-link :to="/KnowledgeData/ + item.id"><el-card class="inner_card"  shadow="never">
                                       {{item.name}}
                                  </el-card></router-link>
                            </div>
                        </el-card>
                    </transition>
                </el-col>

                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4" >
                    <transition name="el-fade-in-linear">
                        <el-card class="outer" shadow="hover" >
                            Recently Added
                            <div class="inner" v-for="item in recent_data" :key="item.id">
                               <router-link :to="/KnowledgeData/ + item.id"> <el-card class="inner_card" shadow="never">
                                       {{item.name}}
                               </el-card></router-link>
                            </div>
                        </el-card>
                    </transition>
                </el-col>

                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4" :push="1">
                        <el-card class="outer" shadow="hover" >
                            Statistics
                            <div class="inner" >
                                <el-card class="inner_card" shadow="never" v-for="(value,key) in statistics_data" :key="key">
                                    {{key}}:   <span style="font-family:arial;font-weight: 500;">{{value}}</span>
                                </el-card>
                            </div>
                        </el-card>
                </el-col>
            </el-row>
    </div>

    <div id="show">
        <div id="system_tool">
            <div id="third_title" >
                SYSTEMS & TOOLS
            </div>
            <el-row type="flex" justify="center" >
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4" :pull="1">
                    <a href="http://bigcode.fudan.edu.cn/kg/fl_demo/index.html"><el-card  class="tools_box">
                        Entity Link
                    </el-card></a>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4" >
                    <router-link to="/ConceptGraphExtraction"><el-card class="tools_box">
                        Concept Graph Extraction
                    </el-card></router-link>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4" :push="1">
                    <router-link to="/KnowledgePatternPrediction"><el-card class="tools_box">
                        Knowledge Pattern Prediction
                    </el-card></router-link>
                </el-col>
            </el-row>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'index',
  data () {
    return {
      show: true,
      top_number: 6,
      popular_data: [],
      recent_data: [],
      statistics_data: []
    }
  },
  methods: {
    discover () {
      this.$router.push('Discover')
    },
    search () {
      this.$router.push('Search')
    }
  },
  mounted () {
    axios
      .post('http://bigcode.fudan.edu.cn/kg/api/graph/getPopularNodes/')
      .then(response => { (this.popular_data = response.data.nodes) })
      .catch(error => console.log(error))
    axios
      .post('http://bigcode.fudan.edu.cn/kg/api/graph/getNewNodes/', {top_number: this.top_number})
      .then(response => { (this.recent_data = response.data.nodes) })
      .catch(error => console.log(error))
    axios
      .post('http://bigcode.fudan.edu.cn/kg/api/graph/getKnowledgeGraphMetaData/')
      .then(response => { (this.statistics_data = response.data) })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
@import "assets/font/Raleway.css";

#bg{
    padding: 20px 0;
    width: 100%;
    background: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    /*position:fixed;*/
    /*max-height: 600px;*/
    /*top: 53px;*/
}

#introduction{
    height: 400px;
    margin: 50px auto;
    margin-bottom: 30px;
}
.slogan-title{
    max-width: 610px;
    color: #fff;
    font-size: 42px;
    line-height: 48px;
    font-weight: bold;
    text-transform: capitalize;
}
.slogan-desc{
    margin: 40px auto;
    margin-bottom: 50px;
    color: rgba(196, 227, 255, 0.8);
    font-size: 26px;
    line-height: 28px;
    text-align: justify;
}
.el-button--primary.is-plain{
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border-color: rgba(255,255,255,0.5);
    background: rgba(64,158,255,0) !important;
}
.el-button--primary.is-plain:hover{
    /*border-color: rgba(255,255,255,0.8) !important;*/
    background: #1e88e5 !important;
    border-color: #1e88e5;
}
.el-button--primary.is-plain:focus{
    background: #1e88e5 !important;
    border-color: #1e88e5;
}
.dis:hover{
  transition:all .5s;
  transform: translateY(-5px);
}

#Statistics{
    width: 100%;
    /*height: 600px;*/
    margin: 0 auto;
    padding: 50px;
}
.el-row{
    margin: 20px auto;
}
.el-col {
    text-align: center;
    border: #0f0f0f;
    font-size: 18px;
}

/*.el-card{*/
    /*border: none;*/
/*}*/
.el-card:hover{
    boder: 1px solid #ebeef5 !important;

}
.outer{
}
.outer:hover{
  margin-top: -5px;
}
.el-card__body{
  font-weight: bold;
  text-align: center;
}
.inner > a > .el-card > .el-card__body{
  overflow: hidden !important;
    text-overflow: ellipsis !important;
    -ms-text-overflow: ellipsis !important;
    white-space: nowrap !important;
}
#Statistics > div > div.el-col.el-col-24.el-col-pull-1.el-col-xs-6.el-col-sm-6.el-col-md-6.el-col-lg-6.el-col-xl-4 > div > div > div:nth-child(6) > a > div > div{
  overflow: hidden !important;
    text-overflow: ellipsis !important;
    -ms-text-overflow: ellipsis !important;
    white-space: nowrap !important;
}
.transition-box{
    height: 480px;
    padding: 20px auto;

}
.inner{
  /*font-weight: bold;*/
}
a:hover{
    text-decoration: none;
}
.inner_card{
    border: 1px solid rgba(255,255,255,0);
    font-size: 16px !important;
    margin-top: 8px;
    color: #1e88e5;
    text-overflow: ellipsis;
    white-space: nowrap;
  overflow: hidden;
  max-width: 300px;
}
.inner_card:hover{
    border: 1px solid #ebeef5;
    color: #fff;
    background-color: #1e88e5;
}

#show{
    width: 100%;
    height: 500px;
    padding-top: 70px;
    /*background-color: #616366;*/
    background-image: linear-gradient(225deg, #39444d , #22292e 88%);
}

#third_title{
    width: 300px;
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    margin: 0 auto;;
    margin-bottom: 40px;
    text-align: center;
}
.tools_box{
    text-align: center;
    line-height: 150px;
    min-height: 150px;
}
.tools_box:hover{
  border: none;
  color: #fff;
  background-color: #1e88e5;
  transition:all .5s;
  transform: translateY(-5px);
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
}
#entity_link{
  text-align: center;
  line-height: 150px;
  min-height: 150px;
  cursor: not-allowed;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}
</style>
