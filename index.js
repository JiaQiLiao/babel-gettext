var fs = require('fs');
var path = require('path');

module.exports = function() {
  var currentFileName;
  var currentFilePath;
  var data;

  return { visitor: {

    CallExpression(nodePath, plugin) {
      var functionNames = plugin.opts && plugin.opts.functionNames;
      var fileName = plugin.opts && plugin.opts.fileName;
      var filePath =  plugin.opts && plugin.opts.filepath;

      if (typeof fileName === 'function') {
        fileName = fileName(this.file);
      }

      if (!fileName) {
        return;
      }

      if (fileName !== currentFileName) {
        currentFileName = fileName;
        currentFilePath = filePath;
        data = {}
      }

      const callee = nodePath.node.callee;

      if (typeof functionNames === 'string') {
        functionNames = [functionNames]
      }

      if (functionNames.includes(callee.name) ||
          callee.property &&
          functionNames.includes(callee.property.name)) {

        var args = nodePath.get('arguments');
        var arg = args[0].evaluate();
        var value = arg.value;

        if (typeof value === 'string') {
          data[value] = value
        } else {
          data[value[0]] = value[1]
        }

        if (Object.keys(data).length == 0) return
        let tmp = JSON.stringify(data, null, 4) 

        fs.writeFileSync(fileName, tmp)
      }
    },
  } };
};
