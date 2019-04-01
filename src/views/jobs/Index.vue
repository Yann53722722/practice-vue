<template>
 <div class="jobs">
   <div class="stu-nav-bar">
     <stu-nav-bar></stu-nav-bar>
   </div>
   <div class="filter-box">
     <job-filter-box></job-filter-box>
   </div>
 </div>
</template>

<script>
import StuNavBar from '../home/components/StuNavBar'
import SearchBox from '../home/components/SearchBox'
import JobFilterBox from './components/JobFilterBox'
import JobList from './components/JobList'
export default {
  name: 'Index',
  components: {JobList, JobFilterBox, SearchBox, StuNavBar}
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
    margin-top: 20px;
    height: 50px;
  }
  .stu-nav-bar {
    height: 50px;
  }
</style>
