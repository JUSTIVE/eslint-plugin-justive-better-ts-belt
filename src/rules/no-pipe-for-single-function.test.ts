import noPipeForSingleFunction from './no-pipe-for-single-function'
import { ESLintUtils } from '@typescript-eslint/utils'

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser'
})

ruleTester.run('justive-better-ts-belt', noPipeForSingleFunction, {
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
    },
    {
      code: `export const phoneFormatter: FormFieldFormatter = (phoneNumer) => {
  const validInput = (phoneNumer || '').replace(/[^0-9|-]/g, '');
  const cleanInput = validInput.replace(/[-]/g, '');

  return pipe(
    match([cleanInput, cleanInput.length])
      .with([P._, 8], () => cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2'))
      .with([P.string.startsWith('02'), P.union(9, 10)], () =>
        cleanInput.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3'),
      )
      .with([P.not(P.string.startsWith('02')), P.union(10, 11)], () =>
        cleanInput.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3'),
      )
      .otherwise(() => validInput),
    S.slice(0, 13),
  );
};`
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
      code: `F.tap(pipe(
        a,
        O.getWithDefault("b")
      ))`,
      errors: [{ messageId: 'noPipeForSingleFunction' }]
    },
    {
      code: `pipe(
        a,
        O.getExn
      )`,
      errors: [{ messageId: 'noPipeForSingleFunction' }]
    },
    {
      code: `F.tap(pipe(
        a,
        O.getExn
      ))`,
      errors: [{ messageId: 'noPipeForSingleFunction' }]
    },
    {
      code: `F.tap(pipe(
        a.b,
        O.getExn
      ))`,
      errors: [{ messageId: 'noPipeForSingleFunction' }]
    }
  ]
})
