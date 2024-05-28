<script setup>
import { ref } from 'vue'
import useLangStore from '@/store/modules/lang'

const langStore = useLangStore()

const lang = ref(langStore.currentLang)
const changeLang = value => {
  langStore.setLang(value)
}
</script>

<template>
  <el-radio-group v-model="lang" @change="changeLang">
    <el-radio-button label="zh">简体中文</el-radio-button>
    <el-radio-button label="en">English</el-radio-button>
    <el-radio-button label="ar">عربى</el-radio-button>
  </el-radio-group>
</template>
