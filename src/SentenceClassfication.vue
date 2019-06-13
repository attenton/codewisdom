<template>
  <div id="SentenceFunction" class="container">
    <div id="content">
      <div id="input_frame">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item prop="sentence">
            <el-input placeholder="please input sentence for prediction" v-model="form.sentence" clearable @keyup.enter.native="predict('form')">
              <el-button slot="append" icon="el-icon-search" @click="predict('form')"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div id="prediction" v-show="preShow">
        <span>{{form.sentence}}</span>
        <span>Prediction: {{type_text}}</span>
      </div>
      <div id="error" v-show="errorShow">
        <span>An error occurred on the server</span>
        <i id="error_close" class="el-icon-close" @click="errorShow = false"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SentenceClassfication',
  data () {
    return {
      form: {
        sentence: null
      },
      type_text: '',
      preShow: false,
      errorShow: false,
      rules: {
        sentence: [
          {required: true, message: 'Please input query', trigger: 'blur, change'}
        ]
      }
    }
  },
  methods: {
    predict (form) {
      let _this = this
      _this.$refs[form].validate((valid) => {
        if (valid) {
          axios
            .post('http://10.141.221.89:8002/function/functionPredict/', {query: _this.form.sentence})
            .then(response => {
              console.log(response)
              let type = response.data.type
              switch (type) {
                case '1':
                  _this.type_text = 'Function'
                  break
                case '2':
                  _this.type_text = 'Directive'
                  break
                case '0':
                  _this.type_text = 'Others'
                  break
                default:
                  _this.type_text = 'Cannot Predidct exactlly'
                  break
              }
              _this.preShow = true
            })
            .catch(error => {
              _this.$message({
                message: 'An error occurred on the server',
                type: 'error'
              })
              _this.errorShow = true
              console.log(error)
            })
        } else {
          _this.$message({
            message: 'Query cannot be empty',
            type: 'warning'
          })
        }
      })
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  #SentenceFunction{
    font-family: "Raleway";
    padding: 0 auto;
  }
  #input_frame{
    width: 600px;
    margin: 20px auto 0 auto;
  }
  #error{
    margin: 40px auto 0 auto;
    font-family: "Raleway";
    width: 600px;
    background-color: #F56C6C;
    color: white;
    border-radius: 5px;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
  }
  #error_close{
    float: right;
    line-height: 50px;
    cursor: pointer;
  }
</style>
