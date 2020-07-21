<template>
  <div class="home">
    <h1>demo</h1>
    <div style="width: 500px;margin: 0 auto; border: 1px solid #ccc; height: 500px;">
      <jr-form refName="testForm" :formConfig="formConfig" :formData="formData" :rules="rules"> </jr-form>
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
      formData: {},
      rules: {},
      formConfig: [
        {
          span: 24,
          list: [
            {
              type: 'text',
              prop: 'testVal',
              label: '文本类型'
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
    }
  }
}
</script>
