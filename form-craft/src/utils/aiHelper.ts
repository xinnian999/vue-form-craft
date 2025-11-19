import generateSchemaPrompt from '@/config/generateSchemaPrompt.md?raw'
import type { AiGenerateFunction, AiGenerateParams } from '@/types'

/**
 * AI辅助工具类
 * 提供统一的AI调用接口
 */
export class AiHelper {
  private aiFunction?: AiGenerateFunction

  constructor(aiFunction?: AiGenerateFunction) {
    this.aiFunction = aiFunction
  }

  /**
   * 检查AI功能是否可用
   */
  isAvailable(): boolean {
    return !!this.aiFunction
  }

  /**
   * 调用AI生成
   * @param params AI生成参数
   * @returns 生成的结果
   */
  async generate(params: AiGenerateParams): Promise<any> {
    if (!this.aiFunction) {
      throw new Error('AI功能未配置,请在app.use时注入ai函数')
    }

    try {
      const result = await this.aiFunction(params)
      return result
    } catch (error: any) {
      // 如果是取消操作,直接抛出
      if (error.name === 'AbortError' || error.message === '已取消生成') {
        throw error
      }
      // 其他错误包装后抛出
      throw new Error(`AI生成失败: ${error.message || '未知错误'}`)
    }
  }

  /**
   * 生成表单Schema
   * @param prompt 用户输入的提示词
   * @param currentSchema 当前表单Schema
   * @param signal 取消信号
   */
  async generateFormSchema(
    prompt: string,
    currentSchema: Record<string, any>,
    signal?: AbortSignal
  ): Promise<any> {
    return this.generate({
      prompt: `${generateSchemaPrompt}\n\n请基于当前表单Schema:${JSON.stringify(currentSchema)},生成新的表单Schema。\n\n要求:${prompt}`,
      signal
    })
  }

  /**
   * 生成文本内容
   * @param prompt 提示词
   * @param signal 取消信号
   */
  async generateText(prompt: string, signal?: AbortSignal): Promise<string> {
    const result = await this.generate({
      prompt,
      signal
    })
    return typeof result === 'string' ? result : JSON.stringify(result)
  }

  /**
   * 生成校验规则
   * @param fieldName 字段名
   * @param fieldType 字段类型
   * @param requirements 校验要求描述
   * @param signal 取消信号
   */
  async generateValidationRule(
    fieldName: string,
    fieldType: string,
    requirements: string,
    signal?: AbortSignal
  ): Promise<any> {
    return this.generate({
      prompt: `为${fieldType}类型的"${fieldName}"字段生成校验规则,要求:${requirements}`,
      signal
    })
  }
}

/**
 * 创建AI辅助实例
 */
export function createAiHelper(aiFunction?: AiGenerateFunction): AiHelper {
  return new AiHelper(aiFunction)
}
