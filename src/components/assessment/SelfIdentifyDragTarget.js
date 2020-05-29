import React from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../../interactions";
import Pictograph from "./Pictograph";

const SelfIdentifyDragTarget = ({ item, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PICTOGRAPH, onMove, ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}>
      <Pictograph item={item} style={{ height: 96 }} />
    </div>
  );
};

export default SelfIdentifyDragTarget;
