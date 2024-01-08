import { ESLintUtils } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { P, match } from 'ts-pattern'

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://https://github.com/JUSTIVE/justive-better-ts-belt#${name}`
)

const ignore = () => {}

type MessageIds = 'noFlowForSingleFunction'
type Options = []

const noFlowForSingleFunction = createRule<Options, MessageIds>({
  create(context) {
    return {
      CallExpression: function (node) {
        match(node)
          .with(
            {
              callee: {
                type: AST_NODE_TYPES.Identifier,
                name: 'flow'
              },
              arguments: [P._]
            },
            () => {
              context.report({
                node,
                messageId: 'noFlowForSingleFunction'
              })
            }
          )
          .otherwise(ignore)
      }
    }
  },
  name: 'noFlowForSingleFunction',
  meta: {
    type: 'suggestion',
    messages: {
      noFlowForSingleFunction:
        "Flow function with single ts-belt's function is abundant. Use the function directly."
    },
    fixable: 'code',
    schema: [],
    docs: {
      description: "no flow function with single ts-belt's function.",

      recommended: 'error'
    }
  },
  defaultOptions: []
})

export default noFlowForSingleFunction
