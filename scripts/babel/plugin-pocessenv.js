/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 12:01:42
 *  @Modified  2019-11-03 13:08:15
 *
 *  Copyright (C) 2019 AICORN.CN <developer@aicorn.cn>
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this document, and changing it is allowed as long as the
 *  name is changed.
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */

const _path = require('path');

try {
  require('dotenv/config');  
} catch (e) {
  console.warn('Load dotenv config fail, you may neen to check something.');
}

module.exports = function processenv(api) {
  const t = api.types;
  const cwd = _path.resolve(__dirname, 'app');
  
  function MemberExpression(path, stat) {
    const { cwd, root, filename } = stat.file.opts;
    if (!filename.startsWith(root)) return;
      // 所有 node_modules 中的模块，认为已经处理过了，不再处理
    if (filename.indexOf('node_modules') >= 0) return;

    const node = path.node;
    if (!t.isIdentifier(node.property)) return;

    let object = node.object;
    if (!t.isMemberExpression(object)) return;

    let property = object.property;
    if (!t.isIdentifier(property) || property.name !== 'env') return;
    
    object = object.object;
    if (!t.isIdentifier(object) || object.name !== 'process') return;

    const envName = node.property.name;
    const env = process.env[envName];

    // 如果 env 是 undefined, 抛出错误
    if (env === undefined) {
      throw path.buildCodeFrameError('Environment variable ' + envName + 
        ' not found. Please make sure your configuration is correct.');
    }
    path.replaceWith(t.stringLiteral(env));
  }

  return {
    visitor: {
      MemberExpression
    }
  }
}
