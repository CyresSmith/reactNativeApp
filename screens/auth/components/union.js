import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { memo } from 'react';

const SvgComponent = props => (
  <Svg width={13} height={13} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 0H6v6H0v1h6v6h1V7h6V6H7V0Z"
    />
  </Svg>
);

const Union = memo(SvgComponent);
export default Union;
