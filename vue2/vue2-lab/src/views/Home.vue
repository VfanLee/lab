<template>
  <div class="home">
    <h2>{{ $t('home') }}</h2>

    <section>{{ $t('currentDate', { date: currentDate }) }}</section>
    <section v-html="$t('currentDate', { date: currentDateHtml })"></section>

    <section>
      <h2>Element UI【PC】</h2>
      <el-calendar v-model="calendarValue" />
    </section>

    <section>
      <h2>Vant v2【Mobile】</h2>
      <van-calendar :poppable="false" :show-confirm="false" :style="{ height: '500px' }" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      currentDate: new Date(),
      currentDateHtml: `<span style="color: var(--primary-color)">${new Date()}</span>`,
      calendarValue: new Date()
    }
  }
}
</script>
