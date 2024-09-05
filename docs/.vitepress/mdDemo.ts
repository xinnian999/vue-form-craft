import markdownItContainer from 'markdown-it-container'
import path from 'path'
import fs from 'fs'

export default (md: any) => {
  md.use(markdownItContainer, 'demo', {
    validate: (params: string) => {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens: any, idx: number) {
      if (tokens[idx].nesting === 1) {
        const filePath = tokens[idx + 2].content
        const sourcePath = path.resolve('docs', filePath)
        const source = fs.readFileSync(sourcePath, 'utf-8')

        return `<Demo code="${encodeURIComponent(source)}"><template #source><${filePath.split('.')[0].replaceAll('/', '-')}/></template>` // 开始标签
      } else {
        // 处理结束标签
        return '</Demo>\n' // 结束标签
      }
    }
  })
}
