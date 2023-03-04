module.exports = {
	"env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
	"globals": {
        "wx": true,
        "process": true,
        "tools": true,
        "userInfo": true,
        "AlipayJSBridge": true,
        "WeixinJSBridge": true
	},
	"extends": "eslint:recommended",
    "parser": "vue-eslint-parser",
    'parserOptions': {
        'parser': 'babel-eslint',
        'sourceType': 'module',
        'ecmaVersion': 2019
    },
    "rules": {
        "no-console": "off",
        "no-debugger": 0,       //可以使用debugger
        "no-extra-parens": 2,   //禁止非必要的括号
        "no-extra-semi": 2,     //禁止多余的冒号
        "no-empty": 2,          // 禁止空语句块
        "no-use-before-define": 0,      // 不允许在变量定义之前使用它们
        "max-nested-callbacks": [1, 5],     // 强制回调函数最大嵌套深度 5层
        "no-irregular-whitespace": 2,       // // 禁止在字符串和注释之外不规则的空白
        "space-before-function-paren": [0, "always"],       // 强制在 function的左括号之前使用一致的空格
        "space-infix-ops": 2,                   // 要求操作符周围有空格
        // 强制在一元操作符前后使用一致的空格
        "space-unary-ops": [2, {
            "words": true,
            "nonwords": false
        }],
        "no-unused-vars": "off" // 关闭校验没有使用的变量
    }
};
