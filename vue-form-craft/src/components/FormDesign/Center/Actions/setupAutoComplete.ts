import JsonEditor from 'jsoneditor'

// 配置补全项定义
const completionItems = {
  // 表单全局配置
  formConfig: [
    { name: 'labelWidth', value: 'labelWidth', meta: '表单label宽度', score: 1000 },
    { name: 'labelAlign', value: 'labelAlign', meta: '表单label对齐方式', score: 999 },
    { name: 'labelSuffix', value: 'labelSuffix', meta: '表单label后缀', score: 998 },
    { name: 'labelBold', value: 'labelBold', meta: '是否加粗label', score: 997 },
    { name: 'size', value: 'size', meta: '表单项大小', score: 996 },
    {
      name: 'hideRequiredAsterisk',
      value: 'hideRequiredAsterisk',
      meta: '是否隐藏必填星号',
      score: 995
    },
    { name: 'disabled', value: 'disabled', meta: '是否禁用整个表单', score: 994 },
    { name: 'scrollToError', value: 'scrollToError', meta: '是否滚动到错误字段', score: 993 },
    { name: 'items', value: 'items', meta: '表单项配置数组', score: 992 },
    { name: 'initialValues', value: 'initialValues', meta: '表单初始值', score: 991 },
    { name: 'submitBtn', value: 'submitBtn', meta: '是否显示提交按钮', score: 990 },
    { name: 'resetBtn', value: 'resetBtn', meta: '是否显示重置按钮', score: 989 }
  ],
  // 表单项配置
  formItem: [
    { name: 'label', value: 'label', meta: '表单项标签', score: 1000 },
    { name: 'name', value: 'name', meta: '表单项唯一标识', score: 999 },
    { name: 'component', value: 'component', meta: '组件类型', score: 998 },
    { name: 'props', value: 'props', meta: '组件属性', score: 997 },
    { name: 'required', value: 'required', meta: '是否必填', score: 996 },
    { name: 'initialValue', value: 'initialValue', meta: '初始值', score: 995 },
    { name: 'help', value: 'help', meta: '提示信息', score: 994 },
    { name: 'hidden', value: 'hidden', meta: '是否隐藏', score: 993 },
    { name: 'hideLabel', value: 'hideLabel', meta: '是否隐藏标签', score: 992 },
    { name: 'rules', value: 'rules', meta: '校验规则', score: 991 },
    { name: 'children', value: 'children', meta: '子表单项', score: 990 },
    { name: 'change', value: 'change', meta: '联动配置', score: 989 },
    { name: 'designKey', value: 'designKey', meta: '设计器标识', score: 988 },
    { name: 'class', value: 'class', meta: 'CSS类名', score: 987 },
    { name: 'style', value: 'style', meta: '内联样式', score: 986 },
    { name: 'width', value: 'width', meta: '宽度', score: 985 },
    { name: 'dialog', value: 'dialog', meta: '是否弹窗', score: 984 }
  ],
  // 表达式变量
  expression: [
    { name: '$values', value: '$values', meta: '表单数据对象', score: 1000 },
    { name: '$values.', value: '$values.', meta: '访问表单字段', score: 999 }
  ],
  // 常用组件
  components: [
    { name: 'Input', value: 'Input', meta: '输入框', score: 1000 },
    { name: 'Password', value: 'Password', meta: '密码框', score: 999 },
    { name: 'TextArea', value: 'TextArea', meta: '文本域', score: 998 },
    { name: 'InputNumber', value: 'InputNumber', meta: '数字输入框', score: 997 },
    { name: 'Select', value: 'Select', meta: '选择器', score: 996 },
    { name: 'Radio', value: 'Radio', meta: '单选框', score: 995 },
    { name: 'Checkbox', value: 'Checkbox', meta: '多选框', score: 994 },
    { name: 'Switch', value: 'Switch', meta: '开关', score: 993 },
    { name: 'DatePicker', value: 'DatePicker', meta: '日期选择器', score: 992 },
    { name: 'TimePicker', value: 'TimePicker', meta: '时间选择器', score: 991 },
    { name: 'Rate', value: 'Rate', meta: '评分', score: 990 },
    { name: 'Slider', value: 'Slider', meta: '滑块', score: 989 }
  ]
}

