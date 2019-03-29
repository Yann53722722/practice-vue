<template>
 <div class="jobs">
   <div class="header">
     <stu-nav-bar></stu-nav-bar>
     <search-box></search-box>
     <div class="filter-box">
       <job-filter-box></job-filter-box>
     </div>
   </div>
 </div>
</template>

<script>
import StuNavBar from '../home/components/StuNavBar'
import SearchBox from '../home/components/SearchBox'
import JobFilterBox from './components/JobFilterBox'
export default {
  name: 'Index',
  components: {JobFilterBox, SearchBox, StuNavBar}
}
</script>

<style scoped>
  .jobs {
    width: 100%;
    text-align: center;
    min-width: 1024px;
    position: absolute;
  }
  .filter-box {
    padding-top: 150px;
  }
</style>
