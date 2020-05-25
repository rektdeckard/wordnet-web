import React, { useState, useCallback } from "react";
import { useDrop } from "react-dnd";

import { Color } from "../../data/constants";
import { ItemTypes } from "../../interactions";
import ShapeDragTarget from "./ShapeDragTarget";

const ShapeDropTarget = ({
  accept = ItemTypes.SHAPE,
  initialContents = [],
  children,
}) => {
  const [shapes, setShapes] = useState(initialContents);

  const handleRemove = ({ id }) => () => {
    setShapes((items) => items.filter((it) => it.id !== id));
  };

  const handleDrop = (shape) => {
    console.log(shape);
    if (shapes.find((it) => it.id === shape.id)) return;

    shape.handleRemove?.(); // eslint-disable-line no-unused-expressions
    setShapes((shapes) => [
      ...shapes,
      { ...shape, handleRemove: handleRemove(shape) },
    ]);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
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
        backgroundColor: isActive ? Color.POSITIVE : Color.CARD_BACKGROUND,
      }}
    >
      {children}
      {shapes.map((item, index) => (
        <ShapeDragTarget
          key={index}
          item={item}
          handleRemove={handleRemove(item)}
        />
      ))}
    </div>
  );
};

export default ShapeDropTarget;
