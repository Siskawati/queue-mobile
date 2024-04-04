import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Brush = (props: SvgProps) => (
  <Svg
    
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#262626"
      d="M8.606 14.419a.63.63 0 0 1-.625-.625c0-1.392 0-3.125 3.124-3.125h3.334c1.875 0 1.875-.25 1.875-1.875V7.127c0-1.625 0-1.875-1.875-1.875h-.834a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h.834c2.916 0 3.125 1.183 3.125 3.125v1.667c0 1.941-.209 3.125-3.125 3.125h-3.334c-1.874 0-1.874.508-1.874 1.875a.63.63 0 0 1-.625.625Z"
    />
    <Path
      fill="#262626"
      d="M10.272 7.752H6.94a.629.629 0 0 1-.592-.425 8.642 8.642 0 0 1 0-5.392.625.625 0 0 1 .592-.433h3.333c.267 0 .508.175.592.425a8.525 8.525 0 0 1 0 5.392.618.618 0 0 1-.592.433Zm-2.866-1.25h2.408a7.333 7.333 0 0 0 0-3.75H7.406a7.333 7.333 0 0 0 0 3.75Z"
    />
    <Path
      fill="#262626"
      d="M6.939 7.752h-.833c-2.017 0-3.125-1.108-3.125-3.125s1.108-3.125 3.125-3.125h.833c.217 0 .417.108.533.3a.61.61 0 0 1 .025.608c-.75 1.492-.75 2.95 0 4.442.1.192.084.425-.025.608a.629.629 0 0 1-.533.292Zm-.933-5c-1.242.033-1.775.592-1.775 1.875 0 1.275.533 1.842 1.766 1.875a5.727 5.727 0 0 1 .009-3.75ZM11.105 7.752h-.833a.618.618 0 0 1-.533-.3.61.61 0 0 1-.025-.608c.742-1.492.742-2.95 0-4.442a.632.632 0 0 1 .025-.608.629.629 0 0 1 .533-.292h.833c2.017 0 3.125 1.108 3.125 3.125s-1.108 3.125-3.125 3.125Zm.1-5a5.78 5.78 0 0 1 0 3.75c1.242-.033 1.767-.592 1.767-1.875.008-1.283-.525-1.842-1.766-1.875ZM9.022 19.42H8.19c-.858 0-1.875-.325-1.875-1.875v-2.5c0-1.55 1.017-1.875 1.875-1.875h.833c.859 0 1.875.325 1.875 1.875v2.5c0 1.55-1.016 1.875-1.875 1.875Zm-.833-5c-.625 0-.625.183-.625.625v2.5c0 .442 0 .625.625.625h.833c.625 0 .625-.183.625-.625v-2.5c0-.442 0-.625-.625-.625H8.19Z"
    />
  </Svg>
)
export default Brush 
