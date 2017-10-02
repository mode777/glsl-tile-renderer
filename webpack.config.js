module.exports = {
    devtool: 'source-map',
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.glsl$/,
                use: 'raw-loader'
            },
            {
                test: /\.png$/,
                use: 'binary-loader'
            },
            {
                test: /\.css$/,
                use: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }

        ]
        },
        resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: './dist/bundle.js',
        path: __dirname
    }
};