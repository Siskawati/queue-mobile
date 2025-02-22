import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const Profil = (props: SvgProps) => (
  <Svg
    
    width={52}
    height={52}
    fill="none"
    {...props}
  >
    <Rect width={52} height={52} fill="#4E5D60" rx={26} />
    <Path
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.7}
      d="M18.942 20.167c0 3.892 3.166 7.059 7.058 7.059s7.058-3.167 7.058-7.059c0-3.891-3.166-7.058-7.058-7.058s-7.058 3.167-7.058 7.058Zm2.45 0A4.62 4.62 0 0 1 26 15.56a4.62 4.62 0 0 1 4.608 4.608A4.62 4.62 0 0 1 26 24.776a4.62 4.62 0 0 1-4.608-4.609ZM34.797 37.667c0 .671.553 1.225 1.225 1.225s1.225-.554 1.225-1.225c0-5.233-5.11-9.392-11.247-9.392-6.138 0-11.246 4.159-11.246 9.392 0 .671.553 1.225 1.225 1.225.671 0 1.224-.554 1.224-1.225 0-3.762 3.872-6.942 8.797-6.942 4.925 0 8.797 3.18 8.797 6.942Z"
    />
  </Svg>
)
export default Profil
