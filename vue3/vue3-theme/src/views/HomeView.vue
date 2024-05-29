<script setup>
import { ref, watchEffect } from 'vue'
import useThemeStore from '@/store/theme'
import Card from '@/components/Card.vue'
import { generateColorPalette } from '@/utils/color'

const themeStore = useThemeStore()
const formRef = ref(null)

const elInputValue = ref('')
const elDatePickerValue = ref('')
const show = ref(false)
const theme = ref(themeStore.theme)
const themeOption = {
  light: '明亮主题',
  dark: '暗黑主题',
  lred: '亮红主题',
  dred: '暗红主题'
}
const formData = ref({
  colorPrimary: '',
  bgColor: '',
  bgColorPage: '',
  textColorPrimary: '',
  cardBgColor: '',
  cardBorderColor: '',
  cardTitleColor: '',
  cardContentColor: ''
})

// 加载用户自定义主题
function loadCustomTheme() {
  const customTheme = sessionStorage.getItem('custom-theme')
  if (customTheme) {
    document.documentElement.setAttribute('style', customTheme)
  } else {
    document.documentElement.removeAttribute('style', customTheme)
  }
}
loadCustomTheme()

const switchTheme = command => {
  theme.value = command
  themeStore.setTheme(command)
  loadCustomTheme()
}

const handleDrawerOpen = () => {
  const rootEl = document.documentElement
  formData.value.colorPrimary = getComputedStyle(rootEl).getPropertyValue('--color-primary')
  formData.value.bgColor = getComputedStyle(rootEl).getPropertyValue('--bg-color')
  formData.value.bgColorPage = getComputedStyle(rootEl).getPropertyValue('--bg-color-page')
  formData.value.textColorPrimary = getComputedStyle(rootEl).getPropertyValue('--text-color-primary')
  formData.value.cardBgColor = getComputedStyle(rootEl).getPropertyValue('--card-bg-color')
  formData.value.cardBorderColor = getComputedStyle(rootEl).getPropertyValue('--card-border-color')
  formData.value.cardTitleColor = getComputedStyle(rootEl).getPropertyValue('--card-title-color')
  formData.value.cardContentColor = getComputedStyle(rootEl).getPropertyValue('--card-content-color')
}
const resetDefault = () => {
  ElMessageBox.confirm('确定恢复至默认主题（明亮主题），并清除自定义主题色吗？', '恢复默认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    theme.value = 'light'
    themeStore.setTheme('light')
    document.documentElement.removeAttribute('style')
    sessionStorage.removeItem('custom-theme')

    ElMessage({
      type: 'success',
      message: '已恢复'
    })
  })
}
const submitForm = () => {
  sessionStorage.setItem('custom-theme', document.documentElement.getAttribute('style'))
  ElMessage.success('自定义主题成功')
  show.value = false
}
const cancelForm = () => {
  show.value = false
  formRef.value.resetFields()
  loadCustomTheme()
}

watchEffect(() => {
  const colorPrimary = formData.value.colorPrimary
  if (!colorPrimary) {
    return
  }

  // 全局变量（部分）
  const rootEl = document.documentElement
  rootEl.style.setProperty('--color-primary', formData.value.colorPrimary)
  const lightColorPalette = generateColorPalette(colorPrimary, '#ffffff')
  const darkColorPalette = generateColorPalette(colorPrimary, '#000000')
  lightColorPalette.forEach((el, i) => {
    if (i === 0 || i === lightColorPalette.length) {
      return
    }
    rootEl.style.setProperty(`--color-primary-light-${i}`, el)
  })

  darkColorPalette.forEach((el, i) => {
    if (i === 0 || i === darkColorPalette.length) {
      return
    }
    rootEl.style.setProperty(`--color-primary-dark-${i}`, el)
  })
  rootEl.style.setProperty('--bg-color', formData.value.bgColor)
  rootEl.style.setProperty('--bg-color-page', formData.value.bgColorPage)
  rootEl.style.setProperty('--text-color-primary', formData.value.textColorPrimary)

  // 自定义卡片组件
  rootEl.style.setProperty('--card-bg-color', formData.value.cardBgColor)
  rootEl.style.setProperty('--card-border-color', formData.value.cardBorderColor)
  rootEl.style.setProperty('--card-title-color', formData.value.cardTitleColor)
  rootEl.style.setProperty('--card-content-color', formData.value.cardContentColor)
})
</script>

