const path = require('path');

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    // @vue/eslint-config-typescript の内部で指定されているので不要
    // parser: '@typescript-eslint/parser',
    // eslint-plugin-vueなどが同じものを定義するので不要
    // sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    '@vue/typescript',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier',
  ],
  // あらかじめ用意されているグローバル変数を定義する
  // https://github.com/eslint/eslintrc/blob/main/conf/environments.js
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // vuexのstateは引数変更を許可変更しないと書きづらい
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],

    // import文で省略を許可する拡張子
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // defaultのexportを禁止するルール
    'import/no-default-export': 'error',
    // defaultのexportを優先するルール
    'import/prefer-default-export': 'off',

    // typescriptに対応したno-unused-varsにする
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.mds
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },

  // 特定ファイルのルールを上書きする
  overrides: [
    // vueのcomponentはdefault exportでないとエラーが発生するため
    {
      files: ['src/**/*.vue'],
      rules: {
        // 登録されたコンポーネントはPascalCaseを強制する
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          {
            registeredComponentsOnly: true,
          },
        ],

        // 属性値にはハイフン付きの名前を強制する
        'vue/attribute-hyphenation': ['error', 'always'],

        // defaultのexportを禁止するルール
        'import/no-default-export': 'off',

        // defaultのexportを優先するルール
        'import/prefer-default-export': 'error',
      },
    },

    {
      files: ['./*.js'],
      rules: {
        // devDependenciesのimportを許可する
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
          },
        ],
      },
    },
  ],

  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', 'vue'],
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js'),
      },
    },
  },
};
