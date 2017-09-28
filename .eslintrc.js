// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': 0,
    'indent': 0,
    'space-before-function-paren': 0,
    'eol-last': 0,
    'no-eval': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'quotes': 0,
    'comma-spacing': 0,
    'no-new': 0,
    'key-spacing': 0,
    'space-before-blocks': 0,
    'space-infix-ops': 0,
    'object-property-newline': 0,
    'no-dupe-keys': 0,
    'no-multiple-empty-lines': 0,
    'no-trailing-spaces': 0,
    'no-return-assign': 0,
    'keyword-spacing': 0,
    'semi-spacing': 0,
    'null': 0,
    'no-unreachable': 0,
    'padded-blocks': 0,
    'space-unary-ops': 0,
    'spaced-comment': 0,
    'no-array-constructor': 0,
    'eqeqeq': 0,
    'no-redeclare': 0,
    'no-new-object': 0,
    'no-tabs': 0,
    'one-var': 0,
    'no-unmodified-loop-condition': 0,
    'block-spacing': 0,
    'no-multi-spaces': 0,
    'use-isnan': 0,
    'no-useless-escape': 0,
    'brace-style': 0
  }
}