<template>
  <div class="view__container">
    <input type="tel" :class="['intl-tel-input', { 'phone-error': isError }]" ref="intl-tel-input" @input="validPhone" />
  </div>
</template>

<script>
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import intlTelInputUtils from 'intl-tel-input/build/js/utils'

export default {
  data() {
    return {
      iti: {},
      isError: false,
      phone: '',
    }
  },
  methods: {
    validPhone() {
      console.log({
        '验证当前号码': this.iti.isValidNumber(),
        '获取电话号码': this.iti.getNumber(),
        '获取当前选定标志的国家/地区数据': this.iti.getSelectedCountryData(),
      })

      if (this.iti.getNumber() === '') {
        this.isError = false
      } else {
        this.isError = !this.iti.isValidNumber()
      }
    },
  },
  mounted() {
    this.iti = intlTelInput(this.$refs['intl-tel-input'], {
      // utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18/build/js/utils.js",
      utilsScript: intlTelInputUtils, // 加载 utils.js 脚本

      initialCountry: 'auto',
      geoIpLookup: callback => {
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(data => callback(data.country_code))
          .catch(() => callback('us'))
      },

      customPlaceholder: (selectedCountryPlaceholder, selectedCountryData) => selectedCountryPlaceholder, // 自定义占位符
      preferredCountries: [], // 指定要显示在列表顶部的国家/地区
      separateDialCode: true, // 在所选标志旁边显示国家拨号代码
    })

    // this.iti.setCountry('CN') // 更改国家选择
    // this.iti.setNumber('+8615392914621') // 插入一个数字，并相应地更新所选标志
  },
}
</script>

<style lang="scss" scoped>
.view__container {
  padding: 100px;
}

::v-deep {
  .iti {
    width: 100%;
  }
}

.intl-tel-input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid black;
  border-radius: 4px;

  &.phone-error {
    border-color: red;
  }
}
</style>
