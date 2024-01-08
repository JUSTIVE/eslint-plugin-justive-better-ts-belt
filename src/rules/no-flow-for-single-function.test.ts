import noFlowForSingleFunction from './no-flow-for-single-function'
import { ESLintUtils } from '@typescript-eslint/utils'

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser'
})

ruleTester.run('justive-better-ts-belt', noFlowForSingleFunction, {
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
      code: `flow(
        O.getWithDefault("b")
      )`,
      errors: [{ messageId: 'noFlowForSingleFunction' }]
    },
    {
      code: `flow(
        O.getExn
      )`,
      errors: [{ messageId: 'noFlowForSingleFunction' }]
    },
    {
      code: `F.tap(flow(
        O.getExn
      ))`,
      errors: [{ messageId: 'noFlowForSingleFunction' }]
    }
  ]
})
