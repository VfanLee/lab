const getFileByChange = e => {
  const files = e.target.files
  console.log('files: ', files)
}

const btnClick = () => {
  const uploadEl = document.getElementById('upload-file-element1')
  uploadEl.click()
}
