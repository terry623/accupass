module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['jsx-a11y', 'react'],
  env: {
    browser: true,
  },
  rules: {
    indent: 'off',
    camelcase: 'off',
    'react/jsx-indent': 'off',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'operator-assignment': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'consistent-return': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        requiredFirst: false,
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/forbid-prop-types': 'off',
  },
};
