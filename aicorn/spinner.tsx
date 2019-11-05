/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 16:25:56
 *  @Modified  2019-11-03 13:07:38
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
import { View, StyleSheet, Animated } from 'react-native';

import { Surface, Shape, Path } from './art';

const LOOP_DURATION: number = 1600; // ms
const DEFAULT_SIZE: number = 48;
const SPLICE_COUNT = 18;
const ANGLE_STEP = 1 / SPLICE_COUNT;
const PINNER_WIDTH = Math.ceil(DEFAULT_SIZE/24);
const DEFAULT_COLOR = 'gray';
const PATHS: Path[] = (function() {  
  const x = DEFAULT_SIZE / 2;
  const y = x;
  const r = x;
  const angle = (Math.PI / SPLICE_COUNT) * 2;

  const paths: Path[] = [];

  for (let index = 0; index < SPLICE_COUNT; index++) {
    const an = index * angle;
    const dx = r * Math.cos(an);
    const dy = r * Math.sin(an);
    paths.push(new Path().moveTo(x + dx / 1.2, y - dy / 1.2).lineTo(x + dx / 2, y - dy / 2));
  }
  return paths
})();


const Animation: {value: Animated.Value, effect: ()=> ()=> void} = (function() {
  const value = new Animated.Value(0);
  let animation: Animated.CompositeAnimation | undefined;
  let refCount = 0;

  function start() {
    if (refCount > 0) {
      refCount++;
    } else {
      // 对于循环执行的动画，开始前需要重置到相同的起点，否则，使用 useNativeDriver: true 时，
      // 动画的状态会出现不一致
      value.setValue(0);
      refCount = 1;
      animation = Animated.loop(Animated.timing(value, {
        toValue: Math.PI * 2,
        duration: LOOP_DURATION,
        isInteraction: false,
        useNativeDriver: true,
        easing: (offset) => ANGLE_STEP * Math.floor(offset / ANGLE_STEP),
      }));
      animation.start();
    }

    return stop;
  }

  function stop() {
    refCount--;
    if (refCount > 0) return;
    if (!animation) return;

    animation.stop();
    animation = undefined;
  }

  return {value, effect: start};
})();


interface Spinner {
  color?: string;
  size?: number;
  style?: any
}

export default function Spinner(props: Spinner) {
  const { color, size, style, ...rest } = props;

  const width = size || DEFAULT_SIZE;
  const sideStyle = {
    width: width,
    height: width,
    transform: [{rotateZ: Animation.value}, {perspective: 1000}]
  };
  React.useEffect(()=> Animation.effect(), []);

  return <Animated.View {...rest} style={[style, sideStyle]}>
    <Surface width={width} height={width} >{PATHS.map((path, index)=>
      <Shape key={index} strokeWidth={PINNER_WIDTH} strokeCap="round" strokeJoin="round"
        stroke={props.color || DEFAULT_COLOR}
        opacity={(PATHS.length - index * 1.1) / PATHS.length}
        scale={width / DEFAULT_SIZE}
        d={path}
      />
    )}</Surface>
  </Animated.View>
}

