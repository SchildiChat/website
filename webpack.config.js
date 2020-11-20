module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', /*{
								targets: {
									browsers: ["last 2 versions", "ie >= 11"]
								}
							}*/]
						],
						/*plugins: ['@babel/plugin-transform-classes']*/
					}
				}
			}
		]
	}
};