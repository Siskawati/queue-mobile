import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const PrecisionLocation = (props: SvgProps) => (
  <Svg width={38} height={38} fill="none" {...props}>
    <Rect width={38} height={38} fill="#fff" rx={19} />
    <Path
      fill="#F60"
      fillRule="evenodd"
      d="M19 35c8.837 0 16-7.163 16-16S27.837 3 19 3 3 10.163 3 19s7.163 16 16 16Zm7.09-16.668h1.817c.366 0 .669.303.669.668a.673.673 0 0 1-.669.668H26.09c-.311 3.394-3.028 6.101-6.421 6.422v1.817a.673.673 0 0 1-.669.668.673.673 0 0 1-.668-.668V26.09c-3.393-.312-6.1-3.028-6.421-6.422h-1.817A.673.673 0 0 1 9.426 19c0-.365.302-.668.668-.668h1.817c.311-3.394 3.028-6.101 6.421-6.422v-1.817c0-.365.303-.668.668-.668.366 0 .669.303.669.668v1.817c3.393.312 6.1 3.028 6.421 6.422Z"
      clipRule="evenodd"
    />
    <Path
      fill="#F60"
      d="M15.7 19c0 1.819 1.482 3.3 3.3 3.3 1.82 0 3.3-1.482 3.3-3.3 0-1.82-1.48-3.3-3.3-3.3-1.819 0-3.3 1.48-3.3 3.3Z"
    />
  </Svg>
);
export default PrecisionLocation;
