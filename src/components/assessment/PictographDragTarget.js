import React from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../../interactions";
import Pictograph from "./Pictograph";

const PictographDragTarget = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PICTOGRAPH, ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      <Pictograph item={item} isDragging={isDragging} />
    </div>
  );
};

export default PictographDragTarget;
