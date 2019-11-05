/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:59:05
 *  @Modified  2019-11-04 23:12:54
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
import { Animated, StyleSheet } from 'react-native';

interface Options {
  message?: string | React.ComponentType<any>;
  location?: 'top' | 'middle' | 'bottom';
  duration?: number;
}

interface State {
  opacity: Animated.Value,
  toasts: Options[],
  animation?: Animated.CompositeAnimation,
  toast?: Options
}

interface Action {
  type: 'DISPLAY' | 'DISMISS',
  payload?: Options | string
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 9,
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white'
  },
  top: {
    top: '20%'
  },
  middle: {
    top: '50%'
  },
  bottom: {
    bottom: '20%'
  }
});

const DISPLAY_INTERVAL = 3500;
const FADE_DURATION = 240;

function reduce(state: State, action: Action) {
  if (action.type === 'DISMISS') {
    return {...state, toast: undefined, toasts: []}
  } 
  if (action.type === 'DISPLAY') {
    const options = action.payload as Options;
    return {...state, toast: options};
  }
  return state;
}

function Toast(props: Options & {opacity: Animated.Value}) {

  if (typeof props.message === 'string') {
    return <Animated.Text
      style={[
        styles.toast, styles.text, {opacity: props.opacity},
        styles[props.location || 'bottom']
      ]}
    >{props.message}</Animated.Text>
  }

  if (!props.message) return null;
  const Message = props.message;

  return <Animated.View 
    style={[
      styles.toast, {opacity: props.opacity},
      styles[props.location || 'bottom']
    ]}
  ><Message /></Animated.View>;
}

export const Context = React.createContext({
  make(message: string, options?: Options){},
  dismiss(id?: string) {}
});


export function Provider(props: React.PropsWithChildren<{}>) {

  const [state, dispatch] = React.useReducer(reduce, {
    opacity: new Animated.Value(0),
    toasts: []
  });

  React.useEffect(()=> {
    return ()=> state.animation && state.animation.stop();
  }, [])

  function display(message: string | React.ComponentType<any>, options?: Options) {
    const toast: Options = {...options, message};
    if (state.toast) {
      state.toasts.push(toast);
      return;
    }

    if (state.animation) state.animation.stop();

    dispatch({type: 'DISPLAY', payload: toast});

    state.animation = Animated.timing(state.opacity, {
      toValue: 1,
      duration: FADE_DURATION
    });

    state.animation.start(()=> setTimeout(()=> {
      state.toast = undefined;
      const toast = state.toasts.shift();
      if (toast) return display(toast.message!, toast);
      dismiss();
    }, toast.duration || DISPLAY_INTERVAL));
  }

  function dismiss(id?: string) {
    if (state.animation) state.animation.stop();

    state.animation = Animated.timing(state.opacity, {
      toValue: 0,
      duration: FADE_DURATION
    });

    state.animation.start();
    dispatch({type: 'DISMISS', payload: id});
  }

  return <Context.Provider value={{dismiss, make: display}}>
    {props.children}
    <Toast {...state.toast} opacity={state.opacity}/>
  </Context.Provider>
}