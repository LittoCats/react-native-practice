/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:59:05
 *  @Modified  2019-11-06 23:33:47
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
import { View, Animated, StyleSheet } from 'react-native';

interface State {
  message?: string | React.ReactElement;
  location?: 'top' | 'center' | 'bottom';
  duration?: number;
  theme?: 'light' | 'dark';
}

const nullState: State = {
  message: undefined,
  location: undefined,
  duration: undefined,
  theme: undefined,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  top: {
    top: '25%'
  },
  center: {
    top: '50%'
  },
  bottom: {
    bottom: '27%'
  },
  toast: {
    padding: 7,
    borderRadius: 5,
  },
  light: {
    backgroundColor: 'white'
  },
  dark: {
    backgroundColor: 'black'
  },
  text: {
    fontSize: 17,
    overflow: 'hidden'
  },
  lightText: {
    color: 'black'
  },
  darkText: {
    color: 'white'
  }
});

function reduce(state: State, next: Partial<State>) {
  return {...state, ...next};
}

export default function Toast(props: {children: React.ReactElement}) {

  const [state, dispatch] = React.useReducer(reduce, {});
  const [opacity] = React.useState(new Animated.Value(0));

  React.useEffect(()=> {
    const previous = Toast.make;
    let animation: Animated.CompositeAnimation | undefined;
    let timeout: number | undefined;

    Toast.make = async (options: State)=> {
      if (!animation) {
        animation = Animated.timing(opacity, {toValue: 1, duration: 320});
        await new Promise((resolve)=> {
          animation!.start(resolve);
          dispatch(options);    
        });
      } else {
        dispatch(options);  
      }
      if (timeout) clearTimeout(timeout);
      await new Promise((resolve)=> {
        timeout = setTimeout(resolve, options.duration || 2400);
      });
      timeout = undefined;
      await new Promise((resolve)=> {
        animation = Animated.timing(opacity, {toValue: 0, duration: 320});
        animation.start(resolve);
      });
      animation = undefined;
      dispatch(nullState);
    };
    return ()=> {Toast.make = previous;}
  }, []);

  const style = [
    styles.toast,
    {opacity: opacity},
    styles[state.theme || 'dark']
  ];
  return <>
    {props.children}
    {state.message && <View style={[styles.container, styles[state.location || 'center']]} pointerEvents='none'>
      {typeof state.message === 'string' && <Animated.Text
        children={state.message}
        style={[...style, styles.text, state.theme === 'light' ? styles.lightText : styles.darkText]}
      />}
      {typeof state.message === 'object' && <Animated.View 
        children={state.message}
        style={style}
      />}  
    </View>}
  </>;
}

Toast.make = (options: State)=> { console.log('not ready!')}