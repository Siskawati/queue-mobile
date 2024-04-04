import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const XWhite = (props: SvgProps) => (
  <Svg
    
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="m15.87 16.931-8.8-8.799c-.3-.3-.31-.79-.02-1.08.29-.29.78-.281 1.08.02l8.8 8.799c.3.3.31.79.02 1.08-.29.29-.78.281-1.08-.02Z"
    />
    <Path
      fill="#fff"
      d="M7.05 16.951c-.29-.29-.28-.78.02-1.08l8.8-8.8c.3-.3.79-.31 1.08-.02.29.29.28.78-.02 1.08l-8.8 8.8c-.3.301-.79.31-1.08.02Z"
    />
  </Svg>
)
export default XWhite
