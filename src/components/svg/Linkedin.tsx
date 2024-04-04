import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const Linkedin = (props: SvgProps) => (
  <Svg
    
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M20.558 21.212h-3.554v-5.57c0-1.327-.027-3.036-1.852-3.036-1.853 0-2.136 1.445-2.136 2.939v5.667H9.462V9.76h3.414v1.56h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.456v6.286ZM5.448 8.192a2.062 2.062 0 0 1-1.715-3.21 2.064 2.064 0 1 1 1.715 3.21Zm1.782 13.02H3.666V9.76H7.23v11.452ZM22.336.76H1.882c-.979 0-1.77.774-1.77 1.729V23.03c0 .956.791 1.729 1.77 1.729h20.451c.978 0 1.778-.773 1.778-1.73V2.49c0-.955-.8-1.73-1.778-1.73h.003Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.111.76h24v24h-24z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Linkedin 
