<!--
 * @Description: 主表组件
  //
 -->
<template>
  <el-form :ref="refName" :model="formData" :rules="rules" :label-width="labelWidth" v-bind="$attrs" >
    <!-- 主体部分 -->
    <el-row>
      <template v-for="(colItem,colIndex) in formConfig">
          <el-col v-if="!colItem.hidden" :key="colIndex" :span="colItem.span">
            <template v-for="(item,index) in colItem.list ">
               <!-- 文本类型 -->
              <el-form-item :key="index" v-if="!item.hidden && item.type === 'text'" :prop="item.prop" :label="item.label">
                <el-input v-if="!item.readOnly" >
                  <template v-if="item.beforeTxt" slot="prepend">{{item.beforeTxt}}</template>
                  <template v-if="item.afterTxt" slot="append">{{item.afterTxt}}</template>
                </el-input>
              </el-form-item>
            </template>
          </el-col>
        </template>
    </el-row>

    <!-- button 部分 -->
    <!--
      表单类型： 1.readOnly  只读模式
                2.text      文本输入

      数据结构
      formConfig = [
        {
          hidden: false

        }, // 每一个对象控制一列数据
        {
        }
      ]

     -->
  </el-form>
</template>

<script>
export default {
  name: 'JrForm',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formConfig: {
      type: Array,
      default: () => {
        return [[{}]]
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    refName: {
      type: String,
      default: ''
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style>
</style>
