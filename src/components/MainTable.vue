<template>
  <el-table :data="tableData" v-bind="$attrs">
    <template v-for="(column, index) of columns">
      <!-- render -->
      <el-table-column v-if="column.render" v-bind="Object.assign({}, defaultColumnConfig, column)" :key="index">
        <template slot-scope="scope">
          <extend :render="column.render" :params="scope"></extend>
        </template>
      </el-table-column>
      <!-- no render -->
      <el-table-column v-else v-bind="Object.assign({}, defaultColumnConfig, column)" :key="index"></el-table-column>
    </template>
  </el-table>
</template>



<script>
import Extend from './Extend.js'
export default {
  components: {
    Extend,
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultColumnConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
};
</script>

<style>
</style>
