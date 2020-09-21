const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;

const PATHS = {
    entry: {
        main: './src/index.js',
        scripts: './src/pages/**/*.js',
        pages: './src/pages/**/*.pug'
    },
    output: {
        css: 'css/',
        js: 'js/',
        fonts: 'fonts/',
        images: 'images/',
        dist: path.resolve(__dirname, './dist')
    }
};

/**
 * Filter and define files
 * @param {string} entry - Entry files
 * @return [{ [key: string]: string} ] An array with list entries [ {index: 'src/index.js'} ]
 */
const getFiles = (entry) => {
    const ext = entry.split('.').pop(); // get file extension
    const re = new RegExp(`/_.*\.${ ext }`); // get files with _ (e.g. - _file-with-underscore.js)

    return glob.sync(entry).filter(file => !re.test(file)).map(file => {
        const fileName = path.basename(file, path.extname(file));

        return {[fileName]: file};
    });
};

const generatePages = (mode) => {
    return getFiles(PATHS.entry.pages).map((page, _, tmpl) => {
        const pageName = Object.keys(page)[0];

        return new HtmlWebpackPlugin({
            filename: `${ pageName }.html`,
            chunks: ['main', pageName],
            template: Object.values(page)[0],
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true,
                removeComments: mode !== 'development'
            },
            isDevelopment: mode === 'development'
        });
    });
};

const getScripts = () => {
    return getFiles(PATHS.entry.scripts)
        .reduce((acc, cur) => {
            return {...acc, ...cur};
        }, {});
};

module.exports = (env, argv) => {
    const defaultConfig = {
        mode: argv.mode,
        entry: {
            main: PATHS.entry.main,
            ...getScripts()
        },
        output: {
            filename: `${ PATHS.output.js }[name].min.js`,
            path: PATHS.output.dist
        },
        devtool: (argv.mode !== 'production' ? 'source-map' : false),
        resolve: {
            modules: [ 'node_modules' ],
            extensions: ['.js']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }, {
                    test: /\.pug$/,
                    loader: 'pug-loader'
                }, {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: argv.mode !== 'production'
                                    ? 'style-loader'
                                    : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {sourceMap: argv.mode !== 'production'}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('postcss-import')(),
                                    require('cssnano'),
                                    require('autoprefixer')()
                                ],
                                sourceMap: argv.mode !== 'production'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: argv.mode !== 'production'}
                        }
                    ]
                }, {
                    test: /\.(png|jpg?g|gif|svg)$/i,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: `${ PATHS.output.images }[name].[ext]`,
                            // publicPath: 'images/',
                            // outputPath: 'images/',
                            limit: 8192
                        }
                    }
                }, {
                    test: /\.(ttf|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: `${ PATHS.output.fonts }[name].[ext]`
                        }
                    }
                }
            ]
        },
        stats: {
            all: false,
            builtAt: true,
            timings: true,
            version: true,
            modules: false,
            assets: false,
            errors: true,
            warnings: true,
            moduleTrace: true,
            errorDetails: true
        }
    };

    const defaultPlugins = [
        ...generatePages(argv.mode),
        new webpack.DefinePlugin({
            PROJECT_NAME: JSON.stringify(require('./package.json').config.projectName),
            PROJECT_LOCALE: JSON.stringify(require('./package.json').config.locale),
        }),
        new MiniCssExtractPlugin({
            filename: `${ PATHS.output.css }[name].css`,
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: './src/static', to: PATHS.output.dist}
            ]
        }),
    ];

    const devConfig = {
        devServer: {
            hot: true,
            port: 3000,
            host: '0.0.0.0'
        },
        devtool: 'cheap-module-eval-source-map',
        plugins: [
            ...defaultPlugins,
            new webpack.HotModuleReplacementPlugin()
        ]
    };

    const prodConfig = {
        plugins: [
            new CleanWebpackPlugin(),
            ...defaultPlugins,
            new webpack.ContextReplacementPlugin(
                /moment[/\\]locale$/,
                /ru/
            ),
            new SitemapPlugin(require('./package.json').homepage,
                getFiles(PATHS.entry.pages).map(page => Object.keys(page)[0]), {
                    filename: './sitemap.xml',
                    skipgzip: true,
                    lastmod: true,
                    changefreq: 'monthly',
                    priority: '0.8'
                }
            )
        ]
    };

    return argv.mode !== 'production'
           ? {...defaultConfig, ...devConfig}
           : {...defaultConfig, ...prodConfig};
};
