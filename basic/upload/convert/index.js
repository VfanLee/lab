const convertArrayBuffer1 = async e => {
  const file = e.target.files[0]
  if (file) {
    const ab = await file.arrayBuffer()
    console.log(ab)
  }
}

// 考虑兼容性可以使用如下方式
const convertArrayBuffer2 = e => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      const ab = e.target.result
      console.log(ab)
    }
    reader.readAsArrayBuffer(file)
  }
}

const convertDataURL = async e => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      const du = e.target.result
      console.log(du)
    }
    reader.readAsDataURL(file)
  }
}

const convertBinaryString = async e => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      const bs = e.target.result
      console.log(bs)
    }
    reader.readAsBinaryString(file)
  }
}
