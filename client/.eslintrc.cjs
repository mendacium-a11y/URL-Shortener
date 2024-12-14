module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:react/recommended', 
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  settings: {
    react: {
      version: 'detect', 
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true }, 
    ecmaVersion: 12, 
    sourceType: 'module',
  },
  plugins: ['react-refresh', '@typescript-eslint', 'jsx-a11y'],
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'public/', '.eslintrc.cjs'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react-refresh/only-export-components": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-useless-escape": "off",
    '@typescript-eslint/no-explicit-any': 'off' ,
    'react/prop-types': ['off'],  
    'indent': ['error', 4],      
    'react/jsx-filename-extension':  'off' ,
    'react/react-in-jsx-scope': 'off', 
    '@typescript-eslint/no-unused-vars': ['warn'], 
    'jsx-a11y/anchor-is-valid': ['warn'],
  },
};
