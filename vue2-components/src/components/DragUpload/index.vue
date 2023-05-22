<template>
  <div class="component-container">
    <input
      id="input-dom-element"
      ref="input-dom-element"
      type="file"
      accept=".xlsx,.csv"
      @change="handleChange"
    />

    <div
      id="drop-dom-element"
      ref="drop-dom-element"
      :class="{
        'is-enter': isEnter,
      }"
      :style="{
        width,
        height,
      }"
      @click="handleClickUpload"
      @dragenter="handleDragenter"
      @dragover.prevent
      @dragleave="handleDragleave"
      @drop.prevent="handleDrop"
    >
      <span class="tip1">选择文件</span>
      <span class="tip2">拖拽文件到此处或者选择文件(.csv .xlsx)</span>
    </div>
  </div>
</template>

<script>
import { read, utils } from "xlsx";

export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "170px",
    },
    onBefore: {
      type: Function,
      default: () => true,
    },
    onSuccess: Function,
  },

  data() {
    return {
      isEnter: false,
    };
  },

  methods: {
    async renderData(file) {
      if (!this.onBefore(file)) return;
      const ab = await file.arrayBuffer();
      const workbook = read(ab);
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = utils.sheet_to_json(worksheet);
      this.onSuccess(data, workbook);
    },
    handleDragenter(e) {
      this.isEnter = true;
    },
    handleDragleave(e) {
      this.isEnter = false;
    },
    handleDrop(e) {
      this.isEnter = false;
      const file = e.dataTransfer.files[0];
      this.renderData(file);
    },
    handleChange(e) {
      const file = e.target.files[0];
      this.renderData(file);
    },
    handleClickUpload() {
      this.$refs["input-dom-element"].click();
    },
  },
};
</script>

<style lang="scss" scoped>
#input-dom-element {
  display: none;
}

#drop-dom-element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 2px dashed #797979;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;

  .tip1 {
    font-size: 28px;
  }

  .tip2 {
    font-size: 14px;
  }

  &.is-enter {
    color: #797979;
  }
}
</style>
