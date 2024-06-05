<template>
  <div id="app">
    <nav>
      <RouterLink to="/">{{ $t('home') }}</RouterLink>
      |
      <RouterLink to="/about">{{ $t('about') }}</RouterLink>
    </nav>

    <LangSwitcher />

    <RouterView />
  </div>
</template>

<script>
import LangSwitcher from '@/components/LangSwitcher.vue'

export default {
  name: 'App',

  components: {
    LangSwitcher
  }
}
</script>

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
