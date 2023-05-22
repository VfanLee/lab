# ExportSheet

将数据导出到文件（.xlsx .csv）。

## props

| prop       | 描述                             |   默认值   |
| ---------- | -------------------------------- | :--------: |
| file-name  | 导出的文件名称，根据文件名后缀判断 | Sheet.xlsx |
| sheet-name | 导出的 sheet 名称                |   Sheet1   |
| aoa        | 源数据，[[], []]                 |     []     |
| aoo        | 源数据，[{}, {}]                 |     []     |

aoa、aoo 二选一，若同时声明，取 aoa。

## slots

default: 按钮文字
