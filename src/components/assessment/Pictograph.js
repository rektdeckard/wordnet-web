import React from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../../interactions";

const Pictograph = ({ resource }) => {
  const { name, src } = resource;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PICTOGRAM },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={drag}
      src={src}
      style={{
        height: 200,
        width: 200,
        padding: 8,
        margin: 8,
        backgroundColor: "white",
        borderRadius: 16,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    />
  );
};

export default Pictograph;
