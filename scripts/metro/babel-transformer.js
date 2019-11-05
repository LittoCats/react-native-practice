/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:49:19
 *  @Modified  2019-11-03 13:08:21
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

const fs = require('fs');
const crypto = require('crypto');
const yaml = require('js-yaml');
const babel = require('metro-react-native-babel-transformer');


function getCacheKey() {
  const keyParts = [fs.readFileSync(__filename), babel.getCacheKey()];
  const key = crypto.createHash("md5");
  keyParts.forEach(part => key.update(part));
  return key.digest("hex");
}

function transform({filename, options, src, plugins}) {
  if (/.+\.ya?ml$/i.test(filename)) {
    src = "module.exports = " + JSON.stringify(yaml.safeLoad(src));
  }
  return babel.transform({filename, options, src, plugins});
}

exports.transform = transform;
exports.getCacheKey = getCacheKey;