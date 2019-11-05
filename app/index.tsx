/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:43:45
 *  @Modified  2019-11-03 22:55:10
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

import { Provider as ToastProvider } from 'aicorn/toast';
import Fallback from 'app/components/fallback';
import { useNavigation, StackNavigation as Stack } from 'aicorn/navigation';

function Screen(factory: () => Promise<{ default: any}>) {
  const LazyComponent = React.lazy(factory);
  return function Screen() {
    return <React.Suspense fallback={<Fallback />}>
      <LazyComponent />
    </React.Suspense>
  }
}

const HomeScreen = Screen(async ()=> import('./screens/home'));

const StackProps = {
  routes: {

  },
  options: {

  }
};

export default ()=> {
  const navigation = useNavigation<Stack>();
  return <ToastProvider><HomeScreen /></ToastProvider>;
}