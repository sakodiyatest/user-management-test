module.exports = {
    // ...
    module: {
      rules: [
        // ...other rules
        {
          test: /\.scss$/,
          use: [
            'style-loader', // Adds CSS to the DOM
            'css-loader', // Translates CSS into CommonJS
            'sass-loader' // Compiles Sass to CSS
          ]
        }
      ]
    },
    // ...
  };
  