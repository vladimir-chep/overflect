const path = require('path');

module.exports = {
    // chainWebpack: config => {
    //     config.plugin('html').tap(args => {
    //         args[0].title = 'MyApp title';
    //         args[0].meta = {
    //             // viewport: 'width=device-width,initial-scale=1,user-scalable=no'
    //         };

    //         return args;
    //     });
    // },
    publicPath: '/overflect/',
    // publicPath: process.env.NODE_ENV === 'production' ?
        // '/my-page/' : '/',
    // lintOnSave: process.env.NODE_ENV !== 'production',
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'scss',
    //         patterns: [path.resolve(__dirname, './src/styles/global.scss')],
    //     },
    // },
};