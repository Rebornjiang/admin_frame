<template>
  <div class="home">
    <h1>demo</h1>
    <div style="width: 500px;margin: 0 auto; border: 1px solid #ccc;padding: 20px;">
      <jr-form
        refName="testForm"
        :formConfig="formConfig"
        :formData="formData"
        :btnConfig="btnConfig"
        :rules="rules"
        remoteSelectAxiosFn="login"
        @dateChange="dateChange"
        @radioGroupChange="radioGroupChange"
        @selectChange="selectChange"
        @submitCallback="submitCallback"
      >
      </jr-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import JrForm from '@/components/JrForm.vue'
console.log(JrForm, 'jrform')
export default {
  name: 'Home',
  components: { JrForm },
  data() {
    return {
      formData: { selectVal: [1, 2], dateTimeVal: ['2020-06-30 12:00:00', '2020-07-30 12:00:00'], dateVal: ['2020-06-30', '2020-07-30'], checkboxVal: [1, 2], readOnlyVal: 'hello world', passwordVal: '1234541', textareaVal: 'jalsdkjfalkdsjf' },
      rules: {
        testVal: [{ required: true, message: '请完成扁担填写', trigger: 'blur' }]
      },
      btnConfig: {
        isShowBtn: true,
        list: [
          {
            isShow: true,
            fnType: 'firstFn',
            axiosFn: 'login',
            callback: 'submitCallback'
          },
          {
            isShow: true,
            fnType: 'lastFn',
            isCancelBtn: false
          }
        ]
      },
      formConfig: [
        {
          span: 24,
          list: [
            {
              type: 'text',
              beforeTxt: 'hello',
              prop: 'testVal',
              label: '文本类型',
              readOnly: false,
              style: { textAlign: 'right', fontSize: '30px' }
            },
            {
              type: 'readOnly',
              prop: 'readOnlyVal',
              label: '只读文本',
              afterTxt: '哈哈哈'
            },
            {
              type: 'password',
              prop: 'passwordVal',
              label: '密码'
            },
            {
              type: 'textarea',
              prop: 'textareaVal',
              label: '文本域',
              readOnly: false
            },
            {
              type: 'radioGroup',
              prop: 'radioGroupVal',
              label: '单选框组',
              optionList: [
                { label: '吃饭', value: 1 },
                { label: '睡觉', value: 2 }
              ],
              changeFn: 'radioGroupChange'
            },
            {
              type: 'radioItem',
              prop: 'radioItemVal',
              label: '单项单选'
            },
            {
              type: 'checkbox',
              prop: 'checkboxVal',
              label: '多选框',
              optionList: [
                { label: 'reborn', value: 1 },
                { label: 'jiang', value: 2 },
                { label: 'tong', value: 3 }
              ],
              changeFn: 'jfslkdjk',
              readOnly: false
            },
            {
              type: 'date',
              prop: 'dateVal',
              label: '日期选择器',
              readOnly: false,
              dateConfig: {
                disabledDate(time) {
                  const oneday = 86400
                  const before = Date.now() - oneday * 5
                  // console.log(before < Date.now())
                  return time.getTime() >= before
                }
              },
              changeFn: 'dateChange',
              datePickerType: 'datetimerange'
            },
            {
              type: 'dateTime',
              prop: 'dateTimeVal',
              label: '日期时间选择',
              readOnly: false,
              changeFn: 'dateChange'
            },
            {
              type: 'select',
              prop: 'selectVal',
              label: '单项或多选',
              readOnly: false,
              changeFn: 'selectChange',
              multiple: true,
              optionList: [
                {
                  label: '香蕉',
                  value: 1
                },
                {
                  label: '苹果',
                  value: 2
                },
                {
                  label: '波罗蜜',
                  value: 3
                }
              ]
            },
            {
              type: 'remoteSelect',
              prop: 'remoteSelectVal',
              label: '远程搜索'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.loginInfo()
  },
  methods: {
    async loginInfo() {
      const res = await this.$axios.login()
      console.log(res, 'resss')
    },
    radioGroupChange(val) {
      console.log('radioGroupChange改变了')
    },
    dateChange(val) {
      console.log(val, '选择了date了')
    },
    selectChange(val) {
      console.log(val, 'select 选择')
    },
    submitCallback() {
      console.log('提交表单回调触发')
    }
  }
}
</script>