// 设置 Ace 编辑器自动完成
const setupAutoComplete = (editor: JsonEditor) => {
  const aceEditor = (editor as any)?.aceEditor
  if (!aceEditor) return

  try {
    const langTools = (window as any).ace?.require('ace/ext/language_tools')
    if (!langTools) return

    // 智能补全器
    const completer: any = {
      id: 'formSchemaCompleter',
      getCompletions: (editor: any, session: any, pos: any, prefix: string, callback: Function) => {
        const line = session.getLine(pos.row)
        const beforeCursor = line.substring(0, pos.column)

        // 匹配 {{ 后的表达式补全
        if (beforeCursor.includes('{{') && !beforeCursor.includes('}}')) {
          return callback(
            null,
            completionItems.expression.map((item) => ({
              caption: item.name,
              value: item.value,
              meta: item.meta,
              score: item.score
            }))
          )
        }

        // 获取当前输入的前缀(去除引号)
        const cleanPrefix = prefix.replace(/['"]/g, '').toLowerCase()

        // 判断当前是在 key 还是 value 位置
        const isInKey = () => {
          // 去除注释和字符串后的行内容
          const trimmedLine = beforeCursor.trim()

          // 如果行以 { 或 , 开始(可能有空格),或者在引号内且前面是 : 之前,则是 key
          // 检查最后一个非空字符
          const lastMeaningfulChar = trimmedLine.replace(/["'\s]/g, '').slice(-1)

          // 在 key 位置的特征:
          // 1. 前面是 { 或 ,
          // 2. 或者在引号内,且引号前是 { 或 ,
          if (lastMeaningfulChar === '{' || lastMeaningfulChar === ',') {
            return true
          }

          // 检查是否在冒号之前(key位置)
          const colonIndex = beforeCursor.lastIndexOf(':')
          const lastQuoteIndex = Math.max(
            beforeCursor.lastIndexOf('"'),
            beforeCursor.lastIndexOf("'")
          )

          // 如果最后一个引号在冒号之前,说明在 key 位置
          if (colonIndex === -1 || lastQuoteIndex > colonIndex) {
            // 进一步检查:确保不是在 value 的引号内
            const openBraceIndex = beforeCursor.lastIndexOf('{')
            const commaIndex = beforeCursor.lastIndexOf(',')
            const lastStructureChar = Math.max(openBraceIndex, commaIndex)

            // 如果最后的结构字符(,或{)之后没有冒号,则是 key
            const textAfterStructure = beforeCursor.substring(lastStructureChar)
            return !textAfterStructure.includes(':')
          }

          return false
        }

        // 判断当前是否在第一层(根层级)
        const isRootLevel = () => {
          try {
            // 获取从文档开始到当前位置的所有文本
            const textBeforeCursor = session.getLines(0, pos.row).join('\n') + beforeCursor

            // 统计左右大括号和方括号的数量
            let braceDepth = 0 // {}
            let bracketDepth = 0 // []
            let inString = false
            let stringChar = ''

            for (let i = 0; i < textBeforeCursor.length; i++) {
              const char = textBeforeCursor[i]
              const prevChar = i > 0 ? textBeforeCursor[i - 1] : ''

              // 处理字符串状态
              if ((char === '"' || char === "'") && prevChar !== '\\') {
                if (!inString) {
                  inString = true
                  stringChar = char
                } else if (char === stringChar) {
                  inString = false
                  stringChar = ''
                }
              }

              // 在字符串外才统计括号
              if (!inString) {
                if (char === '{') braceDepth++
                else if (char === '}') braceDepth--
                else if (char === '[') bracketDepth++
                else if (char === ']') bracketDepth--
              }
            }

            // 第一层: braceDepth === 1 且 bracketDepth === 0
            return braceDepth === 1 && bracketDepth === 0
          } catch (error) {
            return false
          }
        }

        // 根据位置和层级决定补全项
        let allItems = []

        if (isInKey()) {
          // 在 key 位置: 根据层级显示配置项
          if (isRootLevel()) {
            // 第一层: 只显示表单全局配置
            allItems = [...completionItems.formConfig]
          } else {
            // 其他层级: 显示表单项配置
            allItems = [...completionItems.formItem]
          }
        } else {
          // 在 value 位置: 显示表达式和组件
          allItems = [...completionItems.expression, ...completionItems.components]
        }

        // 根据前缀过滤补全项
        const filtered = allItems
          .filter((item) => item.name.toLowerCase().includes(cleanPrefix))
          .map((item) => ({
            caption: item.name,
            value: item.value,
            meta: item.meta,
            score: item.score
          }))

        callback(null, filtered)
      }
    }

    // 完全替换补全器,只保留自定义补全器
    aceEditor.completers = [completer]

    // 启用自动补全
    aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true, // 开启实时补全
      enableSnippets: false // 禁用代码片段
    })

    // 自动触发补全的快捷键
    aceEditor.commands.addCommand({
      name: 'triggerAutoComplete',
      bindKey: { win: 'Ctrl-Space', mac: 'Cmd-Space' },
      exec: (editor: any) => {
        editor.execCommand('startAutocomplete')
      }
    })
  } catch (error) {
    console.debug('Setup autocomplete error:', error)
  }
}

export default setupAutoComplete
