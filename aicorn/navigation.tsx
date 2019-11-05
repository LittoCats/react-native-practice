/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 12:03:25
 *  @Modified  2019-11-03 20:29:48
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

interface Action {
  type: string;
}

interface Navigation {
  dispatch<T extends Action>(action: T): void
}

const Context = React.createContext({} as any);

export function useNavigation<T>(): T & Navigation{
  return React.useContext<T & Navigation>(Context);
}

/******************************************************************************

  TabbarNavigation

 *****************************************************************************/

export interface TabNavigation {
  switch(index: number): void;
}

export function TabNavigator() {
  return null;
}

/******************************************************************************

  StackNavigation

 *****************************************************************************/

export interface StackNavigation {
  push(screen: string, params: any): void;
  pop(): void;
}
