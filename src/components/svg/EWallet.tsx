import * as React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
const EWallet = () => (
  <Svg width={53} height={52} fill="none">
    <G clipPath="url(#a)">
      <Rect width={52} height={52} x={0.333} fill="url(#b)" rx={20} />
      <Path
        fill="url(#c)"
        d="M-8.667-.171v14.477l6.6 8.014 14.6 18.234-21.139 17.083h7.001l2.138-1.704 14.8-11.872s5.85 7.614 8.2 10.419c.45.551.75 1.052 1 1.503.331.552.392.996.44 1.351.015.11.029.21.049.303h12.333l4.778-3.909s-3.65 1.453-8.95-2.354c-1.124-.804-4.053-4.354-7.985-9.119-.965-1.17-1.99-2.412-3.065-3.705l7.7-6.211c5.4 6.362 11.25 10.42 17.4 11.371 6.8 1.002 10.9-.902 12.8-2.204.402-.288.706-.493.929-.644.165-.112.286-.194.371-.258v-3.506c-.5.3-2.4.751-3.05.851-3.65.551-10.15-.4-17.3-9.868-8.75-11.521-5.15-20.237 1.85-24.044 7.55-4.108 13.85.7 16.75 3.706.803.804 1.391 1.644 1.645 2.006l.105.148V-2.776c-.4-.2-3.85-1.202-4.35-1.303-1.25-.25-2.65-.5-4.2-.5-4.4-.05-9.8 1.452-14.55 6.211-7.5 7.564-6.9 15.73-6.9 15.73s-6-7.364-8.15-15.58c-1.6-5.96-1.5-10.219-1.25-12.423.084-.843.31-1.403.41-1.648l.03-.074h-9.217c-.067.193-.201.585-.373 1.271-.95 3.707-2.35 14.427 7.25 30.106 2.35 3.857 4.65 6.963 7 9.969l-7.6 6.111C6.833 19.565-8.667-.171-8.667-.171Z"
      />
      <Path
        fill="#fff"
        d="M39 26.723v2.404c0 .653-.537 1.19-1.202 1.19h-2.251c-1.26 0-2.415-.922-2.52-2.182-.07-.735.21-1.424.7-1.902a2.325 2.325 0 0 1 1.68-.7h2.391c.665 0 1.202.537 1.202 1.19Z"
      />
      <Path
        fill="#fff"
        d="M31.277 28.287a4.128 4.128 0 0 1 1.225-3.301 4.063 4.063 0 0 1 2.905-1.202h.665c.326 0 .595-.268.548-.595A4.676 4.676 0 0 0 32 19.176H20.333a4.665 4.665 0 0 0-4.666 4.666v8.167a4.665 4.665 0 0 0 4.666 4.667H32a4.668 4.668 0 0 0 4.62-4.014c.047-.326-.222-.595-.548-.595h-.525c-2.217 0-4.084-1.656-4.27-3.78ZM28.5 25.884h-7a.874.874 0 1 1 0-1.75h7c.478 0 .875.397.875.875a.881.881 0 0 1-.875.875ZM29.912 16.643c.303.315.035.781-.409.781h-9.135a6.346 6.346 0 0 0-3.453 1.015c-.455.292-1.073-.023-.852-.525a4.287 4.287 0 0 1 3.944-2.59h6.556c1.354 0 2.555.479 3.349 1.319Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={26.333}
        x2={26.333}
        y1={0}
        y2={52}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#219AFA" />
        <Stop offset={1} stopColor="#1D6FF4" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={26.333}
        x2={26.333}
        y1={-12.444}
        y2={57.736}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.182} stopColor="#1D8EF6" />
        <Stop offset={0.925} stopColor="#1D65F8" />
      </LinearGradient>
      <ClipPath id="a">
        <Rect width={52} height={52} x={0.333} fill="#fff" rx={20} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EWallet;
