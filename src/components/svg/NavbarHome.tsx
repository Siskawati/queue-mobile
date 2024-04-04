import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const NavbarHome = (props: SvgProps) => (
  <Svg
    
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#FFEDE0"
      stroke="#F60"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M10.47 3.32 3.54 8.87c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57H18c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01Z"
    />
    <Path
      fill="#fff"
      stroke="#F60"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M12.4 16a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </Svg>
)
export default NavbarHome 
