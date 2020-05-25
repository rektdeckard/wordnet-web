import React from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../../interactions";
import Shape from "./Shape";

const ShapeDragTarget = ({ item, handleRemove }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SHAPE, handleRemove, ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ display: "inline-block", opacity: isDragging ? 0.5 : 1, cursor: "grab" }}
    >
      <Shape {...item} isDragging={isDragging} />
    </div>
  );
};

export default ShapeDragTarget;
