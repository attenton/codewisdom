<template>
    <div>
      <div id="search-box" style="margin: 100px 20%;">
        <el-input  placeholder="Input Entity for Searching" v-model="input5" @keyup.enter.native="search">
          <el-button type="info" icon="el-icon-info" slot="prepend" @click="openInfo" ></el-button>
          <el-button type="primary" icon="el-icon-search" slot="append" @click="search">Search</el-button>
        </el-input>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      select: '',
      input5: '',
      loading: true
    }
  },
  methods: {
    search () {
      alert(this.input5)
      this.loading = true
    },
    openInfo () {
      this.$notify.info({
        title: 'Notification',
        position: 'bottom-right',
        message: 'You can click the node to see the information about it.'
      })
    }
  }
}
</script>

<style scoped>

</style>
