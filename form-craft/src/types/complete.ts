export interface CompletionItem {
  name: string // 名称（同时作为显示名称和插入值）
  meta: string // 描述信息
  score: number // 优先级分数
  enum?: CompletionItem[] // 枚举值
}

export type GetCompletionItems = ({
  session,
  pos,
  beforeCursor
}: {
  session: any
  pos: any
  beforeCursor: string
}) => CompletionItem[]
