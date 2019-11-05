/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-03 14:25:15
 *  @Modified  2019-11-03 20:13:48
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

import React, { PropsWithChildren } from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';


type TabbarProps = PropsWithChildren<ViewProps & {
  vertical?: boolean;
  overroll?: number;
  selectedIndex?: number;
  onChange?: (tab: number, prev: number)=> void;
}>;

export default function Tabbar(props: TabbarProps) {

  const {vertical, selectedIndex, onChange, style, ...rest} = props;

  return <View {...rest} 
    style={[styles.tabbar, style, vertical && styles.vertical]}
  >{React.Children.map(props.children, (child, index)=>
    <TouchableWithoutFeedback key={index} 
      onPressOut={()=> props.onChange && props.onChange(index, props.selectedIndex || 0)}
    >
      <View style={[styles.tabitem]}>
        {child}
      </View>
    </TouchableWithoutFeedback>
  )}</View>;
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 68,
    alignSelf: 'stretch',
  },
  tabitem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  vertical: {
    flexDirection: 'column'
  },
  selected: {
    backgroundColor: 'black'
  },
  normal: {
    backgroundColor: 'white'
  }
});
