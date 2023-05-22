# DragUpload

拖拽、点击上传文件（.xlsx .csv）。

## props

| prop                       | 描述                                                                                         | 默认值 |
| -------------------------- | -------------------------------------------------------------------------------------------- | :----: |
| width                      | 宽度                                                                                         |  100%  |
| height                     | 高度                                                                                         | 170px  |
| on-before(file)            | 解析文件之前回调函数</br> file：上传的文件 File 对象                                         |        |
| on-success(data, workbook) | 解析文件成功后回调函数</br>data：解析后的 json 格式数据</br>workbook：解析后的 workbook 对象 |        |
