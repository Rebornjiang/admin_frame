<template>
  <div class="searchListDemo">
    <h1>Demo</h1>
    <div class="wrap">
      <jr-search
        :inputList="inputList"
      ></jr-search>
    </div>
  </div>
</template>

<script>
import JrSearch from '@/components/JrSearch.vue'
export default {
  components: {
    JrSearch
  },
  data() {
    return {
      inputList: [
        {
          type: 'text-input',
          span: 8,
          label: '你好',
          bind_key: 'textVal'
        },
        {
          type: 'cascader-input',
          span: 7,
          label: '你好',
          optionList: [],
          bind_key: 'cascaderVal',
          changeFn: (val) => {
            console.log(val, '选中的dfadsf值')
            console.log(this, 'vue实例')
          }
        },
        {
          span: 8,
          type: 'select-input',
          label: '下拉框',
          bind_key: 'selectVal',
          optionList: [
            {
              value: 1,
              label: 'hhh'
            },
            {
              value: 2,
              label: 'jjj'
            }
          ],
          changeFn: (val) => {
            console.log('select', val)
          }
        },
        {
          type: 'remote-input',
          span: 8,
          label: '远程搜索',
          bind_key: 'remoteVal',
          optionlist: [],
          remoteMethod: (query) => {
            console.log(query, 'remote')
          }
        },
        {
          type: 'date-input',
          span: 8,
          label: '日期',
          bind_key: 'dateVal',
          datePickerType: 'date',
          dateConfig: {
            disabledDate(time) {
              const oneday = 86400
              const before = Date.now() - oneday * 5
              // console.log(before < Date.now())
              return time.getTime() >= before
            }
          },
          changeFn: (val) => {
            console.log('日期选择', val)
          }
        },
        {
          type: 'time-input',
          span: 12,
          label: '时间日期',
          bind_key: 'timeVal',
          dateConfig: {
            disabledDate(time) {
              const oneday = 86400
              const before = Date.now() - oneday * 5
              // console.log(before < Date.now())
              return time.getTime() >= before
            }
          },
          changeFn: (val) => {
            console.log('shijian日期选择', val)
          }
        },
        {
          type: 'number-input',
          span: 8,
          label: 'number类型',
          bind_key: 'numberVal',
          min: 10,
          max: 20,
          controlsPosition: 'right'
        },
        {
          type: 'radio-input',
          span: 8,
          label: 'checkbox',
          bind_key: 'radioVal'
        },
        {
          type: 'radioGroup-input',
          span: 8,
          label: '单选group',
          bind_key: 'radioGroupVal',
          optionList: [
            {
              value: 1,
              label: '男'
            },
            {
              value: 2,
              label: '女'
            }
          ],
          changeFn: (val) => {
            console.log(val, 'changefn')
          }
        }
      ]
    }
  },
  mounted() {
    this.inputList[1].optionList = [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'dlkjfl',
            label: '的JFK了解多少'
          }
        ]
      }
    ]
  }
}
</script>

<style lang="stylus" scoped>
  .wrap
    width 800px
    padding 20px
    height 800px
    border 1px solid #ccc
    margin 0 auto
</style>
