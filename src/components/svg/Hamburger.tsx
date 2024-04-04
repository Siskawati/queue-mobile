import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Hamburger = (props: SvgProps) => (
  <Svg
    
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#262626"
      d="M17.772 6.92h-15a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h15a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625ZM17.772 11.086h-15a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h15a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625ZM17.772 15.252h-15a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h15a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z"
    />
  </Svg>
)
export default Hamburger
