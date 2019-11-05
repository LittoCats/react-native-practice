/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-03 13:03:04
 *  @Modified  2019-11-05 09:52:29
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

import React from 'react';
import { View, StyleSheet } from 'react-native'
import Modal from 'aicorn/modal';

export default function Profile() {
  return <Modal.Provider>
    <View style={StyleSheet.absoluteFill}>
      <Modal visible >
        <View style={{width: 128, height: 128}}/>
      </Modal>

    </View>
  </Modal.Provider>
}