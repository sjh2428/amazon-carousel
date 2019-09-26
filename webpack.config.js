const path = require("path");

module.exports = {
    // entry file
    entry: {
        admin: "./src/js/admin.js",
        main: ["@babel/polyfill", "./src/js/main.js"],
        signup: "./src/js/signup.js"
    },
    // compile + bundling된 js파일이 저장될 경로와 이름 지정
    output: {
        path: path.resolve(__dirname, "public/javascripts"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                // test는 일반적으로 파일 확장명을 일치시키는데 사용
                test: /\.js$/,
                // include는 일반적으로 디렉토리를 일치시키는데 사용
                include: [
                    path.resolve(__dirname, "src/js")
                ],
                // 제외할 파일을 일치시키는데 사용
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.s[ac]ss$/,
                include: [
                    path.resolve(__dirname, "src/sass")
                ],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            }
        ]
    },
    devtool: "inline-source-map",
    // https://webpack.js.org/configuration/mode/
    mode: "development"
};