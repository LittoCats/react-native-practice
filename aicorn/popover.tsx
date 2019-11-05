/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:58:57
 *  @Modified  2019-11-03 22:49:08
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
import { View, StyleSheet } from 'react-native';


const Context = React.createContext({} as any);


function Container() {
  return null;
}

export function Provider<P extends React.PropsWithChildren<{}>, T extends React.ClassType<P, any, any>>(props: {container: T} & P) {
  const { container, children, ...rest } = props;
  const Component = container;

  const [popover, setPopover] = React.useState({});

  return <Context.Provider value={{}}>
    <Component {...rest}>
      {children}
      <Container {...popover}/>
    </Component>
  </Context.Provider>;
}

export default function Popover() {
  return null
}

Popover.Provider = Provider;