import preferTacitStyle from './prefer-tacit-style'
import { ESLintUtils } from '@typescript-eslint/utils'

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser'
})

ruleTester.run('justive-better-ts-belt', preferTacitStyle, {
  valid: [],
  invalid: [
    {
      code: `const x = (a) => pipe(a,O.getWithDefault(3))`,
      errors: [{ messageId: 'preferTacitStyle' }]
    },
    {
      code: `const x = (a) => O.getWithDefault(a,3)`,
      errors: [{ messageId: 'preferTacitStyle' }]
    }
  ]
})
