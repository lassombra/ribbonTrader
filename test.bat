node_modules\.bin\nyc --report-dir=$CIRCLE_ARTIFACTS/reports node_modules\.bin\mocha-webpack --reporter mocha-circleci-reporter --webpack-config webpack.config.test.js "src/**/*.spec.js"