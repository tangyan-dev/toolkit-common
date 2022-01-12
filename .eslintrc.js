module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true
        }
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: [],
    rules: {
        semi: [2, 'always'],
        indent: [2, 4],
        quotes: [2, 'single']
    }
};
