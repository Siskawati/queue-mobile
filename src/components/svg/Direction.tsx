import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Direction = (props: SvgProps) => (
  <Svg
    
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#1BC1CF"
      fillRule="evenodd"
      d="M7.81 2.5h8.38c3.64 0 5.81 2.17 5.8 5.81v8.38c0 3.64-2.17 5.81-5.81 5.81H7.81C4.17 22.5 2 20.33 2 16.68V8.31C2 4.67 4.17 2.5 7.81 2.5Zm7.41 8.277c.15.15.34.22.53.22s.38-.07.53-.22l2-2a.738.738 0 0 0 .147-.21.738.738 0 0 0 .002-.636.736.736 0 0 0-.15-.213l-2-2a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l.721.72h-1.19c-4.27 0-7.75 3.48-7.75 7.75v3c0 .41.34.75.75.75s.75-.34.75-.75v-3c0-3.45 2.8-6.25 6.25-6.25h1.19l-.72.72c-.29.29-.29.77 0 1.06Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Direction
