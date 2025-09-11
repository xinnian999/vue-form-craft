export interface BubbleItem {
    key: number
    role: 'user' | 'ai'
    content: string
    loading?: boolean
}