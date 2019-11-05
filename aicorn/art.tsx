/**
 *  @Author    程巍巍
 *  @Email     littocats@gmail.com
 *
 *  @Created   2019-11-02 11:57:20
 *  @Modified  2019-11-03 13:07:00
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

// This module is just a simple ts type wrapper for @react-native-community/art, 
// and add Shape bugfix for ios.

import React from 'react';
import { Platform } from 'react-native';

// @ts-ignore
import ARTColor from 'art/core/color';

import {
  Transform           as ARTTransform,
  Path                as ARTPath,
  Surface             as ARTSurface,
  Group               as ARTGroup,
  Shape               as ARTShape,
  Text                as ARTText,
  ClippingRectangle   as ARTClippingRectangle,
  LinearGradient      as ARTLinearGradient,
  RadialGradient      as ARTRadialGradient,
  Pattern             as ARTPattern,

// @ts-ignore
} from '@react-native-community/art';

import {
  extractTransform,
  extractOpacity,
  childrenAsString,
  extractColor,
  extractStrokeJoin,
  extractStrokeCap,
  extractBrush,

// @ts-ignore
} from '@react-native-community/art/lib/helpers';

// @ts-ignore
import { NativeShape } from '@react-native-community/art/lib/nativeComponents';

interface Transform {
  new (xx: number, yx: number, xy: number, yy: number, x: number, y: number): Transform;
  new (): Transform;

  transform(xx: number, yx: number, xy: number, yy: number, x: number, y: number): Transform;
  translate(x: number, y: number): Transform;
  move(x: number, y: number): Transform;
  scale(x: number, y: number): Transform;
  rotate(deg: string, x: number, y: number): Transform;
  moveTo(x: number, y: number): Transform;
  rotateTo(deg, x: number, y: number): Transform;
  scaleTo(x: number, y: number): Transform;
  resizeTo(width: number, height: number): Transform;
  inversePoint(x: number, y: number): Transform;
  point(x: number, y: number): Transform;
}

interface Path {
  new (p?: string | Path): Path;
  reset(): Path;
  move(x: number, y: number): Path;
  moveTo(x: number, y: number): Path;
  line(x: number, y: number): Path;
  lineTo(x: number, y: number): Path;
  curve(c1x: number, c1y: number, c2x: number, c2y: number, ex: number, ey: number): Path;
  curveTo(c1x: number, c1y: number, c2x: number, c2y: number, ex: number, ey: number): Path;
  arc(x: number, y: number, rx: number, ry: number, outer: number, counterClockwise: number, rotation: number): Path;
  arcTo(x: number, y: number, rx: number, ry: number, outer: number, counterClockwise: number, rotation: number): Path;
  counterArc(x: number, y: number, rx: number, ry: number, outer: number): Path;
  counterArcTo(x: number, y: number, rx: number, ry: number, outer: number): Path;
  close(): Path;

  toJSON(): string;
}


type OpacityProps = {
  visible?: boolean,
  opacity?: number,
};

type TransformProps = {
  scaleX?: number,
  scaleY?: number,
  scale?: number,
  x?: number,
  y?: number,
  rotation?: number,
  originX?: number,
  originY?: number,
  transform?: {
    y?: number,
    x?: number,
    yy?: number,
    xx?: number,
    yx?: number,
    xy?: number,
  },
};


type ARTColorType = 'hex' | 'rgb' | 'rgb' | 'hsb' | 'hsl';
interface Color {

  isColor: true,
  red: string,
  green: string,
  blue: string,
  alpha: string,

  new (color: string | number | Color, type: ARTColorType): Color;

  toHSB(array?: boolean): string;
  toHSL(array?: boolean): string;
  toHEX(array?: boolean): string;
  toRGB(array?: boolean): string;
};

// export namespace ARTColor {
//   export let parseRGB: (color: string)=> ARTColor;
//   export let parseHEX: (color: string)=> ARTColor;
//   export let parseHSB: (color: string)=> ARTColor;
//   export let parseHSL: (color: string)=> ARTColor;
//   export let hex: (hex: string)=> ARTColor;
//   export let hsb: (h: number, s: number, b: number, a: number)=> ARTColor;
//   export let hsl: (h: number, s: number, l: number, a: number)=> ARTColor;
//   export let rgb: (r: number, g: number, b: number, a: number)=> ARTColor;
//   export let detach: (color: string | number | ARTColor)=> ARTColor;
// }

export type ColorType = string | number | Color;

export type StrokeJoin = 'miter' | 'bevel' | 'round';
export type StrokeCap = 'butt' | 'square' | 'round';
export type Alignment = 'center' | 'right' | 'left';

export type Brush = {_brush: Array<number>, _bb?: boolean};
export type Font = {
  fontFamily: string,
  fontSize?: number,
  fontWeight?: string,
  fontStyle?: string,
};

export type GradientStops = {[key: string]: ColorType} | Array<ColorType>;


interface Surface extends React.Component<{
  height: number,
  width: number,
  children: React.ReactElement<Group | Shape | Text> | React.ReactElement<Group | Shape | Text>[],
  style?: any,
}> {
  new (): Surface;
}

interface Group extends React.Component<OpacityProps & TransformProps & {
  children: React.ReactElement<Group | Shape | Text> | React.ReactElement<Group | Shape | Text>[]
}> {}


type ShapeProps = OpacityProps & TransformProps & {
  width?: number,      // default 0
  height?: number,      // default 0
  fill?: string | Brush,
  stroke?: string,
  strokeCap?: StrokeCap,
  strokeDash?: number[],
  strokeJoin?: StrokeJoin,
  strokeWidth?: number,  // default 1
  d?: string | Path
};
// interface Shape extends React.Component<OpacityProps & TransformProps & {
//   width?: number,      // default 0
//   height?: number,      // default 0
//   fill?: string | Brush,
//   stroke?: string,
//   strokeCap?: StrokeCap,
//   strokeDash?: number[],
//   strokeJoin?: StrokeJoin,
//   strokeWidth?: number,  // default 1
//   d?: string | Path,
//   children?: string | Array<string>
// }>{
//   new (): Shape;
// }

interface Text extends React.Component< OpacityProps & TransformProps & {
  fill?: string | Brush,
  stroke?: string,
  strokeCap?: StrokeCap,
  strokeDash?: number[],
  strokeJoin?: StrokeJoin,
  strokeWidth?: number,
  children?: string | string[],
  width: number,
  height: number,
  alignment?: Alignment,
  font?: string | Font,
  path?: string | Path,
}>{
  new (): Text;
}

interface ClippingRectangle extends React.Component<OpacityProps & {
  x: number,
  y: number,
  width: number,
  height: number,
  children?: React.ReactElement<Group | Shape | Text> | React.ReactElement<Group | Shape | Text>[]
}>{
  new (): ClippingRectangle
}

type LinearGradient = (stops: GradientStops, x1?: number, y1?: number, x2?: number, y2?: number)=> Brush;

type RadialGradient = (stops: GradientStops, fx?: number, fy?: number, rx?: number, ry?: number, cx?: number, cy?: number)=> Brush;

type Pattern = (url: number, width: number, height: number, left?: number, top?: number)=> Brush;


const _extractColor = Platform.OS !== 'ios' ? extractColor : (color: ColorType)=> color;

// 目前版本的 ReactNativeArt iOS 版，不能有效解析 [r, g , b ,a] 数据组颜色值
// RCTCovert 本身可以解析其它格式的颜色值，因些在 iOS 平台上，不需要 extractColor
class Shape extends React.Component<ShapeProps>{
  render() {
    const props = this.props;
    const path = props.d || childrenAsString(props.children);
    const d = (path instanceof Path ? path : new Path(path)).toJSON();

    return (
      <NativeShape
        fill={extractBrush(props.fill, props)}
        opacity={extractOpacity(props)}
        stroke={_extractColor(props.stroke)}
        strokeCap={extractStrokeCap(props.strokeCap)}
        strokeDash={props.strokeDash || null}
        strokeJoin={extractStrokeJoin(props.strokeJoin)}
        strokeWidth={props.strokeWidth}
        transform={extractTransform(props)}
        d={d}
      />
    );
  }
}

class Transform extends ARTTransform {
  constructor(...args: number[]) {
    super(...args);
  }
}
class Path extends ARTPath {
  // @ts-ignore
  constructor(p?: string | Path) { super(p); };
}
class Color extends ARTColor {
  
}

export { Transform, Path, Color };

export const Surface : Surface = ARTSurface as Surface;
export const Group : Group = ARTGroup as Group;
// export const Shape : Shape = ARTShape as Shape;
export { Shape };
export const Text : Text = ARTText as Text;
export const ClippingRectangle : ClippingRectangle = ARTClippingRectangle as ClippingRectangle;
export const LinearGradient : LinearGradient = ARTLinearGradient as LinearGradient;
export const RadialGradient : RadialGradient = ARTRadialGradient as RadialGradient;
export const Pattern : Pattern = ARTPattern as Pattern;
