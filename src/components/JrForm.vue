<!--
 * @Description: 主表组件
  //
 -->
<template>
  <el-form :ref="refName" :model="formData" :rules="rules" :label-width="labelWidth" v-bind="$attrs">
    <!-- 主体部分 -->
    <el-row>
      <template v-for="(colItem,colIndex) in formConfig">
        <el-col v-if="!colItem.hidden" :key="colIndex" :span="colItem.span">
          <template v-for="(item,index) in colItem.list ">
            <!-- 1.文本类型 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'text'" :prop="item.prop" :label="item.label">
              <el-input v-if="!item.readOnly" v-model="formData[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" :clearable="item.clearable">
                <template v-if="item.beforeTxt" slot="prepend">{{item.beforeTxt}}</template>
                <template v-if="item.afterTxt" slot="append">{{item.afterTxt}}</template>
              </el-input>
              <!-- 只读  此处只读的情况是便于提交之后用于更改表单为只读状态 -->
              <div v-if="item.readOnly" :style="item.style || {}" :class="item.class">
                <span v-if="item.beforeTxt">{{item.beforeTxt}}</span>
                {{formData[item.prop]}}
                <span v-if="item.afterTxt">{{item.afterTxt}}</span>
              </div>
            </el-form-item>

            <!-- 2.只读模式 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'readOnly'" :prop="item.prop" :label="item.label">
              <!-- 如果需要对数据进行处理后续可以添加 filter -->
              <div :style="item.style" :class="item.class">
                <span v-if="item.beforeTxt">{{item.beforeTxt}}</span>
                {{formData[item.prop]}}
                <span v-if="item.afterTxt">{{item.afterTxt}}</span>
              </div>
            </el-form-item>

            <!-- 3.密码类型 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'password'" :label="item.label" :prop="item.prop">
              <el-input :placeholder="item.placeholder" maxlength="20" v-model.trim="formData[item.prop]" show-password :disabled="item.disabled"></el-input>
            </el-form-item>

            <!-- 4.文本域 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'textarea'" :label="item.label" :prop="item.prop">
              <el-input v-if="!item.readOnly" type="textarea" :autosize="{ minRows: item.minRows || 1, maxRows: item.maxRows || 4}" :placeholder="item.placeholder" v-model="formData[item.prop]" :disabled="item.disabled"></el-input>
              <div v-if="item.readOnly" :style="item.style" :class="item.class">
                {{formData[item.prop]}}
              </div>
            </el-form-item>

            <!-- 5.单选框组 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'radioGroup'" :label="item.label" :prop="item.prop">
              <el-radio-group v-if="!item.readOnly" v-model="formData[item.prop]" @change="item.changeFn ? radioGroupChange($event, item.changeFn) : null" :disabled="item.disabled" :text-color="item.textColor || '#ffffff'" :fill="item.fill || '#409EFF'">
                <template v-for="curItem in item.optionList">
                  <el-radio :label="curItem.value" :key="curItem.value">{{curItem.label}}</el-radio>
                </template>
              </el-radio-group>
              <!-- 只读 -->
              <div v-if="item.readOnly" :style="item.style" :class="item.class">
                {{formData[item.prop]}}
              </div>
            </el-form-item>

            <!-- 6.单选（checkbox-item） -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'radioItem'" :label="item.label" :prop="item.prop">
              <el-checkbox v-if="!item.readOnly" v-model="formData[item.prop]" :disabled="item.disabled"></el-checkbox>
              <div v-if="item.readOnly" :style="item.style" :class="item.class">
                {{formData[item.prop] ? '是' : '否'}}
              </div>
            </el-form-item>

            <!-- 7.复选 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'checkbox'" :label="item.label" :prop="item.prop">
              <el-checkbox-group v-model="formData[item.prop]" v-if="!item.readOnly" :disabled="item.disabled" @change="item.changeFn ? checkboxChange($event, item.changeFn) : null">
                <template v-for="curItem in item.optionList">
                  <el-checkbox :label="curItem.value" :key="curItem.value">{{curItem.label}}</el-checkbox>
                </template>
              </el-checkbox-group>
              <div v-if="item.readOnly" :style="item.style" :class="item.class">
                {{formData[item.prop] && formData[item.prop] | checkboxFilter(item.optionList, formData[item.prop])}}
              </div>
            </el-form-item>

            <!-- 8.日期选择器 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'date'" :label="item.label" :prop="item.prop">
              <el-date-picker v-if="!item.readOnly" v-model="formData[item.prop]" :format="item.formatShow || 'yyyy-MM-dd'" :value-format="item.valueFormat || 'yyyy-MM-dd'" :type="item.datePickerType" :placeholder="item.placeholder" :disabled="item.disabled" :picker-options="item.dateConfig" @change="item.changeFn ? dateChange($event, item.changeFn) : null"></el-date-picker>
              <span v-if="item.readOnly">
                  {{formData[item.prop] | dateFilter(item.datePickerType)}}
              </span>
            </el-form-item>

            <!-- 9.日期时间选择器 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'dateTime'" :label="item.label" :prop="item.prop">
              <el-date-picker v-if="!item.readOnly" range-separator="至" v-model="formData[item.prop]" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss" type="datetimerange"  :disabled="item.disabled" :picker-options="item.dateConfig" @change="item.changeFn ? dateChange($event, item.changeFn) : null"></el-date-picker>
              <span v-if="item.readOnly">
                  {{formData[item.prop] && formData[item.prop][0] + " —— " + formData[item.prop][1]}}
              </span>
            </el-form-item>

            <!-- 10.select 选择-->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'select'" :label="item.label" :prop="item.prop">
              <el-select v-if="!item.readOnly" v-model="formData[item.prop]" :placeholder="item.placeholder" clearable :multiple="item.multiple" @change="item.changeFn ? selectChange($event, item.changeFn) : null">
                <template v-for="curItem in item.optionList">
                  <el-option :key="curItem.value" :disabled="curItem.disabled" :label="curItem.label" :value="curItem.value"></el-option>
                </template>
              </el-select>
              <span v-if="item.readOnly">
                  {{formData[item.prop] && formData[item.prop] | selectFilter(item.optionList)}}
              </span>
            </el-form-item>

            <!-- 11.remoteSelect 模糊搜索 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'remoteSelect'" :label="item.label" :prop="item.prop">
              <el-select v-model="formData[item.prop]" :multiple="item.multiple" filterable remote reserve-keyword :placeholder="item.placeholder || '请输入关键词'" :remote-method="remoteMethod" :loading="selectLoading">
                <template>
                  <el-option
                    v-for="curItem in selectOptionList"
                    :key="curItem.value"
                    :label="curItem.label"
                    :value="curItem.value">
                  </el-option>
                </template>
              </el-select>
            </el-form-item>

            <!-- 12.Cascader 级联选择器 -->
            <el-form-item :key="index" v-if="!item.hidden && item.type === 'cascader'" :label="item.label" :prop="item.prop">
              <el-cascader
                v-model="formData[item.prop]"
                :options="item.optionList"
                clearable
                @change="item.changeFn ? cascaderChange($event, item.changeFn) : null">
              </el-cascader>
            </el-form-item>
          </template>
        </el-col>
      </template>
    </el-row>

    <!-- button 部分 -->
    <div v-if="btnConfig.isShowBtn" :style="btnConfig.style || 'text-align: center;'">
      <template v-for="item in btnConfig.list">
        <el-button :key="item.fnType || 'firstType'" v-if="item.isShow && item.fnType === 'firstFn'" :type="item.type || 'primary'" @click="firstBtnFn(item)" :style="item.style || 'margin-right: 20px;'">{{item.text || '保存'}}</el-button>
        <el-button :key="item.fnType || 'lastType'" v-if="item.isShow && item.fnType === 'lastFn'" :type="item.type || ''" @click="lastBtnFn(item)" :style="item.style || ''">{{item.text || '取消'}}</el-button>
      </template>
    </div>
    <!--
      && item.fnType === 'firstFn'
      表单类型： 1.readOnly  只读模式
                2.text      文本输入
                3.password  密码类型
                4.textarea  文本域
                5.radioGroup 单选框组
                6.radioItem 单选
                7.checkbox 复选框 (请务必初始化数组，否则会报错)
                8.date 日期选择 (值有为 date 或是 array)
                9.dateTime 日期时间
                10.select 选择器（单项多选一起）
                11.remoteSelect 模糊查询 // 需要从父组件传入一个remoteSelectAxiosFn，便于子组件发送请求
                12.Cascader 级联选择器
      数据结构
      formConfig = [
        {
          hidden: false
          span
          list
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
    },
    btnConfig: {
      type: Object,
      default: () => {
        return {
          isShowBtn: true, // *
          list: [
            {
              isShow: true, // *
              fnType: 'firstFn' // * 为什么要有这个属性，是因为函数名一开始必须存在，不能够动态的生成，所以一开始就需要定义两个btn。两个btn如果采取的是循环遍历的方法，就需要添加一个flag用于消除每次循环中其中的一个btn。
            },
            {
              isShow: true,
              fnType: 'lastFn'
            }
          ]
        }
      }
    },
    remoteSelectAxiosFn: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectLoading: false,
      selectOptionList: []
    }
  },
  methods: {
    firstBtnFn(item) {
      this.$refs[this.refName].validate(valid => {
        if (valid) {
          item.axiosFn && this.$axios[item.axiosFn](this.formData).then(res => {
            this.$message({ message: res.message, type: 'success' })
            this.resetFields()
            if (item.callback) {
              this.$emit(item.callback, res)
            }
          })
        } else {
          this.$message({
            message: '表单信息有误，请检查确认',
            type: 'warning'
          })
        }
      })
    },
    lastBtnFn(item) {
      // 第二个btn  通常是作为取消按钮来的,不传默认为清除按钮
      if (item.isCancelBtn) {
        this.$refs[this.refName].validate(valid => {
          if (valid) {
            item.axiosFn && this.$axios[item.axiosFn](this.formData).then(res => {
              this.$message({ message: res.message, type: 'success' })
              this.resetFields()
              if (item.callback) {
                this.$emit(item.callback, res)
              }
            })
          } else {
            this.$message({
              message: '表单信息有误，请检查确认',
              type: 'warning'
            })
          }
        })
      } else {
        // 作为取消按钮的话
        this.resetFields()
      }
    },
    // 用于外部表单提交
    validate(callback) {
      this.$refs[this.refName].validate(valid => {
        if (valid) {
          callback && callback(this.formData)
        } else {
          callback && callback()
        }
      })
    },
    // promise版本
    validatePromise() {
      return new Promise((resolve, reject) => {
        this.$refs[this.refName].validate(valid => {
          if (valid) {
            resolve(this.formData)
          } else {
            reject(valid)
          }
        })
      })
    },
    // 重置表单
    resetFields() {
      this.$refs[this.refName].resetFields()
    },
    // 清除校验结果
    clearValidate() {
      this.$refs[this.refName].clearValidate()
    },
    // 对部分表单进行校验
    validateField(val) {
      this.$refs[this.refName].validateField(val)
    },
    radioGroupChange(val, changeFn) {
      changeFn && this.$emit(changeFn, val)
    },
    checkboxChange(val, changeFn) {
      changeFn && this.$emit(changeFn, val)
    },
    dateChange(val, changeFn) {
      changeFn && this.$emit(changeFn, val)
    },
    selectChange(val, changeFn) {
      changeFn && this.$emit(changeFn, val)
    },
    remoteMethod(query) {
      console.log(query, 'query')
      console.log(this.remoteSelectAxiosFn, 'remoteSelectAxiosFn')
      if (query !== '') {
        this.selectLoading = true
        // 此处不知道接口内容是啥，暂且不做
        this.$axios[this.remoteSelectAxiosFn](query).then(res => {
          console.log(res)
          this.selectLoading = false
          this.selectOptionList = res.data
        })
      }
    },
    cascaderChange(val, changeFn) {
      changeFn && this.$emit(changeFn, val)
    }
  },
  filters: {
    checkboxFilter(valList, optionList) {
      if (!optionList) return
      const arr = []
      valList.forEach(item => {
        const res = optionList.filter(it => item === it.value)
        arr.push(res[0].label)
      })
      return arr.join(' / ')
    },
    dateFilter(val, type) {
      if (type.includes('range')) {
        return val[0] + ' —— ' + val[1]
      } else {
        return val
      }
    },
    selectFilter(val, optionList) {
      if (!optionList) return
      const arr = []
      if (Array.isArray(val)) {
        val.forEach(item => {
          const res = optionList.filter(it => item === it.value)
          arr.push(res[0].label)
        })
      } else {
        const res = optionList.filter(it => val === it.value)
        arr.push(res[0].label)
      }
      return arr.join(' / ')
    }
  }
}
</script>

<style scoped>
</style>
