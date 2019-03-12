<template>
    <div class="background">
      <div class="forward container" >
        <h1>{{ name }} <span style="font-size:18px;">{{ labels[0] }}</span></h1>
        <div id="properties">
          <h3>Properties</h3>
          <hr>
          <div>
            <!--<div v-for="(item,index) in majority_properties" :key="index + 'majority_properties'">-->
              <dl v-for="(value, key) in majority_properties" :key=" value + key + 'majority_properties'">
                <dt>{{key}}</dt>
                <dd v-if="typeof value == 'string'">{{value}}</dd>
                <dd v-if="typeof value == 'number'">{{value}}</dd>
                <dd v-else-if="typeof value == 'object'" v-for="li in value" :key="li + key + 'majority_properties'">{{li}}</dd>
              </dl>
            <!--</div>-->
          </div>
        </div>
        <div id="relation" v-show="relation_name.length > 0">
          <h3>Relations</h3>
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
        <div id="language" v-show="lang.length > 0">
          <h3>Labels</h3>
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
          <el-dialog title="Label" :visible.sync="dialogLabelVisible" >
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
          <!--<el-select v-model="relations" multiple collapse-tags filterable placeholder="Select">-->
            <!--<el-option-->
              <!--v-for="item in lang"-->
              <!--:key="item"-->
              <!--:label="item"-->
              <!--:value="item">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <!--<div v-for="(item,index) in language_table" :key="item +index + 'language'" >-->
            <!--{{lang[index]}}:-->
            <!--label:{{item.label}}-->
            <!--description: {{item.description}}-->
            <!--alias: {{item.alias}}-->
          <!--</div>-->
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
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
      dialogLabelVisible: false
    }
  },
  created () {
    this.getId()
  },
  methods: {
    show_more_relation () {
      this.relation_show = (this.relation_show === this.relation_name.length) ? 5 : this.relation_name.length
      this.r_show = (this.r_show === '+more') ? '-few' : '+more'
    },
    show_more_label () {
      this.label_show = (this.label_show === this.language_table.length) ? 5 : this.language_table.length
      this.l_show = (this.l_show === '+more') ? '-few' : '+more'
    },
    getId () {
      const routerParams = this.$route.params.id
      this.id = routerParams
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
    async getData () {
      axios
        .post('http://bigcode.fudan.edu.cn/kg/getNodeByID/', {id: this.id})
        .then(response => {
          this.name = response.data.name
          this.properties = response.data.properties
          this.labels = response.data.labels
          this.majority_properties = response.data.majority_properties
          this.handleProperty(this.properties)
          this.handleAll(this.lang, this.label_list, this.description_list, this.alias_list)
          console.log(this.majority_properties)
        })
        .catch(error => (console.log(error)))
      axios
        .post('http://bigcode.fudan.edu.cn/kg/GetOutRelation/', {id: this.id, page_number: this.page_number})
        .then(response => {
          this.AdjacentNodesNameList = []
          this.relation_name = []
          for (let i = 0; i < response.data.relations.length; i++) {
            this.$set(this.relation_name, i, response.data.relations[i].name)
            axios
              .post('http://bigcode.fudan.edu.cn/kg/getNodeByID/', {id: response.data.relations[i].end_id})
              .then(response => {
                this.$set(this.AdjacentNodesNameList, i, response.data)
              })
              .catch(error => (console.log(error)))
          }
        })
        .catch(error => (console.log(error)))
    }
  },
  watch: {
    '$route' (to, from) {
      this.getId()
      this.getData()
    }
  },
  mounted () {
    this.getData()
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
  background-color: rgba(245,245,245,0.8);
}
.forward{
  border-radius: 1px;
  border: 1px solid rgba(0,0,0,.1);
  border-shadow: 0 2px 8px rgba(84, 48, 132, 0.1);
  background-color: #fff;
}
.el-dialog{
  position: absolute;
  top: 20%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  max-height: 700px !important;
  display: flex !important;
  flex-direction: column !important;
}
.el-dialog__body{
  height: 700px!important;
  overflow: auto!important;
}
</style>
