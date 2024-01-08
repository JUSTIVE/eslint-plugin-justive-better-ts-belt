import { ESLintUtils } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { P, match } from 'ts-pattern'

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://https://github.com/JUSTIVE/justive-better-ts-belt#${name}`
)

const ignore = () => {}

type MessageIds = 'preferTacitStylePipe' | 'preferTacitStyle'
type Options = []

const tSBeltFunctionPattern = {
  type: AST_NODE_TYPES.MemberExpression,
  object: {
    type: AST_NODE_TYPES.Identifier,
    name: P.union('A', 'B', 'F', 'G', 'N', 'O', 'R', 'S')
  }
} as const

const preferTacitStyle = createRule<Options, MessageIds>({
  create(context) {
    return {
      VariableDeclaration: function (node) {
        match(node)
          .with(
            {
              declarations: [
                {
                  type: AST_NODE_TYPES.VariableDeclarator,
                  init: {
                    type: AST_NODE_TYPES.ArrowFunctionExpression,
                    params: [
                      {
                        type: AST_NODE_TYPES.Identifier,
                        name: P.select('argumentSymbol')
                      }
                    ],
                    body: {
                      type: AST_NODE_TYPES.CallExpression,
                      callee: {
                        type: AST_NODE_TYPES.Identifier,
                        name: 'pipe'
                      },
                      arguments: [
                        {
                          type: AST_NODE_TYPES.Identifier,
                          name: P.select('firstFeedValue')
                        },
                        {
                          type: AST_NODE_TYPES.CallExpression,
                          callee: tSBeltFunctionPattern
                        }
                      ]
                    }
                  }
                }
              ]
            },
            ({ argumentSymbol, firstFeedValue }) => {
              if (firstFeedValue === argumentSymbol)
                context.report({
                  node,
                  messageId: 'preferTacitStylePipe'
                })
            }
          )
          .with(
            {
              declarations: [
                {
                  type: AST_NODE_TYPES.VariableDeclarator,
                  init: {
                    type: AST_NODE_TYPES.ArrowFunctionExpression,
                    params: [
                      {
                        type: AST_NODE_TYPES.Identifier,
                        name: P.select('argumentSymbol')
                      }
                    ],
                    body: {
                      type: AST_NODE_TYPES.CallExpression,
                      callee: tSBeltFunctionPattern,
                      arguments: [
                        {
                          type: AST_NODE_TYPES.Identifier,
                          name: P.select('firstFeedValue')
                        },
                        P.union(
                          {
                            type: AST_NODE_TYPES.Identifier
                          },
                          {
                            type: AST_NODE_TYPES.Literal
                          }
                        )
                      ]
                    }
                  }
                }
              ]
            },
            ({ argumentSymbol, firstFeedValue }) => {
              if (firstFeedValue === argumentSymbol)
                context.report({
                  node,
                  messageId: 'preferTacitStyle'
                })
            }
          )
          .otherwise(ignore)
      }
    }
  },
  name: 'preferTacitStyle',
  meta: {
    type: 'suggestion',
    messages: {
      preferTacitStyle:
        'This lambda is safe to be removed. Use the function directly instead.',
      preferTacitStylePipe:
        'This lambda and pipe function is safe to be removed. Use the function directly instead.'
    },
    fixable: 'code',
    schema: [],
    docs: {
      description: 'prefer tacit style programming.',

      recommended: 'error'
    }
  },
  defaultOptions: []
})

export default preferTacitStyle
