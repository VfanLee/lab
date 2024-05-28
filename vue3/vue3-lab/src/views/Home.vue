<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
const currentDateHtml = ref(`<span style="color: var(--primary-color)">${new Date()}</span>`)
const calendarValue = ref(new Date())
</script>

<template>
  <div class="home">
    <h2>{{ $t('home') }}</h2>

    <section>{{ $t('currentDate', { date: currentDate }) }}</section>
    <section v-html="$t('currentDate', { date: currentDateHtml })"></section>

    <section>
      <h3>Element Plus【PC】</h3>
      <el-calendar v-model="calendarValue" />
    </section>

    <section>
      <h3>Vant v4【Mobile】</h3>
      <van-calendar :poppable="false" :show-confirm="false" :style="{ height: '500px' }" />
    </section>
  </div>
</template>
