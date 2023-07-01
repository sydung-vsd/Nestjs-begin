module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  "prettier/prettier": [
    "error",
    {
      "singleQuote": true,
      "parser": "flow"
    }
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // kiểm tra khoảng trắng trước  và sau dấu ngoặc vuông khi khai báo mảng
    // 'array-bracket-spacing': ['error', 'always'],
    // yêu cầu xuống dòng cho mỗi phần tử trong một mảng nếu mảng có nhiều hơn một phần tử
    // 'array-bracket-newline': ['error', 'always'],
    'block-spacing': ['error', 'always'],
    // yêu cầu khoảng trắng trước và sau dấu mũi tên của arrow function
    'arrow-spacing': ['error', {'before': true, 'after': true}],
    'semi': ['error', 'always'],
    "no-multiple-empty-lines": [ "error", { "max": 1 } ],
  },
  
};
