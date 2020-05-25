import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import Pictograph from "./Pictograph";
import { ItemTypes } from "../../interactions";

const TimelineDragTarget = ({ item, index, moveItem }) => {
  const ref = useRef(null);
  const [_, drop] = useDrop({
    accept: ItemTypes.PICTOGRAPH,
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      // const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // const hoverMiddleX =
      //   (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // const clientOffest = monitor.getClientOffset();
      // const hoverClientX = clientOffest.x - hoverBoundingRect.left;

      // if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      // if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PICTOGRAPH, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}>
      <Pictograph item={item} />
    </div>
  );
};

export default TimelineDragTarget;
