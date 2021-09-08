const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: {
    app: './index.js',
    'registration': './js/registration.jsx',
    'registration-coordinator': './js/registration_coordinator.jsx',
    'registration-orchestra': './js/registration_orchestra.jsx',
    'registration-institution': './js/registration_institution.jsx',
    'registration-funding': './js/registration_funding.jsx',
    'orchestra-profile': './js/orchestra_profile.jsx',
    'administrator-profile': './js/administrator_profile.jsx',
    'navbar': './js/navbar.jsx',
    'dashboard-coordinator': './js/dashboard_coordinator.jsx',
    'excel_upload': './js/excel_upload.jsx',
    'login_page': './js/login_page.jsx',
    'mantenedores_front': './js/administrator_mantenedores.jsx',
    'home_public': './js/home_public.jsx',
    'administrator-orchestra-list': './js/administrator_orchestra_list.jsx',
    'administrator-user-list': './js/administrator_user_list.jsx',
    'administrator-notifications-list': './js/administrator_notifications_list.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer'),
                ];
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pug/registration/registration.pug',
      filename: 'registration/registration.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_orchestra.pug',
      filename: 'registration/registration_orchestra.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_funding.pug',
      filename: 'registration/registration_funding.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_mantenedor.pug',
      filename: '../templates/foji/dashboard/administrator_mantenedor.html',
      chunks: ['app', 'navbar', 'mantenedores_front'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_success.pug',
      filename: 'registration/registration_success.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/email_validation.pug',
      filename: 'registration/email_validation.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/dashboard_coordinator.pug',
      filename: 'dashboard/dashboard_coordinator.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_coordinator.pug',
      filename: 'registration/registration_coordinator.html',
      chunks: ['app', 'registration-coordinator'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_institution.pug',
      filename: 'registration/registration_institution.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/orchestra_profile.pug',
      filename: 'dashboard/orchestra_profile.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/excel_upload.pug',
      filename: 'registration/excel_upload.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/login.pug',
      filename: 'login/login.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/public/home_public.pug',
      filename: 'public/home_public.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_orchestra_list.pug',
      filename: 'dashboard/administrator_orchestra_list.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_user_list.pug',
      filename: 'dashboard/administrator_user_list.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_notifications.pug',
      filename: 'dashboard/administrator_notifications.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/profile_edit.pug',
      filename: 'dashboard/profile_edit.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
};
