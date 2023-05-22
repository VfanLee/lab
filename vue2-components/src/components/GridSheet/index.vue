<template>
  <div id="x-spreadsheet-demo"></div>
</template>

<script>
import Spreadsheet from "x-data-spreadsheet";
import "x-data-spreadsheet/dist/locale/zh-cn";
import { stox, xtos } from "@/utils/xlsxspread";

export default {
  props: {
    workbook: {
      require: true,
    },
  },
  data() {
    return {
      s: "",
    };
  },
  watch: {
    workbook() {
      this.s.loadData(stox(this.workbook));
    },
  },
  mounted() {
    // Spreadsheet.locale("zh-cn")
    // Spreadsheet.locale("en");

    const s = new Spreadsheet("#x-spreadsheet-demo", {});
    this.s = s;
  },
};
</script>
