<template>
  <div class="">
    <h2>paste</h2>
    <input type="text" @paste="onPasete" />

    <h2>上传示例</h2>
    <DragUpload :on-before="onBefore" :on-success="onSuccess" />

    <h2>导出示例</h2>
    <ExportSheet :aoo="templateAOO" file-name="batch_add_accounts.xlsx">
      .xlsx模板
    </ExportSheet>
    <ExportSheet :aoo="templateAOO" file-name="batch_add_accounts.csv">
      .csv模板
    </ExportSheet>
    <ExportSheet :aoo="data" file-name="sheet.xlsx">
      根据导入数据导出.xlsx
    </ExportSheet>
    <ExportSheet :aoo="data" file-name="sheet.csv">
      根据导入数据导出.csv
    </ExportSheet>

    <h2>手动渲染预览</h2>
    <table border>
      <tr>
        <th v-for="key of keys" :key="key">{{ key }}</th>
      </tr>
      <tr v-for="row of data" :key="row.id">
        <td v-for="(rowVal, rowKey, index) of row" :key="index" :title="index">
          {{ rowVal }}
        </td>
      </tr>
    </table>

    <h2>第三方工具渲染预览</h2>
    <GridSheet :workbook="workbook" />
  </div>
</template>

<script>
import DragUpload from "@/components/DragUpload";
import GridSheet from "@/components/GridSheet";
import ExportSheet from "@/components/ExportSheet";
import { templateAOA, templateAOO } from "@/components/ExportSheet/template";
import { clip2AOO } from "@/utils";

export default {
  components: {
    DragUpload,
    GridSheet,
    ExportSheet,
  },

  data() {
    return {
      data: [],
      workbook: {},
      keys: [],
      templateAOA,
      templateAOO,
    };
  },

  watch: {
    data(newVal) {
      this.keys = Object.keys(newVal[0]);
    },
  },

  methods: {
    onPasete(e) {
      e.preventDefault();

      navigator.clipboard
        .readText()
        .then(clipText => {
          const aoo = clip2AOO(clipText);

          console.log(aoo);
          this.$message.success("粘贴成功");
          this.data = aoo;
        })
        .catch(err => {
          console.log(err);
          this.$message.error("粘贴失败");
        });
    },
    // 校验文件
    validFile(file) {
      if (!file) {
        return false;
      }

      if (!/.(xlsx|csv)$/.test(file.name)) {
        this.$message.error("文件格式不正确，请选择.csv或者.xlsx文件");
        return false;
      }

      const limitSize = 5 * 1024 * 1024;
      if (file.size > limitSize) {
        this.$message.error("文件不能超过5M");
        return false;
      }

      return true;
    },
    onBefore(file) {
      return this.validFile(file);
    },
    onSuccess(data, workbook) {
      this.data = data;
      this.workbook = workbook;
    },
  },
};
</script>
