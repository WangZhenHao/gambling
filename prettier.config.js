module.exports = {
    // 超过最大值换行
    printWidth: 100,
    // 一个制表符为四个空格
    tabWidth: 4,
    // 是否使用制表符进行缩减
    useTabs: false,
    // 使用单引号代替双引号
    singleQuote: false,
    //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    arrowParens: 'avoid',
    // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    bracketSpacing: true,
    // 结尾是 \n \r \n\r auto
    endOfLine: 'auto',
    // 换行方式
    proseWrap: 'preserve',
    // 句尾添加分号
    semi: true,
    // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    trailingComma: "all",
    // 使用ts
    tslintIntegration: false,
    overrides: [
        // 对不同类型的文件进行覆写
        {
            files: [
                '*.json',
                '.eslintrc',
                '.tslintrc',
                '.prettierrc',
                '.tern-project',
            ],
            options: { parser: 'json', tabWidth: 4 },
        },
        {
            files: '*.{css,sass,scss,less}',
            options: { parser: 'css', tabWidth: 4 },
        },
        { files: '*.ts', options: { parser: 'typescript' } },
        { files: '*.vue', options: { parser: 'vue' } },
        { files: '*.md', options: { parser: 'markdown' } },
    ],
};
