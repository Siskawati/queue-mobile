import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ArrowDownBlack = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#262626"
      d="M12.272 15.371c-.19 0-.38-.07-.53-.22l-3.53-3.53a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l3 3 3-3c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-3.53 3.53c-.15.15-.34.22-.53.22Z"
    />
  </Svg>
)
export default ArrowDownBlack
