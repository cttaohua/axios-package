module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not dead']
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ]
  ]
}
