
const path = require('path')
const CURRENT_WORKING_DIRECTORY = process.cwd()
const webpack = require('webpack')
module.exports={
    name:'browser',
    devtool:'cheap-module-source-map',
    mode:'development',
    entry: [
        'webpack-hot-middleware/client?reload=true',path.resolve(CURRENT_WORKING_DIRECTORY,'client/index.js')
    ],
    output:{
        path:path.resolve(CURRENT_WORKING_DIRECTORY,'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                use:['babel-loader']
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
}