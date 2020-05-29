import React, { useCallback } from "react";
import { useDrop } from "react-dnd";

import { Color } from "../../data/constants";
import { ItemTypes } from "../../interactions";
import ShapeDragTarget from "./ShapeDragTarget";

const ShapeDropTarget = ({
  items,
  groupName,
  onDrop,
  style = {},
  children,
}) => {
  const handleDrop = useCallback(
    (shape) => {
      onDrop(shape.groupName, shape);
    },
    [onDrop]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.SHAPE,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      style={{
        height: "100%",
        padding: 16,
        backgroundColor: isActive ? Color.POSITIVE_LIGHT : Color.CARD_BACKGROUND,
        ...style,
      }}
    >
      {children}
      {items.map((item, index) => (
        <ShapeDragTarget key={index} item={{ ...item, groupName }} />
      ))}
    </div>
  );
};

export default ShapeDropTarget;
