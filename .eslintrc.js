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
        // 强制使用有效的 JSDoc 注释
    "valid-jsdoc": 1,
    "space-before-function-paren": 0,
    "no-inner-declarations":0,
    "no-extend-native":0,// 可以使用扩展方法
    "no-tabs": 0,
    "indent": 0,
    "no-return-assign": 0,
    "no-useless-escape": 0,
    "no-undef": 0,
    "no-eval": 0,
    "no-new": 0,
    "operator-linebreak": 0,
    "no-unused-vars": 0
  }
}