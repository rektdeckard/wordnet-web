import React from "react";
import tinycolor from "tinycolor2";

import { Shape, Color } from "../../data/constants";

const strokeWidth = 8;

export default ({ poly, size = 100, color = Color.ACTIVE }) => {
  const style = {
    fill: color,
    stroke: tinycolor(color).darken().toHexString(),
    strokeWidth,
  };

  switch (poly) {
    case Shape.CIRCLE:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth}
            style={style}
          />
        </svg>
      );
    case Shape.SQUARE:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size}>
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            height={size - strokeWidth}
            width={size - strokeWidth}
            style={style}
          />
        </svg>
      );
    case Shape.TRIANGLE:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size}>
          <polygon
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            points={`${strokeWidth},${size - strokeWidth / 2} ${
              size / 2
            },${strokeWidth} ${size - strokeWidth},${size - strokeWidth / 2}`}
            style={style}
          />
        </svg>
      );
    default:
      return null;
  }
};
