/* ------ utils ------ */
/**
 * @returns {HTMLElement}
 */
function $(selector) {
  return document.querySelector(selector)
}
/* ------ utils ------ */

const uploadZone = $('.upload-zone')
const uploadFile = $('.upload-file')
const uploadImg = $('.upload-img')

function vaildFile(file) {
  const limitType = ['image/png', 'image/jpg', 'image/jpeg']
  if (!limitType.includes(file.type)) {
    alert('仅支持上传 .png, .jpg, .jpeg 类型的图片')
    return false
  }
  return true
}

function upload(file) {
  if (file) {
    if (vaildFile(file)) {
      // array buffer
      const readAb = new FileReader()
      readAb.onload = e => {
        const data = e.target.result
        console.log(data)
      }
      readAb.readAsArrayBuffer(file)
    } else {
      e.target.value = ''
    }
  }
}

uploadZone.addEventListener('click', e => {
  uploadFile.click()
})

uploadFile.addEventListener('change', e => {
  const file = e.target.files[0]
  upload(file)
})

uploadZone.addEventListener('dragstart', e => {
  e.target.classList.add('is-active')
})

uploadZone.addEventListener('dragover', e => {
  e.preventDefault()
})

uploadZone.addEventListener('dragover', e => {
  e.target.classList.remove('is-active')
})

uploadZone.addEventListener('drop', e => {
  e.preventDefault()
  e.target.classList.remove('is-active')
  const file = e.dataTransfer.files[0]
  upload(file)
})
