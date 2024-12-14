module.exports = {
  env: {
      node: true,
      es2021: true,
  },
  extends: [
      "standard",
  ],
  parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
  },
  rules: {
      "no-useless-escape": "off",
      "indent": ["error", 4],
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "consistent-return": "off",
  },
};
