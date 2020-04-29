const path = require('path');

const webpack = require('webpack');

module.exports = (env, argv) => {
    return {
        entry: './src/main.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.DefinePlugin({
                __BUILD_VERSION: JSON.stringify(
                    `${argv.mode === 'production' ? 'prod' : 'devel'}-${
                        process.env.DECODE_BUILD_VERSION || 'unversioned'
                    }`
                )
            })
        ],
        target: 'node'
    };
};
