# babel-gettext
babel-gettext
# 用法
const babel = require('@babel/core')
babel.transformFile(file.path, {
    compact: false,
    plugins: [
      [require('@yzj/babel-gettext'),{
          functionNames: ['__'],
          fileName: ''
        }
      ]
    ]
  }, function (err, result) {
    if (err){
      console.log(err)
    }
  })
