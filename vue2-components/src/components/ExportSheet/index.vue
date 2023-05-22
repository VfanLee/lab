<template>
  <el-button type="primary" @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
import { writeFile, utils } from "xlsx";

export default {
  props: {
    fileName: {
      type: String,
      default: "Sheet.xlsx",
    },
    sheetName: {
      type: String,
      default: "Sheet1",
    },
    aoa: {
      type: Array,
      default: () => [],
    },
    aoo: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick() {
      let worksheet = {};

      if (this.aoa.length > 0) {
        worksheet = utils.aoa_to_sheet(this.aoa);
      } else if (this.aoo.length > 0) {
        worksheet = utils.json_to_sheet(this.aoo);
      }

      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, this.sheetName);
      writeFile(workbook, this.fileName);
    },
  },
};
</script>
