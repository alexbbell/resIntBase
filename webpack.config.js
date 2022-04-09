module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env', '@babel/react']
            },
        },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                  filename: 'css/[name].min.css'
                },
                use: [

                  // Compiles Sass to CSS
                  "sass-loader",

                  
                ],
              },
        ]
    }
}