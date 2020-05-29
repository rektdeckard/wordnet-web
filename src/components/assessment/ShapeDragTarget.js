import React from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../../interactions";
import Shape from "./Shape";

const ShapeDragTarget = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SHAPE, ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        display: "inline-block",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      <Shape {...item} />
    </div>
  );
};

export default ShapeDragTarget;
