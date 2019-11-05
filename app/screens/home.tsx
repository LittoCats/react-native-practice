/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 17:50:25
 *  @Modified  2019-11-04 00:59:16
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
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Spinner from 'aicorn/spinner';
import Tabbar from 'aicorn/tabbar';
import Popover, { Provider } from 'aicorn/popover';
import { Context as ToastContext } from 'aicorn/toast';


export default function HomeScreen() {

  const [index, setIndex] = React.useState(0);
  const toast = React.useContext(ToastContext);
  
  React.useEffect(()=> {
    setTimeout(()=> toast.make('Hello world !', {location: 'bottom'}), 1000);
  }, []);

  return <Provider container={SafeAreaView} style={[StyleSheet.absoluteFill, styles.screen]}>
    <Spinner size={100} color='red' style={{backgroundColor: 'gray'}}/>
    <Tabbar style={styles.tabbar} selectedIndex={index} onChange={(index)=> setIndex(index)}>
      <View style={[styles.tabitem, index === 0 && styles.selected]}/>
      <View style={[styles.tabitem, index === 1 && styles.selected]}/>
      <View style={[styles.tabitem, index === 2 && styles.selected]}/>
      <View style={[styles.tabitem, index === 3 && styles.selected]}/>
    </Tabbar>
  </Provider>
}

const styles = StyleSheet.create({
  screen: {
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabbar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    paddingTop: 1
  },
  tabitem: {
    width: 32,
    height: 32,
    backgroundColor: 'gray'
  },
  selected: {
    backgroundColor: 'green'
  }
});
