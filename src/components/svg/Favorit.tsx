import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Favorit = (props: SvgProps) => (
  <Svg
   
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="#FFA366"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="m14.53 4.01 1.76 3.52c.24.49.88.96 1.42 1.05l3.19.53c2.04.34 2.52 1.82 1.05 3.28l-2.48 2.48c-.42.42-.65 1.23-.52 1.81l.71 3.07c.56 2.43-.73 3.37-2.88 2.1l-2.99-1.77c-.54-.32-1.43-.32-1.98 0l-2.99 1.77c-2.14 1.27-3.44.32-2.88-2.1l.71-3.07c.13-.58-.1-1.39-.52-1.81l-2.48-2.48c-1.46-1.46-.99-2.94 1.05-3.28l3.19-.53c.53-.09 1.17-.56 1.41-1.05l1.76-3.52c.96-1.91 2.52-1.91 3.47 0Z"
    />
  </Svg>
)
export default Favorit
