<template>
  <el-radio-group class="lang-switcher" v-model="lang" @change="switchLang">
    <el-radio-button label="zh">简体中文</el-radio-button>
    <el-radio-button label="en">English</el-radio-button>
    <el-radio-button label="ar">عربى</el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  name: 'LangSwitcher',

  data() {
    return {
      lang: this.$store.state.lang.currentLang
    }
  },

  methods: {
    switchLang(lang) {
      this.$store.dispatch('lang/setLang', lang)
    }
  }
}
</script>

<style lang="scss" scoped></style>
