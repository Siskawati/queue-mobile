import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const HomeHeaderMobile = (props: SvgProps) => (
  <Svg
    
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#F60"
      d="m20.86 8.37-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01L3.14 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91ZM12 15.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"
    />
  </Svg>
)
export default HomeHeaderMobile 
