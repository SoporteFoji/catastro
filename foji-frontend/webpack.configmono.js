const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: {
    app: './index.js',
    'registration-coordinator': './js/registration_coordinator.jsx',
    'dashboard-coordinator': './js/dashboard_coordinator.jsx',
    'registration-orchestra': './js/registration_orchestra.jsx',
    'registration-institution': './js/registration_institution.jsx',
    'registration-funding': './js/registration_funding.jsx',
    'orchestra-profile': './js/orchestra_profile.jsx',
    'orchestra-add': './js/orchestra_add.jsx',
    'coordinador-add': './js/coordinador_add.jsx',
    'administrador-add': './js/administrador_add.jsx',
    'administrator-profile': './js/administrator_profile.jsx',
    'area-profile': './js/area_profile.jsx',
    'region-profile': './js/region_profile.jsx',
    'provincia-profile': './js/provincia_profile.jsx',
    navbar: './js/navbar.jsx',
    'excel-upload': './js/excel_upload.jsx',
    'home-public': './js/home_public.jsx',
    mantenedores_front: './js/administrator_mantenedores.jsx',
    'administrator-orchestra-list': './js/administrator_orchestra_list.jsx',
    'administrator-user-list': './js/administrator_user_list.jsx',
    'administrator-notifications-list': './js/administrator_notifications_list.jsx',
    'coordinator-profile': './js/coordinator_profile.jsx',
    'coordinator-del': './js/coordinator_del.jsx',
    'administrador-del': './js/administrador_del.jsx',
    'orchestra-del': './js/orchestra_del.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../foji_project/foji/static/foji/'),
    publicPath: '/static/foji/',
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
              plugins() {
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
      template: './pug/dashboard/administrator_orchestra_list.pug',
      filename: '../../templates/foji/dashboard/administrator_orchestra_list.html',
      chunks: ['app', 'navbar', 'administrator-orchestra-list'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_mantenedor.pug',
      filename: '../../templates/foji/dashboard/administrator_mantenedor.html',
      chunks: ['app', 'navbar', 'mantenedores_front'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_user_list.pug',
      filename: '../../templates/foji/dashboard/administrator_user_list.html',
      chunks: ['app', 'navbar', 'administrator-user-list'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/profile_edit.pug',
      filename: '../../templates/foji/dashboard/profile_edit.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/public/home_public.pug',
      filename: '../../templates/foji/public/home_public.html',
      chunks: ['app', 'navbar', 'home-public'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/excel_upload.pug',
      filename: '../../templates/foji/registration/excel_upload.html',
      chunks: ['app', 'navbar', 'excel-upload'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration.pug',
      filename: '../../templates/foji/registration/registration.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_orchestra.pug',
      filename: '../../templates/foji/registration/registration_orchestra.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_funding.pug',
      filename: '../../templates/foji/registration/registration_funding.html',
      chunks: ['app', 'registration-funding', 'navbar'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_success.pug',
      filename: '../../templates/foji/registration/registration_success.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/email_validation.pug',
      filename: '../../templates/foji/registration/email_validation.html',
      chunks: ['app', 'navbar'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/dashboard_coordinator.pug',
      filename: '../../templates/foji/dashboard/dashboard_coordinator.html',
      chunks: ['app', 'dashboard-coordinator', 'navbar'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_coordinator.pug',
      filename: '../../templates/foji/registration/registration_coordinator.html',
      chunks: ['app', 'registration-coordinator', 'navbar'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/registration/registration_institution.pug',
      filename: '../../templates/foji/registration/registration_institution.html',
      chunks: ['app', 'registration-institution', 'navbar'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/orchestra_profile.pug',
      filename: '../../templates/foji/dashboard/orchestra_profile.html',
      chunks: ['app', 'navbar', 'orchestra-profile'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/orchestra_add.pug',
      filename: '../../templates/foji/dashboard/orchestra_add.html',
      chunks: ['app', 'navbar', 'orchestra-add'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/coordinador_add.pug',
      filename: '../../templates/foji/dashboard/coordinador_add.html',
      chunks: ['app', 'navbar', 'coordinador-add'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrador_add.pug',
      filename: '../../templates/foji/dashboard/administrador_add.html',
      chunks: ['app', 'navbar', 'administrador-add'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_profile.pug',
      filename: '../../templates/foji/dashboard/administrator_profile.html',
      chunks: ['app', 'navbar', 'administrator-profile'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/area_profile.pug',
      filename: '../../templates/foji/dashboard/area_profile.html',
      chunks: ['app', 'navbar', 'area-profile'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/region_profile.pug',
      filename: '../../templates/foji/dashboard/region_profile.html',
      chunks: ['app', 'navbar', 'region-profile'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/provincia_profile.pug',
      filename: '../../templates/foji/dashboard/provincia_profile.html',
      chunks: ['app', 'navbar', 'provincia-profile'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/coordinator_profile.pug',
      filename: '../../templates/foji/dashboard/coordinator_profile.html',
      chunks: ['app', 'navbar', 'coordinator-profile'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/coordinator_del.pug',
      filename: '../../templates/foji/dashboard/coordinator_del.html',
      chunks: ['app', 'navbar', 'coordinator-del'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrador_del.pug',
      filename: '../../templates/foji/dashboard/administrador_del.html',
      chunks: ['app', 'navbar', 'administrador-del'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/orchestra_del.pug',
      filename: '../../templates/foji/dashboard/orchestra_del.html',
      chunks: ['app', 'navbar', 'orchestra-del'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/login.pug',
      filename: '../../templates/foji/login.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/email/coordinator-activation.pug',
      filename: '../../templates/foji/email/coordinator-activation.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_orchestra_list.pug',
      filename: '../../templates/foji/dashboard/administrator_orchestra_list.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/profile_edit.pug',
      filename: '../../templates/foji/dashboard/profile_edit.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/administrator_notifications.pug',
      filename: '../../templates/foji/dashboard/administrator_notifications.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/change_password.pug',
      filename: '../../templates/foji/dashboard/change_password.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/dashboard/password_recovery.pug',
      filename: '../../templates/foji/dashboard/password_recovery.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/404.pug',
      filename: '../../templates/404.html',
    }),
    new HtmlWebpackPlugin({
      template: './pug/500.pug',
      filename: '../../templates/500.html',
    }),
    /* Just to parse logo */
    new HtmlWebpackPlugin({
      template: './pug/navbar.pug',
      filename: '../../templates/foji/navbar.html',
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    writeToDisk: true,
  },
};
