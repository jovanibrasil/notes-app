const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        RECAPTCHA_KEY: JSON.stringify(process.env.RECAPTCHA_KEY)
      }
    })
  ]
};