onmessage = function (e) {
  console.log("worker 接收消息");
  const result = e.data[0] + e.data[1]
  const workerResult = result
  console.log("worker 发送消息");
  postMessage(workerResult)
}
