import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const Facebook = (props: SvgProps) => (
  <Svg
    
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M9.94 24.452v-7.98H7.466v-3.667H9.94v-1.58c0-4.085 1.848-5.978 5.858-5.978.4 0 .955.042 1.468.103.384.04.765.104 1.14.195V8.87a8.623 8.623 0 0 0-.652-.036c-.244-.007-.489-.01-.733-.01-.707 0-1.26.097-1.675.31-.28.14-.515.355-.68.622-.257.42-.373.995-.373 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245c5.942-.718 10.546-5.777 10.546-11.912 0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.1 11.647Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.839.76h24v24h-24z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Facebook
