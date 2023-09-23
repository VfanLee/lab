// Tinymce：https://www.tiny.cloud/docs/quick-start/

tinymce.init({
  selector: '#mytextarea',
  language: 'zh_CN',
  height: 500,
  placeholder: '请输入内容',
  resize: 'both', // 宽高是否可变
  statusbar: true, // 字数统计
  branding: false, // Tiny 技术支持
  // 引入插件
  plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons help',

  // 菜单栏配置：https://www.tiny.cloud/docs/configure/editor-appearance/#menu
  menu: {
    file: { title: 'File', items: 'newdocument restoredraft | preview | print' },
    edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
    view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
    insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
    format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
    tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
    table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
    help: { title: 'Help', items: 'help' }
  },
  menubar: 'file edit view insert format tools table help',

  // 工具栏配置：https://www.tiny.cloud/docs/configure/editor-appearance/#toolbar
  toolbar: [
    `fullscreen undo redo restoredraft |
        cut copy paste pastetext |
        forecolor backcolor bold italic underline strikethrough link anchor |
        alignleft aligncenter alignright alignjustify outdent indent |
        bullist numlist |
        blockquote subscript superscript removeformat ', 'styleselect formatselect fontselect fontsizeselect |
        table image axupimgs media emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace |
        code print preview |
        indent2em lineheight formatpainter`
  ],

  // setup：https://www.tiny.cloud/docs/configure/integration-and-setup/#setup
  setup(editor) {
    console.log('setup', editor)

    // 事件处理：https://www.tiny.cloud/docs/advanced/events/
    editor.on('input', function () {
      var content = editor.getContent()
      var textContent = editor.getContent({ format: 'text' })
      var charCount = textContent.length
      var wordCount = textContent.split(/\s+/).filter(Boolean).length

      console.log('内容:', content)
      console.log('字符数:', charCount)
      console.log('字数:', wordCount)
    })
  },

  // init_instance_callback：https://www.tiny.cloud/docs/configure/integration-and-setup/#init_instance_callback
  init_instance_callback: function (editor) {
    console.log('init_instance_callback', editor)
    editor.setContent('<p>这是初始内容。</p>')
  }
})
