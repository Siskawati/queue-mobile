import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Headphones = (props: SvgProps) => (
  <Svg
    
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#1BC1CF"
      d="M1.604 10.879a.44.44 0 0 1-.437-.438V7.116a5.8 5.8 0 0 1 1.656-4.194 5.766 5.766 0 0 1 4.148-1.727 5.87 5.87 0 0 1 5.862 5.863v3.325a.44.44 0 0 1-.437.437.44.44 0 0 1-.438-.437V7.058A4.993 4.993 0 0 0 6.971 2.07c-1.348 0-2.596.52-3.524 1.464a4.924 4.924 0 0 0-1.405 3.57v3.331a.438.438 0 0 1-.438.444Z"
    />
    <Path
      fill="#1BC1CF"
      d="M3.465 7.262h-.076a2.226 2.226 0 0 0-2.222 2.222v1.097c0 1.225.997 2.222 2.222 2.222h.076a2.226 2.226 0 0 0 2.222-2.222V9.484a2.226 2.226 0 0 0-2.222-2.222ZM10.61 7.262h-.075a2.226 2.226 0 0 0-2.223 2.222v1.097c0 1.225.998 2.222 2.223 2.222h.076a2.226 2.226 0 0 0 2.222-2.222V9.484a2.226 2.226 0 0 0-2.222-2.222Z"
    />
  </Svg>
)
export default Headphones
