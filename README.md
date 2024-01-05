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
        "justive-better-ts-belt/strictPatternMatching": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


