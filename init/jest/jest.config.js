const aliasData = require('../../_config/alias.json');

const addAliases = () => Object.keys(aliasData)
  .reduce((acc, key) => {
    acc[`^${key}(.*)$`] = `<rootDir>${aliasData[key]}/$1`;
    return acc;
  }, {});

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.js',
    '!app/**/*.spec.js',
    '!app/**/*.bk.js',
    '!app/app.js',
    '!app/index.js',
    '!app/pages/**/index.js',
    '!app/components/**/index.js',
    '!app/reducers/index.js',
    '!app/store/*.js',
  ],
  coverageThreshold: {
    global: {
      statements: 25, // 98,
      branches: 25, // 91,
      functions: 25, // 98,
      lines: 25 // 98
    }
  },
  coverageReporters: ['json', 'html', 'lcov', 'text-summary'],
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$':
      '<rootDir>/init/jest/jest-mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/init/jest/jest-mocks/image.js',
    ...addAliases()
  },
  setupTestFrameworkScriptFile: '<rootDir>/init/jest/test-setup.js',
  testPathIgnorePatterns: ['/_onboarding/'],
  testRegex: 'tests/.*\\.spec\\.js$',
  verbose: false,
};

/*
"jest": {
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
    "\\.(css)$": "<rootDir>/tools/assetsTransformer.js"
  },
  "setupFiles": [
    "raf/polyfill",
    "./tools/enzymeTestAdapterSetup.js"
  ]
},
 */
