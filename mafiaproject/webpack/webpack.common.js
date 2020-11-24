const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: Path.join(__dirname, '../src', 'index.tsx'),
    output: {
        path: Path.join(__dirname, '../build'),
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [new CleanWebpackPlugin()],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '~': Path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
        ],
    },
};
