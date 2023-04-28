const text1 = document.querySelector('#text1')
const text2 = document.querySelector('#text2')
const result = document.querySelector('#result')

if (window.Worker) {
  const myWorker = new Worker('./worker.js')

  text1.addEventListener("input", function() {
    console.log('text1 更新数据，worker 发送消息')
    myWorker.postMessage([text1.value, text2.value])
  })

  text2.addEventListener("input", function() {
    console.log('text2 更新数据，worker 发送消息')
    myWorker.postMessage([text1.value, text2.value])
  })

  myWorker.onmessage = function (e) {
    console.log("worker 接收消息，更新 result");
    result.value = e.data
  }
} else {
  console.log("Your browser doesn't support web workers.")
}
