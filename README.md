# eslint-plugin-justive-better-ts-belt

prevent using non-exhaustive pattern matching in typescript

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-justive-better-ts-belt`:

```sh
npm eslint-plugin-justive-better-ts-belt --save-dev
```

## Usage

Add `justive-better-ts-belt` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "justive-better-ts-belt"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "justive-better-ts-belt/noPipeForSingleFunction": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                             | Description                      | 🔧 |
| :--------------------------------------------------------------- | :------------------------------- | :- |
| [noPipeForSingleFunction](docs/rules/noPipeForSingleFunction.md) | no unexhaustive pattern matching | 🔧 |
| [preferTacitStyle](docs/rules/preferTacitStyle.md)               | no unexhaustive pattern matching | 🔧 |

<!-- end auto-generated rules list -->


