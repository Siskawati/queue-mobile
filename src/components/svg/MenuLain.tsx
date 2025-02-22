import React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

const MenuLain = () => (
  <Svg width={52} height={52} fill="none">
    <G clipPath="url(#a)">
      <Rect width={52} height={52} fill="url(#b)" rx={20} />
      <Path
        fill="url(#c)"
        d="M-9-.171v14.477l6.6 8.014 14.6 18.234-21.14 17.083h7.002L.2 55.933 15 44.06s5.85 7.614 8.2 10.419c.45.551.75 1.052 1 1.503.33.552.391.996.44 1.351.015.11.029.21.049.303H37.02l4.779-3.909s-3.65 1.453-8.95-2.354c-1.124-.804-4.054-4.354-7.986-9.119-.965-1.17-1.99-2.412-3.064-3.705l7.7-6.211c5.4 6.362 11.25 10.42 17.4 11.371 6.8 1.002 10.9-.902 12.8-2.204.402-.288.705-.493.928-.644.166-.112.287-.194.372-.258v-3.506c-.5.3-2.4.751-3.05.851-3.65.551-10.15-.4-17.3-9.868C31.9 16.56 35.5 7.844 42.5 4.037c7.55-4.108 13.85.7 16.75 3.706.802.804 1.39 1.644 1.645 2.006.046.067.082.117.105.148V-2.776c-.4-.2-3.85-1.202-4.35-1.303-1.25-.25-2.65-.5-4.2-.5-4.4-.05-9.8 1.452-14.55 6.211-7.5 7.564-6.9 15.73-6.9 15.73s-6-7.364-8.15-15.58c-1.6-5.96-1.5-10.219-1.25-12.423a5.7 5.7 0 0 1 .439-1.722h-9.217c-.066.193-.2.585-.372 1.271-.95 3.707-2.35 14.427 7.25 30.106 2.35 3.857 4.65 6.963 7 9.969l-7.6 6.111C6.5 19.565-9-.171-9-.171Z"
      />
      <Path
        fill="#fff"
        d="M30.888 14.334h-9.776c-4.247 0-6.779 2.532-6.779 6.778v9.765c0 4.259 2.532 6.79 6.779 6.79h9.765c4.246 0 6.778-2.531 6.778-6.778v-9.777c.012-4.246-2.52-6.778-6.767-6.778Zm.945 17.792H20.167a.881.881 0 0 1-.875-.875c0-.479.396-.875.875-.875h11.666c.479 0 .875.396.875.875a.881.881 0 0 1-.875.875Zm0-5.25H20.167a.881.881 0 0 1-.875-.875c0-.479.396-.875.875-.875h11.666c.479 0 .875.396.875.875a.881.881 0 0 1-.875.875Zm0-5.25H20.167a.881.881 0 0 1-.875-.875c0-.479.396-.875.875-.875h11.666c.479 0 .875.396.875.875a.881.881 0 0 1-.875.875Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={26}
        x2={26}
        y1={0}
        y2={52}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#19C0C9" />
        <Stop offset={1} stopColor="#28ABC8" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={26}
        x2={26}
        y1={-12.444}
        y2={57.736}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.182} stopColor="#0DBCCE" />
        <Stop offset={0.925} stopColor="#10A2BE" />
      </LinearGradient>
      <ClipPath id="a">
        <Rect width={52} height={52} fill="#fff" rx={20} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default MenuLain;
