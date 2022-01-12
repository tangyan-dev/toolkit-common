module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', ['minify', {
    builtIns: false,
    evaluate: false,
    mangle: true,
  }]],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-modules-commonjs'],
};
