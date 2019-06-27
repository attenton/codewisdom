<template>
    <div class="background">
      <div class="forward container" >
        <div class="side_bar">
          <ul class="nav_sidebar">
            <li><a @click="changeHash('#APIContent')">Table of Content</a></li>
            <li><a @click="changeHash('#Knowledge_Graph')">Knowledge Graph</a></li>
            <li><a @click="changeHash('#Properties')">Properties</a></li>
              <ul>
                <li v-for="(value, key, index) in majority_properties" :key="key +'toc'"><a @click="changeHash('#'+'pro'+index)">{{key}}</a></li>
              </ul>
            <li v-show="relation_name.length > 0"><a @click="changeHash('#Relations')" >Relations</a></li>
            <li v-show="lang.length > 0"><a @click="changeHash('#Labels')">Labels</a></li>
          </ul>
        </div>
        <div class="API_Content" >
          <div class="APIContent" id="APIContent">
          <h1>{{ name }} </h1>
          <div><span class="node_tag" :style="{ background : bColor }">{{ labels[0] }}</span></div>
          <hr>
          <div id="graph" class="section">
            <h4 id="Knowledge_Graph">Knowledge Graph</h4>
            <el-row>
              <el-button @click="graphDisplay" size="small">{{graphString}}</el-button>
              <el-button @click="GoGraph" size="small">Graph Detail</el-button>
            </el-row>
            <ForceGraph :graphData="id" v-show="graphShow"></ForceGraph>
          </div>
          <div id="propertiesDiv" class="section">
            <h4 id="Properties">Properties</h4>
            <hr>
            <div>
                <dl v-for="(value, key, index) in majority_properties" :key=" value + key + 'majority_properties'">
                  <dt :id="'pro' + index">{{key}} :</dt>
                  <dd v-if="typeof value == 'string'">{{value}}</dd>
                  <dd v-if="typeof value == 'number'">{{value}}</dd>
                  <dd v-else-if="typeof value == 'object'" v-for="li in value" :key="li + key + 'majority_properties'">{{li}}</dd>
                </dl>
              <!--</div>-->
            </div>
          </div>
          <div id="relationDiv" v-show="relation_name.length > 0" class="section">
            <h4 id="Relations">Relations</h4>
            <hr>
            <div >
              <table class="table table-bordered table-hover" style="width: 50%;">
                <thead>
                  <tr>
                    <th>key</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody v-for="(item,index) in AdjacentNodesNameList" :key=" index  + 'adjacentNode'">
                  <tr v-show="index < relation_show">
                    <td>{{relation_name[index]}}</td>
                    <td><router-link :to="/KnowledgeData/ + item.id">{{item.name}}</router-link></td>
                  </tr>
                </tbody>
              </table>
              <el-button type="text" @click="show_more_relation" v-show="relation_show < relation_name.length || r_show != '+more'">{{r_show}}</el-button>
            </div>
          </div>
          <div id="language" v-show="lang.length > 0" class="section">
            <h4 id="Labels">Labels</h4>
            <hr>
            <el-table :data="language_table.slice(0,label_show)" scope="scope" style="width: 70%;">
              <el-table-column label="language" >
                <template slot-scope="scope">
                  {{lang[scope.$index]}}
                </template>
              </el-table-column>
              <el-table-column prop="label" label="label"></el-table-column>
              <el-table-column prop="description" label="description"></el-table-column>
              <el-table-column prop="alias" label="alias"></el-table-column>
            </el-table>
            <el-button type="text" @click="dialogLabelVisible = true" v-show="label_show < lang.length || l_show != '+more'">{{l_show}}</el-button>
            <el-dialog title="Label" :visible.sync="dialogLabelVisible" style="" :center="true" >
              <el-table :data="language_table" scope="scope" >
                <el-table-column label="language" >
                  <template slot-scope="scope">
                    {{lang[scope.$index]}}
                  </template>
                </el-table-column>
                <el-table-column prop="label" label="label"></el-table-column>
                <el-table-column prop="description" label="description"></el-table-column>
                <el-table-column prop="alias" label="alias"></el-table-column>
              </el-table>
            </el-dialog>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import ForceGraph from './forceGraph'

