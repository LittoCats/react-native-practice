/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:49:11
 *  @Modified  2019-11-03 13:08:35
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

const resolver = require('./metro/resolver');

module.exports = {
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg'],
    sourceExts: ['js', 'ts', 'tsx', 'json', 'yaml', 'yml'],
    resolveRequest: resolver
  },
  transformer: {
    babelTransformerPath: require.resolve('./metro/babel-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
