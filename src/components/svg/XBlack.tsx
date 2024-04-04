import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const XBlack = (props: SvgProps) => (
  <Svg
   
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#262626"
      d="m16.37 16.93-8.8-8.8c-.3-.3-.31-.79-.02-1.08.29-.29.78-.281 1.08.02l8.8 8.799c.3.3.31.79.02 1.08-.29.29-.78.281-1.08-.02Z"
    />
    <Path
      fill="#262626"
      d="M7.55 16.95c-.29-.29-.28-.78.02-1.081l8.8-8.8c.3-.3.79-.31 1.08-.02.29.29.28.78-.02 1.081l-8.8 8.8c-.3.3-.79.31-1.08.02Z"
    />
  </Svg>
)
export default XBlack
