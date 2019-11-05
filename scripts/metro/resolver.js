/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:49:16
 *  @Modified  2019-11-03 13:08:25
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

const path = require('path');
const Resolver = require('metro-resolver');

/**
 * 如果 默认的 resolver 找不到模块,
 * 且是 aicorn/modal 形式的路径,
 * 前面拼接上项目跟路径，进行查找
 */
function resolve(context, moduleName, platform) {
  try {
    return Resolver.resolve(
      Object.assign({}, context, {resolveRequest: undefined}),
      moduleName,
      platform
    );
  } catch (error) {
    if (!(error instanceof Resolver.FailedToResolveNameError)) throw error;
    if (/^\/|^\./.test(moduleName)) throw error;
    const realName = path.resolve(context.projectRoot, moduleName);
    return Resolver.resolve(
      Object.assign({}, context, {resolveRequest: undefined}),
      realName,
      platform
    );
  }
}

module.exports = resolve;