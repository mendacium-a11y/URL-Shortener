module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'standard',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'only-multiline'],
        noUselessEscape: 'off',
        indent: ['error', 4],
        noConsole: 'off'
    }
};
