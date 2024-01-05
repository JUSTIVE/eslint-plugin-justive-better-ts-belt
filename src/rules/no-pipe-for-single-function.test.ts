import strictPatternMatching from './no-pipe-for-single-function'
import { ESLintUtils } from '@typescript-eslint/utils'

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser'
})

ruleTester.run('justive-better-ts-belt', strictPatternMatching, {
  valid: [
    {
      code: `pipe(
        a,
        b
      )`
    },
    {
      code: `pipe(
        a,
        b()
      )`
    },
    {
      code: `pipe(
        a,
        b,
        c
      )`
    },
    {
      code: `pipe(
        a,
        O.map(b),
        O.getWithDefault("b")
      )`
    }
  ],
  invalid: [
    {
      code: `pipe(
        a,
        O.getWithDefault("b")
      )`,
      errors: [{ messageId: 'noPipeForSingleFunction' }]
    },
    {
      code: `pipe(
        a,
        O.getExn
      )`,
      errors: [{ messageId: 'noPipeForSingleFunction' }]
    }
  ]
})
