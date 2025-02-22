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
const Pembayaran = () => (
  <Svg width={53} height={52} fill="none">
    <G clipPath="url(#a)">
      <Rect width={52} height={52} x={0.667} fill="url(#b)" rx={20} />
      <Path
        fill="url(#c)"
        d="M-8.333-.171v14.477l6.6 8.014 14.6 18.234-21.14 17.083h7.001l2.139-1.704 14.8-11.872s5.85 7.614 8.2 10.419c.45.551.75 1.052 1 1.503.33.552.391.996.44 1.351.015.11.028.21.048.303h12.333l4.779-3.909s-3.65 1.453-8.95-2.354c-1.125-.804-4.054-4.354-7.986-9.119-.965-1.17-1.99-2.412-3.064-3.705l7.7-6.211c5.4 6.362 11.25 10.42 17.4 11.371 6.8 1.002 10.9-.902 12.8-2.204.402-.288.705-.493.928-.644.165-.112.287-.194.372-.258v-3.506c-.5.3-2.4.751-3.05.851-3.65.551-10.15-.4-17.3-9.868-8.75-11.521-5.15-20.237 1.85-24.044 7.55-4.108 13.85.7 16.75 3.706.802.804 1.39 1.644 1.644 2.006.047.067.082.117.106.148V-2.776c-.4-.2-3.85-1.202-4.35-1.303-1.25-.25-2.65-.5-4.2-.5-4.4-.05-9.8 1.452-14.55 6.211-7.5 7.564-6.9 15.73-6.9 15.73s-6-7.364-8.15-15.58c-1.6-5.96-1.5-10.219-1.25-12.423.084-.843.31-1.403.409-1.648l.03-.074h-9.217c-.067.193-.201.585-.372 1.271-.95 3.707-2.35 14.427 7.25 30.106 2.35 3.857 4.65 6.963 7 9.969l-7.6 6.111C7.167 19.565-8.333-.171-8.333-.171Z"
      />
      <Path
        fill="#fff"
        d="M29.408 14.334h-5.483a2.2 2.2 0 0 0-2.205 2.193v1.097a2.19 2.19 0 0 0 2.193 2.193h5.495a2.19 2.19 0 0 0 2.194-2.193v-1.097c.011-1.213-.98-2.193-2.194-2.193Z"
      />
      <Path
        fill="#fff"
        d="M32.78 17.624a3.38 3.38 0 0 1-3.372 3.372h-5.483a3.38 3.38 0 0 1-3.372-3.372c0-.653-.7-1.062-1.283-.758a5.217 5.217 0 0 0-2.765 4.608v10.978a5.228 5.228 0 0 0 5.215 5.215h9.893a5.228 5.228 0 0 0 5.215-5.215V21.474a5.217 5.217 0 0 0-2.765-4.608c-.583-.304-1.283.105-1.283.758Zm-5.67 14.152H22a.881.881 0 0 1-.875-.875c0-.479.396-.875.875-.875h5.11c.478 0 .875.396.875.875a.881.881 0 0 1-.875.875Zm3.057-4.667H22a.881.881 0 0 1-.875-.875c0-.478.396-.875.875-.875h8.167c.478 0 .875.397.875.875a.881.881 0 0 1-.875.875Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={26.667}
        x2={26.667}
        y1={0}
        y2={52}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#19C0C9" />
        <Stop offset={1} stopColor="#28ABC8" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={26.667}
        x2={26.667}
        y1={-12.444}
        y2={57.736}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.182} stopColor="#0DBCCE" />
        <Stop offset={0.925} stopColor="#10A2BE" />
      </LinearGradient>
      <ClipPath id="a">
        <Rect width={52} height={52} x={0.667} fill="#fff" rx={20} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Pembayaran;
