import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ArrrowRight() {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Path
        d="M12.525 16.074a.618.618 0 01-.442-.184.629.629 0 010-.883L16.7 10.39l-4.617-4.616a.629.629 0 010-.884.629.629 0 01.884 0l5.058 5.059a.629.629 0 010 .883l-5.058 5.058a.618.618 0 01-.442.184z"
        fill="#fff"
      />
      <Path
        d="M17.442 11.016H3.417a.63.63 0 01-.625-.625.63.63 0 01.625-.625h14.025a.63.63 0 01.625.625.63.63 0 01-.625.625z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ArrrowRight;
