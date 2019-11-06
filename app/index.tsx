/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:43:45
 *  @Modified  2019-11-06 23:25:37
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
import { StyleSheet, View, Text } from 'react-native'
import Spinner from 'aicorn/spinner';
import Toast from 'aicorn/toast';

export default ()=> {
  return <Toast ><View style={styles.screen}>
    <Spinner style={StyleSheet.absoluteFill}/>
    <Text children="Show Toast" style={styles.toast} onPress={()=>Toast.make({message: Math.random().toString(32).slice(2), location: 'top'})}/>
  </View></Toast>;
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  toast: {
    color: '#1D62CC'
  }
});