export default {
  components: {ForceGraph},
  inject: ['reload'],
  name: 'KnowledgeData',
  data () {
    return {
      id: null,
      name: null,
      properties: null,
      description: 'adf',
      labels: [],
      majority_properties: null,
      page_number: 0,
      AdjacentNodesNameList: [],
      relation_name: [],
      alias_list: {},
      description_list: {},
      site_list: [],
      label_list: {},
      lang: [],
      language_table: [],
      other: [],
      relations: '',
      relation_show: 5,
      label_show: 5,
      l_show: '+more',
      r_show: '+more',
      dialogLabelVisible: false,
      graphShow: false,
      graphString: 'Display Graph',
      bColor: '#fff'
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    graphDisplay () {
      this.graphShow = !this.graphShow
      if (this.graphString === 'Hide Graph') this.graphString = 'Display Graph'
      else if (this.graphString === 'Display Graph') this.graphString = 'Hide Graph'
    },
    changeHash (idName) {
      document.querySelector(idName).scrollIntoView(true)
    },
    GoGraph () {
      this.$router.push({name: 'ElementGraph', params: { id: this.id }})
    },
    show_more_relation () {
      this.relation_show = (this.relation_show === this.relation_name.length) ? 5 : this.relation_name.length
      this.r_show = (this.r_show === '+more') ? '-few' : '+more'
    },
    show_more_label () {
      this.label_show = (this.label_show === this.language_table.length) ? 5 : this.language_table.length
      this.l_show = (this.l_show === '+more') ? '-few' : '+more'
    },
    getId () {
      this.id = this.$route.params.id
    },
    handleProperty (properties) {
      this.alias_list = {}
      this.description_list = {}
      this.label_list = {}
      this.lang = []
      for (let prop in properties) {
        if (prop.substring(0, 5) === 'alias') {
          let la = prop.replace('alias_', '')
          this.alias_list[la] = properties[prop]
        } else if (prop.substring(0, 13) === 'descriptions_') {
          let la = prop.replace('descriptions_', '')
          this.description_list[la] = properties[prop]
        } else if (prop.substring(0, 5) === 'site:') {
          this.$set(this.site_list, this.site_list.length, {[prop]: properties[prop]})
        } else if (prop.substring(0, 6) === 'labels') {
          let la = prop.replace('labels_', '')
          this.$set(this.lang, this.lang.length, la)
          this.label_list[la] = properties[prop]
        } else {
          this.$set(this.other, this.other.length, {[prop]: properties[prop]})
        }
      }
    },
    handleAll (lang, labelsList, descriptionList, aliasList) {
      this.language_table = []
      lang.sort(function (a, b) {
        return a > b
      })
      for (let i = 0; i < lang.length; i++) {
        let dict = {}
        if (labelsList.hasOwnProperty(lang[i])) {
          dict['label'] = labelsList[lang[i]]
        } else if (!labelsList.hasOwnProperty(lang[i])) {
          dict['label'] = 'null'
        }
        if (descriptionList.hasOwnProperty(lang[i])) {
          dict['description'] = descriptionList[lang[i]]
        } else if (!descriptionList.hasOwnProperty(lang[i])) {
          dict['description'] = 'null'
        }
        if (aliasList.hasOwnProperty(lang[i])) {
          dict['alias'] = aliasList[lang[i]]
        } else if (!aliasList.hasOwnProperty(lang[i])) {
          dict['alias'] = 'null'
        }
        this.$set(this.language_table, this.language_table.length, dict)
      }
    },
    getNodeData () {
      axios
        .post('http://bigcode.fudan.edu.cn/kg/api/graph/getNodeByID/', {id: this.id})
        .then(response => {
          this.name = response.data.name
          this.properties = response.data.properties
          this.labels = response.data.labels
          this.bColor = this.labelColor(this.labels[0])
          this.majority_properties = response.data.majority_properties
          this.handleProperty(this.properties)
          this.handleAll(this.lang, this.label_list, this.description_list, this.alias_list)
          // console.log(this.majority_properties)
        })
        .catch(error => (console.log(error)))
    },
    labelColor (label) {
      switch (label) {
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
    },
    getNodeRelation () {
      axios
        .post('http://bigcode.fudan.edu.cn/kg/api/graph/expandNode/', {id: this.id})
        .then(response => {
          this.AdjacentNodesNameList = []
          this.relation_name = []
          if (response.data.relations.length > 0) {
            response.data.relations.forEach(relation => {
              this.$set(this.relation_name, this.relation_name.length, relation.name)
            })
            response.data.nodes.forEach(nodes => {
              let node = {}
              node.id = nodes.id
              node.name = nodes.name
              this.$set(this.AdjacentNodesNameList, this.AdjacentNodesNameList.length, node)
            })
            this.AdjacentNodesNameList.length -= 1
          }
        })
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     this.getId()
  //     this.getNodeData()
  //     this.getNodeRelation()
  //   }
  // },
  mounted () {
    this.getNodeData()
    this.getNodeRelation()
  },
  watch: {
    '$route': function () {
      this.id = this.$route.params.id
      this.getNodeData()
      this.getNodeRelation()
    }
  }
}
</script>
<style scoped>
@import "assets/font/Raleway.css";
.background{
  height: 100%;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: auto;
  padding-right: auto;
  /*background-color: rgba(245,245,245,0.8);*/
}
.section{
  margin-top: 30px;
}

.section p{
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  line-height: 25px;
  color: #616366;
  margin: 0px 0px 17px 0px;
  padding: 0px;
}
/*#graph{*/
  /*border: solid 1px grey;*/
/*}*/
.el-dialog{
  /*position: absolute;*/
  /*top: 20%;*/
  /*left: 50%;*/
  /*margin: 0 !important;*/
  /*max-height: calc(100% - 30px);*/
  /*max-width: calc(100% - 30px);*/
  /*transform: translate(-50%, -50%);*/
  /*display: flex !important;*/
  /*flex-direction: column !important;*/
}
.el-dialog__body{
  /*height: 700px!important;*/
  /*overflow: auto!important;*/
}
ul{
  list-style: none;
}

@media (max-width: 991px) {
  .nav_sidebar{
    display: none;
  }
  .API_Content{
    width: 100%;
    /*box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);*/
    /*border: solid 1px;*/
    /*border-radius: 2px;*/
    /*box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);*/
  }
}
@media (min-width: 992px) {
  .side_bar{
    float: left;
  }
  .API_Content{
    margin-left: 250px;
    padding: 30px 40px;
    /*box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);*/
    /*border: solid 1px;*/
    /*border-radius: 2px;*/
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  }
  .nav_sidebar{
    position: fixed;
    top: 0;
    padding: 20px 20px;
    margin-top: 30px;
    max-height: 100%;
    overflow-y: auto;
    width: 230px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  }
}
.nav_sidebar li:active{
  color: #1e88e4;
  font-weight: bold;
  /*color: #1e88e5;*/
}
.nav_sidebar li:hover{
  color: #1e88e4;
  boder-bottom: thick dotted #ff0000;
}
.nav_sidebar > li:after{
  display: block;
  content: "";
  clear: both;
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
  margin: 0px 0px 8px 6px;
}
.node_tag:hover{
  color:#fff !important;;
}
a:hover{
  cursor: pointer;
}
</style>
