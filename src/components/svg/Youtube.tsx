import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const Youtube = (props: SvgProps) => (
  <Svg
    
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M23.61 6.946a3.016 3.016 0 0 0-2.123-2.136c-1.87-.505-9.376-.505-9.376-.505s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.12 2.136C.11 8.83.11 12.76.11 12.76s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136c.501-1.884.501-5.814.501-5.814s0-3.93-.502-5.814ZM9.655 16.328V9.192l6.273 3.568-6.273 3.568Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.111.76h24v24h-24z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Youtube
