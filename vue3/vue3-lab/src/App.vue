<script setup>
import useLangStore from './store/modules/lang'
import { RouterLink, RouterView } from 'vue-router'
import elementZh from 'element-plus/dist/locale/zh-cn.min.mjs'
import elementEn from 'element-plus/dist/locale/en.min.mjs'
import elementAr from 'element-plus/dist/locale/ar.min.mjs'
import LangSwitcher from '@/components/LangSwitcher.vue'

const langStore = useLangStore()

// Element Plus 国际化：https://element-plus.org/zh-CN/guide/i18n.html
const ELEMENT_LOCALE = {
  zh: elementZh,
  en: elementEn,
  ar: elementAr
}
</script>

<template>
  <nav>
    <RouterLink to="/">{{ $t('home') }}</RouterLink>
    |
    <RouterLink to="/about">{{ $t('about') }}</RouterLink>
  </nav>

  <LangSwitcher />

  <el-config-provider :locale="ELEMENT_LOCALE[langStore.currentLang]">
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss" scoped>
body {
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: hsla(160, 100%, 37%, 1);
    }
  }
}
</style>