<template>
  <main class="home__container">
    <div class="view__container">
      <h2 class="view__title">浏览器内置组件</h2>
      <section>
        <button type="button">button</button>
        <button type="button" disabled>button</button>
      </section>
      <section>
        <input type="text" placeholder="Please input" />
        <input type="text" placeholder="Please input" disabled />
      </section>
      <section>
        <input type="datetime-local" />
        <input type="datetime-local" disabled />
      </section>
    </div>

    <div class="view__container">
      <h2 class="view__title">Element Plus 组件</h2>
      <section>
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
      </section>
      <section>
        <el-button disabled>Default</el-button>
        <el-button type="primary" disabled>Primary</el-button>
        <el-button type="success" disabled>Success</el-button>
        <el-button type="info" disabled>Info</el-button>
        <el-button type="warning" disabled>Warning</el-button>
        <el-button type="danger" disabled>Danger</el-button>
      </section>
      <section>
        <el-button plain>Plain</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" plain>Info</el-button>
        <el-button type="warning" plain>Warning</el-button>
        <el-button type="danger" plain>Danger</el-button>
      </section>
      <section>
        <el-button plain disabled>Plain</el-button>
        <el-button type="primary" plain disabled>Primary</el-button>
        <el-button type="success" plain disabled>Success</el-button>
        <el-button type="info" plain disabled>Info</el-button>
        <el-button type="warning" plain disabled>Warning</el-button>
        <el-button type="danger" plain disabled>Danger</el-button>
      </section>
      <section>
        <el-input v-model="elInputValue" placeholder="Please input" />
        <el-input v-model="elInputValue" placeholder="Please input" disabled />
      </section>
      <section>
        <el-date-picker v-model="elDatePickerValue" type="datetime" placeholder="Select date and time" />
        <el-date-picker v-model="elDatePickerValue" type="datetime" placeholder="Select date and time" disabled />
      </section>
    </div>

    <div class="view__container">
      <h2 class="view__title">自定义组件</h2>
      <Card />
    </div>

    <section class="theme__action">
      <el-dropdown trigger="click" @command="switchTheme">
        <div class="el-dropdown-link">{{ themeOption[theme] }}</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(value, key) of themeOption" :key="key" :command="key">{{ value }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <i class="fa-solid fa-wand-magic-sparkles" @click="show = true"></i>
      <i class="fa-solid fa-rotate" @click="resetDefault"></i>
    </section>

    <el-drawer v-model="show" title="自定义样式" direction="rtl" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" @open="handleDrawerOpen">
      <el-form ref="formRef" :model="formData">
        <el-divider content-position="center">全局属性（部分）</el-divider>
        <el-form-item label="color-primary" prop="colorPrimary">
          <input type="color" v-model="formData.colorPrimary" />
        </el-form-item>
        <el-form-item label="bg-color" prop="bgColor">
          <input type="color" v-model="formData.bgColor" />
        </el-form-item>
        <el-form-item label="bg-color-page" prop="bgColorPage">
          <input type="color" v-model="formData.bgColorPage" />
        </el-form-item>
        <el-form-item label="text-color-primary" prop="textColorPrimary">
          <input type="color" v-model="formData.textColorPrimary" />
        </el-form-item>

        <el-divider content-position="center">自定义卡片组件属性</el-divider>
        <el-form-item label="card-bg-color" prop="cardBgColor">
          <input type="color" v-model="formData.cardBgColor" />
        </el-form-item>
        <el-form-item label="card-border-color" prop="cardBorderColor">
          <input type="color" v-model="formData.cardBorderColor" />
        </el-form-item>
        <el-form-item label="card-title-color" prop="cardTitleColor">
          <input type="color" v-model="formData.cardTitleColor" />
        </el-form-item>
        <el-form-item label="card-content-color" prop="cardContentColor">
          <input type="color" v-model="formData.cardContentColor" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </template>
    </el-drawer>
  </main>
</template>

<style lang="scss">
.home__container {
  width: 100vw;
  padding: 20px;
  background-color: var(--bg-color-page);
}

.view__container + .view__container {
  margin-top: 40px;
}

.theme__action {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
}
</style>
