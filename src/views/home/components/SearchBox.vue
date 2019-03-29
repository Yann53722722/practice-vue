<template>
  <div class="search-box">
    <el-input placeholder="请输入内容" class="search-input">
      <el-select v-model="select" slot="prepend" class="search-select">
        <el-option label="成都" value="1"></el-option>
        <el-option label="北京" value="2"></el-option>
        <el-option label="上海" value="3"></el-option>
      </el-select>
      <el-select v-model="select" slot="prepend" class="search-select">
        <el-option label="搜公司" value="1"></el-option>
        <el-option label="搜岗位" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data () {
    return {
      select: null
    }
  }
}
</script>

<style scoped>
.search-input {
  width: 968px;
}
  .search-select {
    width: 180px;
    margin-left: 5px;
  }
  .search-box {
    position: absolute;
    left: 50%;
    margin-left: -481px;
    padding: 80px 0;
    z-index: 3;
  }
  .el-input {
    position: absolute;
  }
</style>
