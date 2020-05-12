module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json'
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: [
    '**/test/unit/**/*.spec.(js|jsx)'
  ]
}
