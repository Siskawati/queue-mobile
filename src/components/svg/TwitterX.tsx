import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const TwitterX = (props: SvgProps) => (
  <Svg
    
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M19.012 1.912h3.68l-8.04 9.19 9.46 12.503h-7.407l-5.8-7.584-6.638 7.584H.585l8.6-9.83L.111 1.913h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.491h2.038L6.597 4H4.41l13.312 17.404Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.111.76h24v24h-24z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default TwitterX
