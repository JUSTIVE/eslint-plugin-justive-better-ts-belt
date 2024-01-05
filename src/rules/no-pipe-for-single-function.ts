import { ESLintUtils } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { P, match } from 'ts-pattern'

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://https://github.com/JUSTIVE/justive-better-ts-belt#${name}`
)

const ignore = () => {}

type MessageIds = 'noPipeForSingleFunction'
type Options = []

const tSBeltFunctionPattern = {
  type: AST_NODE_TYPES.MemberExpression,
  object: {
    type: AST_NODE_TYPES.Identifier,
    name: P.union('A', 'B', 'F', 'G', 'N', 'O', 'R', 'S')
  }
} as const

const noPipeForSingleFunction = createRule<Options, MessageIds>({
  create(context) {
    return {
      ExpressionStatement: function (node) {
        match(node)
          .with(
            {
              expression: {
                type: AST_NODE_TYPES.CallExpression,
                callee: {
                  type: AST_NODE_TYPES.Identifier,
                  name: 'pipe'
                },
                arguments: [
                  { type: AST_NODE_TYPES.Identifier },
                  P.select('secondArg')
                ]
              }
            },
            ({ secondArg }) => {
              match(secondArg)
                .with(
                  P.union(
                    {
                      type: AST_NODE_TYPES.CallExpression,
                      callee: tSBeltFunctionPattern
                    },
                    tSBeltFunctionPattern
                  ),
                  () => {
                    context.report({
                      node,
                      messageId: 'noPipeForSingleFunction'
                    })
                  }
                )
                .otherwise(ignore)
            }
          )
          .otherwise(ignore)
      }
    }
  },
  name: 'justive-better-ts-belt',
  meta: {
    type: 'suggestion',
    messages: {
      noPipeForSingleFunction:
        "pipe function with single ts-belt's function could be used as data-first function."
    },
    fixable: 'code',
    schema: [],
    docs: {
      description: 'no unexhaustive pattern matching',

      recommended: 'error'
    }
  },
  defaultOptions: []
})

export default noPipeForSingleFunction
