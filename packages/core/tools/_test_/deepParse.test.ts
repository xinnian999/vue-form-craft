import { expect, test } from 'vitest'
import {tools} from '@form-magic/core'  

const {deepParse} = tools

test('deepParse : {{ $values.a + $values.b }}', () => {
  expect(deepParse('{{ $values.a + $values.b }}', { $values: { a: 1, b: 2 } })).toBe(3)
})
