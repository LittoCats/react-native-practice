/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:57:50
 *  @Modified  2019-11-05 10:00:39
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
import {
  StyleSheet,
  View,

} from 'react-native';


interface Props {
  visible?: boolean;
  children: React.ReactElement;
}

interface Action {
  type: 'APPEND' | 'REMOVE' | 'DISMISS';
  key: string;
  props: Props
}

let KEY = 0;
const Context = React.createContext({
  dispatch: (action: Action)=> {}
});

function reduce(state: {[key: string]: Props}, action: Action) {
  if (action.type === 'APPEND' || action.type === 'DISMISS') {
    if (!state[action.key]) return {...state, [action.key]: action.props};
    if (state[action.key].visible != action.props.visible) {
      state[action.key].visible = action.props.visible;
      return {...state};
    }
  } else if (action.type === 'REMOVE') {
    delete state[action.key];
    return {...state};
  }

  return state;
}

function Consumer(props: {dispatch: React.Dispatch<Action>} & Props) {



  return null;
}

export function Provider(props: React.PropsWithChildren<{}>) {

  const [state, dispatch] = React.useReducer(reduce, {});

  return <Context.Provider value={{dispatch}}>
    {props.children}
    {Object.keys(state).map((key)=> <Consumer key={key} dispatch={dispatch} {...state[key]}/>)}
  </Context.Provider>
}

export default function Modal(props: Props) {
  const [key] = React.useState(`${KEY++}`);
  const context = React.useContext(Context);

  React.useEffect(()=> {
    context.dispatch({type: 'APPEND', key, props});
    return ()=> {
      context.dispatch({type: 'DISMISS', key, props});
    };
  }, [props.visible])

  return null;
}

Modal.Provider = Provider;
