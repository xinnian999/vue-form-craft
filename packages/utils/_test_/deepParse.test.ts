import { expect, test } from 'vitest'
import {deepParse} from '@vue-form-craft/utils'

test('deepParse : {{ $values.a + $values.b }}', () => {
  expect(deepParse('{{ $values.a + $values.b }}', { $values: { a: 1, b: 2 } })).toBe(3)
})
